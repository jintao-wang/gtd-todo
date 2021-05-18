function app() {
  const admin = require('firebase-admin');

  if (!admin.apps.length) {
    const serviceAccount = require('../../gtd-todo-45bb3-a70b2f7acafe.json');

    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';

    console.log(222);
    admin.initializeApp({
      projectId: 'gtd-todo-45bb3',
    });
  }
  return {
    admin,
    firebaseAuth: admin.auth(),
    firebaseDB: admin.firestore(),
  };
}
module.exports.app = app;
