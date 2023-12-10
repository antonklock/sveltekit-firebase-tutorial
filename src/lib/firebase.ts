// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { derived, writable, type Readable } from "svelte/store";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjRhPE4qXh7Q2ej4tL1MZoBek9iMwtPcY",
  authDomain: "sveltekit-tutorial-25393.firebaseapp.com",
  projectId: "sveltekit-tutorial-25393",
  storageBucket: "sveltekit-tutorial-25393.appspot.com",
  messagingSenderId: "563374494967",
  appId: "1:563374494967:web:6507cbb9cf5ab7e9f82ff2",
  measurementId: "G-9ESWT6LVWR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

// function userStore() {
//   let unsubscribe: () => void;

//   if (!auth || !globalThis.window) {
//     console.warn('Auth is not initialized or not in browser');
//     const { subscribe } = writable<User | null>(null);
//     return {
//       subscribe,
//     }
//   }

//   const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
//     unsubscribe = onAuthStateChanged(auth, (user) => {
//       set(user);
//     });

//     return () => unsubscribe();
//   });

//   return {
//     subscribe,
//   };
// }

function userStore() {
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    onAuthStateChanged(auth, (user) => {
      set(user);
    });
  });
  return {
    subscribe,
  }
}

export function docStore<T>(
  path: string,
) {
  let unsubscribe: () => void;
  const docRef = doc(db, path);
  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    })
    return () => unsubscribe();
  });
  return {
    subscribe,
    ref: docRef,
    id: docRef.id
  }
}

export const user = userStore();

interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  links: unknown[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null);
  }
})

