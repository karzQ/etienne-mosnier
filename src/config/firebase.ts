// Import the functions you need from the SDKs you need
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {getFirestore, collection, getDocs, addDoc, query, where, deleteDoc, doc } from 'firebase/firestore/lite'
import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Login } from './config';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiibitf7e-aOyHofdX8bDYA7pBVUZo3gw",
  authDomain: "emos-website.firebaseapp.com",
  projectId: "emos-website",
  storageBucket: "emos-website.appspot.com",
  messagingSenderId: "199542208287",
  appId: "1:199542208287:web:a402d17447628cdb55222a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth()
export let connectedUser: any = null;

export const SignIn = async (data: Login) => {
  try {
    if (data.login && data.password) {
      return await signInWithEmailAndPassword(auth, data.login, data.password)
    }
  } catch (error) {
    console.log({ error })
  }
}

export const SignOut = async () => {
  return await signOut(auth)
}

export const getCards = async (type: string) => {
  const arr: any[] = []
  const cardsCol = collection(db, 'cards')
  const q = query(cardsCol, where("type", "==", type));
  const cardsSnapshot = await getDocs(q)
  const cardsList = cardsSnapshot.docs.map((doc: any) => doc.data())
  for (let i = 0; i < cardsList.length; i++) {
    arr.push({...cardsList[i], _id: cardsSnapshot?.docs[i].id})
  }
  return arr.sort((a: any, b: any) => a.created_at - b.created_at)
}

export const deleteCard = async (id: string) => {
  const docRef = doc(db, "cards", id)
  await deleteDoc(docRef)
  console.log(`Successfully deleted Card ${id}.`)
}

export const addCard = async (card: any) => {
  const {image} = card
  const metadata = {
    contentType: "image/jpeg"
  }
  let url = '';

  const imageCardsRef = ref(storage, `cards/images/${image.name}`)  
  const uploadTask = uploadBytesResumable(imageCardsRef, image, metadata)

  uploadTask.on('state_changed', (snapshot: any) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload is ${progress}% done.`)
    
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused')
        break;
    }
  },
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  },
  async () => {
    url = await getDownloadURL(uploadTask.snapshot.ref)
    console.log(`URL available at ${url}`)

    try {
      const d = new Date()
      const created_at = `${d.getFullYear()}-${d.getDate()}-${(d.getMonth()+1)}`
      const docRef = await addDoc(collection(db, 'cards'), { ...card, created_at, image: url })
      console.log(`New article written, with ID: ${docRef.id}`)
    } catch (e: any) {
      console.error('Error adding Card:', e)
    }

  })
}