import logo from './logo.svg';
import './App.css';
import{Button,Modal,Input,makeStyles} from '@material-ui/core'
import {useState,useEffect} from 'react'
import {auth,db} from './firebase'
import ImageUpload from './imageupload';
import Post from './Post'
import InstagramEmbed from "react-instagram-embed";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function App() {
  const classes=useStyles()
  const[username,setUsername]=useState('')
  const[user,setUser]=useState(null)
  const[open,setOpen]=useState(false)
  const[opensignin,setOpensignin]=useState(false)
  const[password,setPassword]=useState('')
  const[email,setEmail]=useState('')
const[posts,setPosts]=useState()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //login
        console.log(authUser);
        setUser(authUser);
      } else {
        //logout
        setUser(null);
      }
    });

    return () => {
      //perform cleanup actions
      unsubscribe();
    };
  }, [user, username]);
  const login=(e)=>{
    e.preventDefault()
    
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpensignin(false)
  }
  console.log(posts)
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    console.log({ posts });
  }, []);
  const signup=(e)=>{
e.preventDefault()
auth
.createUserWithEmailAndPassword(email, password)
.then((authUser) => {
  return authUser.user.updateProfile({
    displayName: username,
  });
})
.catch((error) => alert(error.message));
  }
  return (
  <>
  <div className='app'>
  <Modal open={open} onClose={() => setOpen(false)}>
  <div className={classes.paper} style={{ transform: `translate(120%, 100%)`}}>
  <form className='signinform'>
  <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
              alt=""
            />
          </center>
    <Input placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
    <Input placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <Button type='submit'    variant="contained"
              color="primary"
              disableElevation onClick={login}>login</Button>
  </form>
  </div>
  </Modal>
  <Modal open={opensignin} onClose={() => setOpensignin(false)}>
  <div className={classes.paper} style={{ transform: `translate(120%, 100%)`}}>
  <form className='signinform'>
  <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
              alt=""
            />
          </center>
    <Input placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
    <Input placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <Input placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <Button type='submit'    variant="contained"
              color="primary"
              disableElevation onClick={signup}>signup</Button>
  </form>
  </div>
  </Modal>
  <div className='appheader'>
  <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt="logo"
        />
  {user?<Button   variant="outlined"
            color="primary" onClick={()=>auth.signOut()}>logout</Button>:<>
            <div className='signincontainer'>
  <Button onClick={()=>setOpen(true)}   variant="contained"
            color="primary"     disableElevation>login</Button>
  <Button onClick={()=>setOpensignin(true)}   variant="outlined"
            color="primary"     disableElevation>signup</Button></div></>}
  </div>
  <div className="app__posts">
        <div className="app__postsLeft">
  {posts?.map((p)=><>
  <Post   key={p.data.id}
              postId={p.data.id}
              user={user}
              username={p.data.username} caption={p.data.caption} url={p.data.imageUrl}/>
  </>)}
  </div>
  <div className="app__postsRight">
          <h3>Clone Made By - </h3>
          <InstagramEmbed
            url="https://www.instagram.com/p/CAAU_4unOFr/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/B5f2GV4l8t-/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
    
  </div>
  {user&&<ImageUpload username={user?.displayName}/>}
  </div>
  </>
  );
}

export default App;
