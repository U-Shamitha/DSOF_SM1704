import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color: #000000a7;
display:flex;
align-items:center;
justify-content:center;
`;
const Wrapper = styled.div`
width:600px;
height:600px;
padding: 20px;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;
`;
const Close = styled.div`
position: absolute;
top: 10px,
right: 10px;
cursor: pointer;
`;
const Title = styled.h1`text-align: center;`;

const Input = styled.input`
border: 1px solid black
color: black;
border-radius: 3px;
padding: 10px;
background-color: transparent;
`
const Desc = styled.textarea`
border: 1px solid black
color: black;
border-radius: 3px;
padding: 10px;
background-color: transparent;
`
const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: white;
`
const Label = styled.label`
color: white;
font-size:14px;
`

const VideoUpload = ({setIsVideo, userId}) => {

    const [video,setVideo] = useState(undefined);
    const [videoPerc,setVideoPerc] = useState(0);
    const [videoUrl,setVideoUrl] = useState("");
    const [title,setTitle] = useState(0);
    const [desc,setDesc] = useState("");

    const navigate = useNavigate();

    
    useEffect(() => {
      video && uploadFile(video);
    }, [video]);

    const uploadFile = (file) => {
        const storage = getStorage();
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' +  progress + '% done');
                setVideoPerc(Math.round(progress));
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
                  setVideoUrl(downloadURL);
                });
            }
        );
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axios.post(`/posts/${userId}/videos`, { Title, Desc, videoUrl});
        setIsVideo(false);
        // res.status(200).json({"video uploaded"})
    }

 
  return (
    <Container>
        <Wrapper>
            <Close onClick={() => setIsVideo(false)}>X</Close>
            <Title>Upload a New Video</Title>
            <Label>Video: </Label>
            {videoPerc>0 ? ("Uploading: "+videoPerc) : (<Input type="file" accept='video/*' onChange={(e) => setVideo(e.target.files[0])}/>)}
            
            <Input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
            <Desc placeholder="Description" rows={8} onChange={e=>setDesc(e.target.value)}/>
            {/* <Input type="text" placeholder='Separate the tags with commas.'/>
            <Input type="file" accept="video/*" /> */}
            <Button onClick={handleUpload}>Upload</Button>
            

        </Wrapper>
    </Container>
  )
}

export default VideoUpload;