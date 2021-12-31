import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SignIn from "./SignIn/SignIn";
import FormList from "./FormList";
import SubmissionList from "./SubmissionList";
import SubmissionFields from "./SubmissionFields";

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formSelected, setFormSelected] = useState();
    const [submissionSelected, setSubmissionSelected] = useState();

    const auth = getAuth();

    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(auth, user => {
            setIsSignedIn(!!user);
            setLoading(false);
        });
        return () => unregisterAuthObserver();
    }, []);

    return (
        <main>
            {!loading &&
                <>
                    {!isSignedIn && <SignIn/>}
                    {isSignedIn &&
                        <>
                            <FormList onFormSelected={(formId) => setFormSelected(formId)}/>
                            <SubmissionList formSelected={formSelected} onSubmissionSelected={(submissionId) => setSubmissionSelected(submissionId)}/>
                            <SubmissionFields submission={submissionSelected}/>
                        </>
                    }
                </>
            }
        </main>
    );
}

export default App;
