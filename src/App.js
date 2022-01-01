import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SignIn from "./SignIn/SignIn";
import Dashboard from "./Dashboard/Dashboard";
import {Grid} from "@mui/material";

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();

    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(auth, user => {
            setIsSignedIn(!!user);
            setLoading(false);
        });
        return () => unregisterAuthObserver();
    }, []);

    return (
        <Grid container style={{ height: "100%", display: "flex", alignItems: "stretch", background: "lightgray"}}>
            {!loading &&
                <>
                    {!isSignedIn && <SignIn/>}
                    {isSignedIn && <Dashboard/>}
                </>
            }
        </Grid>
    );
}

export default App;
