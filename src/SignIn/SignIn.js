import {StyledFirebaseAuth} from "react-firebaseui";
import {EmailAuthProvider, getAuth, isSignInWithEmailLink} from "firebase/auth";
import {Box, Typography} from "@mui/material";

const SignIn = () => {
    const auth = getAuth();

    const uiConfig = {
        signInFlow: isSignInWithEmailLink(auth, window.location.href) ? 'redirect' : 'popup',
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
        signInOptions: [
            {
                provider: EmailAuthProvider.PROVIDER_ID,
                signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
            }
        ],
    };

    return (
        <Box sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}
        >
            <Box sx={{maxWidth: "45rem"}}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: {
                            xs: "1.5rem",
                            sm: "3rem"
                        },
                        py: 2,
                        px: 2,
                        mb: 2,
                        borderRadius: 3,
                        color: "white",
                        background: "rgba(0, 0, 0, 0.6)"
                    }}>Camp Phillip Forms Admin</Typography>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </Box>

        </Box>
    );
}

export default SignIn;
