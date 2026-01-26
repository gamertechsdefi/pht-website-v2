import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
// import serviceAccount from "../../../service-account.json";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}"
);

// const newServiceAccount = JSON.parse(
//   JSON.stringify({
//     project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')?.trim(),
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   })
// );

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const adminAuth = getAuth();
const adminDb = getFirestore();

export { adminAuth, adminDb };
