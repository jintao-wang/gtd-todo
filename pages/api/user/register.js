import { firebaseAuth, firebaseDB } from '_firebase/server';

export default async (req, res) => {
  const validateFirebaseIdToken = async () => {
    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
      && !(req.cookies && req.cookies.__session)) {
      console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
      res.status(403).send('Unauthorized');
      return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      console.log('Found "Authorization" header');
      console.log(req.headers.authorization)
      // Read the ID Token from the Authorization header.
      idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
      console.log('Found "__session" cookie');
      // Read the ID Token from cookie.
      idToken = req.cookies.__session;
    } else {
      // No cookie
      res.status(403).send('Unauthorized');
      return;
    }

    try {
      const decodedIdToken = await firebaseAuth.verifyIdToken(idToken);
      console.log('ID Token correctly decoded', decodedIdToken);
      return decodedIdToken;
    } catch (error) {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
    }
  };
  const user = await validateFirebaseIdToken();
  console.log(user);
  firebaseDB.collection('user').doc(user.uid).set({
    email: req.user.email,
  })
    .then(() => res.status(200).json({
      code: '200',
      message: 'registerSuccess',
    }))
    .catch((error) => console.error('Error adding document: ', error));
};
