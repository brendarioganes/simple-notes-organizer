import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDgFB_b_6N-E8YBCG8X0hhKcWW8Ixy_aFg",
  authDomain: "simple-notes-organizer.firebaseapp.com",
  databaseURL: "https://simple-notes-organizer-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "simple-notes-organizer",
  storageBucket: "simple-notes-organizer.firebasestorage.app",
  messagingSenderId: "453554904026",
  appId: "1:453554904026:web:08d869b97c17d70794fee3",
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)