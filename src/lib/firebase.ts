import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB7ShLgoPmO3R0l-S9G-763PP0Sf31jYAc",
    authDomain: "lab33-26979.firebaseapp.com",
    projectId: "lab33-26979",
    storageBucket: "lab33-26979.firebasestorage.app",
    messagingSenderId: "850199638786",
    appId: "1:850199638786:web:f3a46fa465c05c5043481b",
    measurementId: "G-EM0QLH8TDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

let analytics;
// Initialize Analytics only on client side and if supported
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { analytics };
