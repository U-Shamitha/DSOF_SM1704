import{
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
    VideoCallOutlined
} from '@mui/icons-material';
import { 
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import VideoUpload from './VideoUpload';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const server = 'https://socialmedia-server-k22t.onrender.com';

const MyPostWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image,setImage] = useState(null);
    const [post,setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const [isVideo, setIsVideo] = useState(false);
    const [video,setVideo] = useState(null);
    const [videoUrl,setVideoUrl] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [title,setTitle] = useState(0);
    const [desc,setDesc] = useState("");
    const [uploadingImg, setUploadingImg] = useState(0);
    const [uploadingVideo, setUploadingVideo] = useState(0);
    const [enablePost, setEnablePost] = useState(false);

    useEffect(() => {
        video && uploadFile(video,'video');
      }, [video]);

      useEffect(() => {
        image && uploadFile(image, 'image');
      }, [image]);
  
      const uploadFile = (file,content) => {
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
                //   setVideoPerc(Math.round(progress));
                  switch (snapshot.state) {
                  case 'paused':
                      console.log('Upload is paused');
                      break;
                  case 'running':
                      console.log('Upload is running');
                      if(content==='image'){setUploadingImg(progress);};
                      if(content==='video'){setUploadingVideo(progress);};
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
                    if(video && content==='video') {setVideoUrl(downloadURL);setEnablePost(true)}
                    if(image && content==='image') {setImageUrl(downloadURL);setEnablePost(true)}
                  });
              }
          );
      }

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if(image){
            formData.append("picture", image);
            formData.append("picturePath", image.name);
            formData.append("imageUrl",imageUrl);
        }
        if(video){
            console.log(videoUrl);
            formData.append("videoUrl",videoUrl);
        }

        const response = await fetch(`${server}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`},
            body: formData
        });
        // console.log(response);
        const posts = await response.json();
        console.log(posts);
        dispatch(setPosts({posts}));
        //reset after api call
        setIsImage(false);
        setIsVideo(false);
        setVideoUrl("");
        setImageUrl("");
        setImage(null);
        setVideo(null);
        setPost("");
        setUploadingImg(0);
        setUploadingVideo(0);
    };

    return(
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase 
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem"
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => 
                            setImage(acceptedFiles[0])
                        }
                    >
                        {({getRootProps, getInputProps}) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" }}}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            {isVideo &&
                // <VideoUpload setIsVideo={setIsVideo} />
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".mp4"
                        multiple={false}
                        onDrop={(acceptedFiles) => 
                            setVideo(acceptedFiles[0])
                        }
                    >
                        {({getRootProps, getInputProps}) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" }}}
                                >
                                    <input {...getInputProps()} />
                                    {!video ? (
                                        <p>Add Video Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{video.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {video && (
                                    <IconButton
                                        onClick={() => setVideo(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            }
            
            <div style={{margin:'10px'}}> 
            {video && uploadingVideo<100 && <div>Uploading Video ({Math.round(uploadingVideo)}%)</div>}
            {image && uploadingImg<100 && <div>Uploading Image ({Math.round(uploadingImg)}%)</div>}
            {video && uploadingVideo==100 && <div>Video Uploaded</div>}
            {image && uploadingImg==100 && <div> Image Uploaded</div>}
            </div>
        
            <Divider sx={{ margin: "1.25rem 0"}} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium }}}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem" onClick={() => setIsVideo(!isVideo)}>
                    <VideoCallOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium }}}
                    >
                        Video
                    </Typography>
                </FlexBetween>
                

                 {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain}} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain}} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain}} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                 ): (   
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                 )}

                 <Button
                    disabled = {!post ||( image && uploadingImg<100) || (video && uploadingVideo<100) || !enablePost}
                    onClick = {handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem"
                    }}
                 >
                    POST
                 </Button>
            </FlexBetween>
            
        </WidgetWrapper>
    )
}

export default MyPostWidget;





