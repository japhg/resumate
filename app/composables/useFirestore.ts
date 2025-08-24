import { getApp, getApps, initializeApp } from "firebase/app"
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.NUXT_FIREBASE_API_KEY,
    authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NUXT_FIREBASE_APP_ID,
    measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


// Initialize Firestore with persistent local cache
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
    }),
})

export { db }
