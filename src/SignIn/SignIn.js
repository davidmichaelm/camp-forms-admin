import {StyledFirebaseAuth} from "react-firebaseui";
import {EmailAuthProvider, getAuth} from "firebase/auth";
import "./SignIn.css";

const SignIn = () => {
    const auth = getAuth();

    const uiConfig = {
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
        signInOptions: [
            EmailAuthProvider.PROVIDER_ID
        ]
    };

    return (
        <div className="sign-in-container">
            <div className="sign-in-form">
                <h1 className="sign-in-form__header">Camp Phillip Forms Admin</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </div>

        </div>
    );
}

export default SignIn;
