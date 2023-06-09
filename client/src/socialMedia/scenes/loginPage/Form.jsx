import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setLogin } from 'socialMedia/state';
import Dropzone from 'react-dropzone';
import FlexBetween from 'socialMedia/components/FlexBetween';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsI8KZSX5d3O55-98HKlPBUh0BDSJ_meI",
    authDomain: "sma1-1a501.firebaseapp.com",
    projectId: "sma1-1a501",
    storageBucket: "sma1-1a501.appspot.com",
    messagingSenderId: "334054976510",
    appId: "1:334054976510:web:040c64a73bebfd9e876eaf"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValueuseRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
}

const initialValuesLogin = {
    email: "",
    password: ""
}


const server = 'https://socialmedia-server-k22t.onrender.com';


const Form = () => {
    const [ pageType, setPageType ] = useState("login");
    const [ image, setImage ] = useState(null);
    const [ profileUrl, setProfileUrl ] = useState(""); //store firebase image url
    const [progressPer, setProgressPer] = useState(0);

    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    useEffect(() => {
       image && uploadFile(image);
      }, [image]);

      const uploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressPer(progress);
                console.log('Upload is ' +  progress + '% done');
              //   setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    break;
                }
            }, 
            (error) => {},
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  if(image) {setProfileUrl(downloadURL);}
                });
            }
        );
    }

    const register = async (values, onSubmitProps ) => {
        //this allows us to send form info with image
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }
        // formData.append('friends',[]);
        formData.append('picturePath', values.picture.name);
        formData.append('profileUrl', profileUrl);

        // const savedUserResponse = await fetch(
        //     "http://localhost:3001/auth/register",
        //     {
        //         method: "POST",
        //         body: formData,
        //     }
        // );

        const savedUserResponse = await fetch(
            `${server}/auth/register`,
            {
                method: "POST",
                body: formData,
            }
        );
        
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser){
            setPageType("login");
        }
    };

    const login = async ( values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            `${server}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInResponse.json();
        console.log('loggedIn: ')
        console.log(loggedIn ? loggedIn : '*')
        onSubmitProps.resetForm();
        if (loggedIn){
            console.log('before dispatch set login');
            // dispatch(
                // setLogin({
                //     user: loggedIn.user,
                //     token: loggedIn.token
                // })
            dispatch( {type: 'LOGIN_SM', payload:{user_sm: loggedIn.user,token_sm: loggedIn.token}})
            
            console.log('after dispatch set login');
            navigate(0);
        }

    }


    const handleFormSubmit = async(values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return(
        <Formik
            onSubmit= {handleFormSubmit}
            initialValues = {isLogin ? initialValuesLogin : initialValueuseRegister}
            validationSchema = { isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit = {handleSubmit}>
                    <Box
                        display="grid"
                        gap = "30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div":{ gridColumn: isNonMobile ? undefined: "span 4"}
                        }}
                    >
                        {isRegister && (
                            <>
                            <TextField
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                label="Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                sx={{gridColumn: "span 4"}}
                            />
                            <TextField
                                label="Occupation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name="occupation"
                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                helperText={touched.occupation && errors.occupation}
                                sx={{gridColumn: "span 4"}}
                            />
                            <Box
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png,.mp4"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => 
                                       { setFieldValue("picture", acceptedFiles[0]);
                                        setImage(acceptedFiles[0])}
                                    }
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" }}}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>

                            </Box>
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={
                                Boolean(touched.email) && Boolean(errors.email)
                            }
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={
                                Boolean(touched.password) && Boolean(errors.password)
                            }
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* BUTTONS */}
                    {(progressPer<100  && !isLogin)&& <span>uploading...({progressPer}%)</span>}
                    <Box>
                        <Button
                            fullWidth
                            disabled={!isLogin && progressPer<100}
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover":{ color: palette.primary.main }
                            }}
                        >
                            { isLogin ? "LOGIN" : "REGISTER" }
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login" );
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover":{
                                    cursor:"pointer",
                                    color: palette.primary.light,
                                }
                            }}
                        >
                            {isLogin 
                            ? "Don't have an account ? Sign Up here." 
                            : "Already have an account? Login here."}

                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default Form;