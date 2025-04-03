// Importe os módulos necessários do Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Para Realtime Database
// OU para Firestore:
// import { getFirestore } from "firebase/firestore";

// Sua configuração do Firebase (copiada do console)
const firebaseConfig = {
  apiKey: "AIzaSyBj8cjJFEPR_v9RTrjasJGZuwKzPralPRI",
  authDomain: "form-contato-abe15.firebaseapp.com",
  projectId: "form-contato-abe15",
  storageBucket: "form-contato-abe15.appspot.com", // Corrigi para o formato padrão
  messagingSenderId: "350880176537",
  appId: "1:350880176537:web:4655dc8705035e8a345b08"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha a referência do banco de dados
const database = getDatabase(app); // Para Realtime Database
// OU para Firestore:
// const db = getFirestore(app);

// Exporte as referências necessárias
export { database }; // Ou export { db } se usar Firestore