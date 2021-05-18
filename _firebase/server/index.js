const admin = require('firebase-admin');

const serviceAccount = require('../../gtd-todo-45bb3-a70b2f7acafe.json');

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';

admin.initializeApp({
  projectId: 'gtd-todo-45bb3',
});
export const firebaseAuth = admin.auth();
export const firebaseDB = admin.firestore();
