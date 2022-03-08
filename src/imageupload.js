import React, { useState } from "react";
import { Button } from "@material-ui/core";
import db from "./firebase";
import {firebaseApp} from "./firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, push, set, onValue, query, orderByChild, serverTimestamp }
 from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


export const ImageUpload=({username})=>{
    const [image, setImage] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");
  const[url,setUrl]=useState('')
    const handleChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = () => {
        const fileName = new Date().getTime() + image.name;
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef,image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
              }
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL)
                setUrl(downloadURL)
                db.collection("posts").add({
                  timestamp:new Date,
                  caption: caption,
                  imageUrl: url,
                  username: username,
                });
        
        });
      }
      );
      }
    
    
    return(
<>
<div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload} variant="contained" color="primary">
        Upload
      </Button>
    </div>

</>
    )
}
export default ImageUpload