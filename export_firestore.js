const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service.json'); // Your Firebase service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportCollection(collectionName) {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  fs.writeFileSync(`${collectionName}.json`, JSON.stringify(data, null, 2));
  console.log(`Exported ${collectionName} to ${collectionName}.json`);
}

// Export your collections
(async () => {
  await exportCollection('users'); // Replace with your collection names
  // Add more collections as needed, e.g., await exportCollection('orders');
  process.exit();
})();
