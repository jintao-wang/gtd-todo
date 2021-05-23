const firebase = require('_firebase/server');

export default async (req, res) => {
  const todayTimestamp = parseInt(req.query.todayTimeStamp, 10);
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
      const decodedIdToken = await firebase.app().firebaseAuth.verifyIdToken(idToken);
      console.log('ID Token correctly decoded', decodedIdToken);
      return decodedIdToken;
    } catch (error) {
      console.error('Error while verifying Firebase ID token:', error);
    }
  };
  const user = await validateFirebaseIdToken();
  if (!user) {
    return;
  }
  const actionsRef = firebase.app().firebaseDB.collection('actions');
  const todayStart = new Date(todayTimestamp);
  todayStart.setHours(0, 0, 0);
  const todayEnd = new Date(todayTimestamp);
  todayEnd.setHours(23, 59, 59);
  const actions = await actionsRef
    .where('user', '==', user.uid)
    .where('endDate', '>=', todayStart)
    .where('endDate', '<=', todayEnd)
    .get();
  const result = [];
  actions.forEach((doc) => {
    result.push(doc.data());
  });

  res.status(200).json({
    code: '200',
    message: result,
  });
};
