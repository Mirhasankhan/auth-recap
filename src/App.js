import './App.css';
import { initializeApp } from 'firebase/app';
import firebase from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import firebaseConfig from './Firebase.config';
import { useState } from 'react';

const app = initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({})
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const ghProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
       });

  }
  const handleFacebookSignIn = ()=> {
    const auth = getAuth();
signInWithPopup(auth, fbProvider)
  .then((result) => {    
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    setUser(user)
    console.log(user)
  })
  .catch((error) => { 
    const errorCode = error.code;
    const errorMessage = error.message;    
    const email = error.customData.email;   
    const credential = FacebookAuthProvider.credentialFromError(error);
  });
  }
  const handleGithubSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, ghProvider)
  .then((result) => {   
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;  
    setUser(user)
    console.log(user)  
    
  }).catch((error) => {    
    const errorCode = error.code;
    const errorMessage = error.message;    
    const email = error.customData.email;  
    const credential = GithubAuthProvider.credentialFromError(error);  
    console.log('error', errorCode, errorMessage)
  });
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In Using Google</button>
      <br/>
      <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
      <br/>
      <button onClick={handleGithubSignIn}>Sign in using Githib</button>

      <h3>Name: {user.displayName}</h3>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt=""/>

    </div>
  );
}

export default App;
