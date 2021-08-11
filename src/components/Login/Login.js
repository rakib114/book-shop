import {
    Grid,
    Paper,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { useContext, } from "react";
import { userContext } from "../../App";
import { LockOpenOutlined } from "@material-ui/icons";
import firebaseConfig from "../firebase.config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const LogIn = () => {
    const paperStyle = {
        padding: 20,
        height: "60vh",
        width: 300,
        margin: "40px auto",
    };
    const [user, setUser] = useState({
        email: "",
        password: "",
        error: "",
        success: "",
        name: '',
    });
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const handleBlur = (event) => {
        let isFormVaild = true;
        if (event.target.name === "email") {
            isFormVaild = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const passwordValid = event.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(event.target.value);
            isFormVaild = passwordValid && passwordNumber;
        }
        if (isFormVaild) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    };
    const handleSubmit = (event) => {
        if (user.email && user.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        event.preventDefault();
    };
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                const { displayName, email } = user;
                const signedInUser = { name: displayName, email }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
                // console.log(signedInUser);
            }).catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
            });
    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={{ background: "#3f51b5" }}>
                        {" "}
                        <LockOpenOutlined></LockOpenOutlined>
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit} action="">
                    <TextField
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                        id="outlined-basic"
                        label="email"
                        variant="outlined"
                        placeholder="Enter Email"
                        fullWidth
                        required
                        type="email"
                        name="email"
                    />
                    <TextField
                        onBlur={handleBlur}
                        style={{ marginTop: "15px" }}
                        id="outlined-basic"
                        label="password"
                        variant="outlined"
                        placeholder="Enter Password"
                        fullWidth
                        required
                        type="password"
                        name="password"
                    />
                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Remember Me"
                    />
                    <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        style={{ margin: "8px 0px", background: "#3f51b5" }}
                    >
                        Sign in
                    </Button>
                </form>
                <Typography style={{ margin: "5px 0px" }}>
                    <Link href="#" style={{ color: "#3f51b5" }}>
                        Forgot Password?
                    </Link>
                </Typography>
                <Typography style={{ margin: "8px 0px" }}>
                    {" "}
                    Don’t have an account?
                    <Link style={{ color: "#3f51b5" }} to="/signup">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
            <p style={{ color: "red", textAlign: "center" }}>
                {" "}
                <b>{user.error}</b>{" "}
            </p>
            <div style={{ borderBottom: '1px solid black', textAlign: 'center' }} ><b>or</b></div>
            <div style={{ textAlign: 'center' }} className='mt-4' >
                <Button variant="contained" color="primary" onClick={handleGoogleSignIn}   >
                    <FontAwesomeIcon icon={faSignInAlt} className="mx-2" />  Login With Google
                </Button>
            </div>
        </Grid>
    );
};

export default LogIn;