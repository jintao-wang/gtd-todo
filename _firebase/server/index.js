function app() {
  const admin = require('firebase-admin');

  if (!admin.apps.length) {
    const serviceAccount = require('../../gtd-todo-45bb3-a70b2f7acafe.json');

    if (process.env.NODE_ENV === 'development') {
      process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8088';
      process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';

      admin.initializeApp({
        projectId: 'gtd-todo-45bb3',
      });
    } else {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }
  return {
    admin,
    firebaseAuth: admin.auth(),
    firebaseDB: admin.firestore(),
  };
}
module.exports.app = app;
