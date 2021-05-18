import { firebaseDB } from '_firebase/server';

export default async (req, res) => {
  const docRef = firebaseDB.collection('users').doc('alovelace');
  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  });
  res.status(200).json({
    code: '200',
    message: 'registerSuccess',
  })
};
