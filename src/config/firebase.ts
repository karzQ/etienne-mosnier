// Import the functions you need from the SDKs you need

import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { initializeApp } from "firebase/app";

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

export const getCards = async () => {
  const cardsCol = collection(db, 'cards')
  const cardsSnapshot = await getDocs(cardsCol)
  const cardsList = cardsSnapshot.docs.map((doc: any) => doc.data())
  return cardsList
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
      const docRef = await addDoc(collection(db, 'cards'), { ...card, image: url })
      console.log(`New Card written, with ID: ${docRef.id}`)
    } catch (e: any) {
      console.error('Error adding Card:', e)
    }

  })
}