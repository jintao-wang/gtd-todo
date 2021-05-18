const admin = require('firebase-admin');

const serviceAccount = require('../../gtd-todo-45bb3-a70b2f7acafe.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const firebaseAuth = admin.auth();
export const firebaseDB = admin.firestore();
