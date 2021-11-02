import { useContext, useEffect, useState, useRef } from "react";
import { firestore } from "./firebase";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import VideocamIcon from '@material-ui/icons/Videocam';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SendIcon from '@material-ui/icons/Send';
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";

let VideoCard = (props) => {
  let [boxOpen, setBoxOpen] = useState(false);
  let [playing, setPlaying] = useState(true);
  let [currentUserComment, setCurrentUserComment] = useState("");
  let [allComments, setAllComments] = useState([]);
  let [like, setLike] = useState(false);
  let videoRef = useRef(null);

  let value = useContext(AuthContext);

  useEffect(() => {
    let f = async () => {
      let allCommentId = props.post.comments;
      let arr = [];

      for (let i = 0; i < allCommentId.length; i++) {
        let id = allCommentId[i];

        let doc = await firestore.collection("comments").doc(id).get();
        let commentData = { ...doc.data(), id: doc.id };
        arr.push(commentData);
      }

      setAllComments(arr);
    };

    f();
  }, [props]);

const observer = new IntersectionObserver(entries =>{
  entries.forEach(entry =>{
    //entry.intersectionRatio > 0.5 ? entry.target.play() : entry.target.pause()
    entry.intersectionRatio > 0.5 && !playing ?  entry.target.play() : entry.target.pause()
    // entry.intersectionRatio > 0.5 && !playing ?  setPlaying(true) : setPlaying(false)
  })
})
const videos = document.querySelectorAll('video');
videos.forEach(video =>{
  observer.observe(video);
})



  return (
    <div className="video-card">

      {/* <video src="https://www.youtube.com/watch?v=Cp2GPuhQrjw"></video> */}
      <video 
      onClick={(e) => {
        if (playing) {
          setPlaying(false);
          e.currentTarget.pause();
          // videoRef.current.pause();
        } else {
          setPlaying(true);
          e.currentTarget.play();
          // videoRef.current.play();
        }
      }} 
      // onScroll = { (e) => {
      //   if(e.intersectionRatio != 0.5 && !playing) {
      //     videoRef.current.pause();
      //     setPlaying(true);
      //   } else if (playing) {
      //     videoRef.current.play();
      //     setPlaying(false);
      //   }
      // }}
        src={props.post.url}
        loop
        ref={videoRef}

      ></video>
      {/* 
<div className="video-header">
        <span class="material-icons-outlined" style={{
          color: "white", position: "absolute",
          left: "0px", cursor: "pointer"
        }}>
          chevron_left
        </span>
        <h3 style={{
          color: "black", position: "absolute",
          top: "0px"
        }}> <b>Freels</b> </h3>
        <span class="material-icons-outlined">
                photo_camera
              </span>
      </div> */}

      <div className="video-header">
        <Link to="/profile" ><span class="material-icons-outlined" style={{
          cursor: "pointer", color: "white", fontSize: 34
        }} >
          <ChevronLeftIcon/>
        </span></Link>

        <h2> <b> Reels</b> </h2>

        <span class="material-icons-outlined hide" style={{
          cursor: "pointer"
        }}>
          <VideocamIcon/>
        </span>
      </div>


      <span class="material-icons-outlined like response-phone" onClick={() => {
          if(!like){
            setLike(true);

          }else{
            setLike(false)
          }
      }

      }><FavoriteBorderIcon/></span>
      <span class="material-icons-outlined comment response-phone" style={{ color: "black" }} onClick={() => {
        if (boxOpen) setBoxOpen(false);
        else setBoxOpen(true);
      }}>
        <ChatBubbleOutlineIcon/>
      </span>
      <span class="material-icons-outlined share response-phone" style={{ color: "black" }} onClick={() => {

        if (navigator.share) {
          navigator.share({
            title: Math.floor(Date.now() / 1e5),
            url: props.post.url
          }).then(() => {
            console.log('Thanks for sharing!');
          })
            .catch(console.error);
        }
      }}
      >
        <SendIcon/>
      </span>

      <p className="username" style={{ color: "black" }}>
        <b>{props.post.username}</b>
      </p>
      <p className="song" style={{ color: "black" }}>
        <span class="material-icons-outlined"><MusicNoteIcon/></span>
        <marquee>{props.post.username} <br /> | Original Audio |</marquee>
      </p>

      {boxOpen ? (
        <div className="comment-box">
          <button
            className="comment-box-close-btn"
            onClick={() => {
              setBoxOpen(false);
            }}
          >
            X
          </button>

          <div className="all-comments">
            {allComments.map((comment, index) => {
              return (
                <div key={index}>
                  <img className="img-home" src={comment.pic} alt="comment" />
                  <div>
                    <p>
                      <b>{comment.username}</b>
                    </p>
                    <p className="inner-comment">{comment.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="comment-form">
            <input
              type="text"
              value={currentUserComment}
              onChange={(e) => {
                setCurrentUserComment(e.currentTarget.value);
              }}
            />
            <button
              onClick={() => {
                let p = firestore.collection("comments").add({
                  comment: currentUserComment,
                  username: value.displayName,
                  pic: value.photoURL,
                });

                setCurrentUserComment("");

                p.then((docRef) => {
                  return docRef.get();
                }).then((doc) => {
                  firestore
                    .collection("posts")
                    .doc(props.post.id)
                    .update({
                      comments: [...props.post.comments, doc.id],
                    });
                });
              }}
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

{/* //Like Feature */}
     { like ? (<span class="material-icons-outlined like response-phone" onClick={() => {
          if(like){
            setLike(false);

          }else{
            setLike(true)
          }
      }}>
favorite
</span>) : ("")}
    </div>
  );
};

export default VideoCard;