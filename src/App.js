import React, {useEffect, useState} from 'react';
import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignIn from "./SignIn/SignIn";

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(auth, user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);

    return (
        <main>
            {!isSignedIn && <SignIn />}
            {isSignedIn && auth.currentUser.displayName}
        </main>
    );
}

export default App;
