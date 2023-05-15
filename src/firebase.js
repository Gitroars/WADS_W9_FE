
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,query,getDocs,addDoc,collection,where} from "firebase/firestore";
import { GoogleAuthProvider,getAuth,signInWithPopup,
signInWithEmailAndPassword,createUserWithEmailAndPassword,
sendPasswordResetEmail,signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCT7_5z3uPBva-egspW1iJMfMKet939rRw",
    authDomain: "todoapp-arvin.firebaseapp.com",
    projectId: "todoapp-arvin",
    storageBucket: "todoapp-arvin.appspot.com",
    messagingSenderId: "231977435341",
    appId: "1:231977435341:web:b3d74c28e5cd614cc36984"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async()=>{
  try{
    const res = await signInWithPopup(auth,googleProvider);
    const user = res.user;
    const q = query(collection(db,"users"),where("uid","==",user.uid));
    const docs = await getDocs(q);
    if(docs.docs.length === 0){
      await addDoc(collection(db,"users"),{
        uid:user.uid,
        name: user.displayName,
        authProvider:"google",
        email:user.email,
      });
    }
  } catch (err){
    console.error(err);
    alert(err.message);
  }
}
;

const logInWithEmailAndPassword = async (email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password);
  }catch(err){
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {auth,db,signInWithGoogle,logInWithEmailAndPassword,
registerWithEmailAndPassword,sendPasswordReset,logout,};