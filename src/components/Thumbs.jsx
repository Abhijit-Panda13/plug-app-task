import React, {useState, useEffect} from "react";
import { LikeOutlined, LikeFilled, DislikeFilled, DislikeOutlined } from '@ant-design/icons';
// import { unique_id } from "./Main";
import { doc, setDoc } from "firebase/firestore";
import {ref, set, get, child} from "firebase/database"; 
import {auth, provider, db} from "../../services/firebase";
import { Row, Col } from 'antd';
import "./Thumbs.css";


var liked_id=null;
export default function Thumbs(props){
    const [users, setUser]=useState(null);
    const user = JSON.parse(localStorage.getItem("token"));
    liked_id = props.liked_id;
    console.log(liked_id);
    const saveLikeChange = async() =>{
        const liked_details = users[props.liked_id];
       
        await set(ref(db, 'users/'+liked_id),{
          name: liked_details.name,
          email: liked_details.email,
          photoURL: liked_details.photoURL,
          uid: liked_details.uid,
          likes: {...liked_details.likes, [props.liker_id] : props.liker_id},
          thumbsUp: liked_details.thumbsUp,
          thumbsDown: liked_details.thumbsDown
        }).then(function(res){
            window.location.reload();
        }).catch(function(err){
          alert("Data error");
        }) 
      }

      const saveUnlikeChange = async() =>{
      
        const liked_details = users[props.liked_id];
        const likes = delete liked_details.likes[props.liker_id];
        await set(ref(db, 'users/'+liked_id),{
          name: liked_details.name,
          email: liked_details.email,
          photoURL: liked_details.photoURL,
          uid: liked_details.uid,
          likes: likes,
          thumbsUp: liked_details.thumbsUp,
          thumbsDown: liked_details.thumbsDown
        }).then(function(res){
          window.location.reload();
        }).catch(function(err){
          alert("Data error");
        }) 
      }
      const thumbsUp = async() =>{
        const liked_details = users[props.liked_id];
        
        const likes = liked_details.thumbsDown[props.liker_id + "down"] ? (delete liked_details.thumbsDown[props.liker_id + "down"]) : liked_details.thumbsDown;
        await set(ref(db, 'users/'+liked_id),{
          name: liked_details.name,
          email: liked_details.email,
          photoURL: liked_details.photoURL,
          uid: liked_details.uid,
          likes: liked_details.likes,
          thumbsUp: {...liked_details.thumbsUp, [props.liker_id + "up"] : props.liker_id},
          thumbsDown: likes,
          description: liked_details.description
        }).then(function(res){
            window.location.reload();
        }).catch(function(err){
          alert("Data error");
        }) 
      }
      const thumbsDown = async() =>{
        const liked_details = users[props.liked_id];
        
        const likes = liked_details.thumbsUp[props.liker_id + "up"] ? (delete liked_details.thumbsUp[props.liker_id + "up"]) : liked_details.thumbsUp;
        await set(ref(db, 'users/'+liked_id),{
          name: liked_details.name,
          email: liked_details.email,
          photoURL: liked_details.photoURL,
          uid: liked_details.uid,
          likes: liked_details.likes,
          thumbsUp: likes,
          thumbsDown: {...liked_details.thumbsDown, [props.liker_id + "down"] : props.liker_id},
          description: liked_details.description
        }).then(function(res){
            window.location.reload();
        }).catch(function(err){
          alert("Data error");
        }) 
      }

      const thumbsUpClear = async() =>{
        const liked_details = users[props.liked_id];
        
        const likes = liked_details.thumbsUp[props.liker_id + "up"] ? (delete liked_details.thumbsUp[props.liker_id + "up"]) : liked_details.thumbsUp;
        await set(ref(db, 'users/'+liked_id),{
          name: liked_details.name,
          email: liked_details.email,
          photoURL: liked_details.photoURL,
          uid: liked_details.uid,
          likes: liked_details.likes,
          thumbsUp: likes,
          thumbsDown: liked_details.thumbsDown,
          description: liked_details.description
        }).then(function(res){
            window.location.reload();
        }).catch(function(err){
          alert("Data error");
        }) 
      }

      const thumbsDownClear = async() =>{
        const liked_details = users[props.liked_id];
        
        const likes = liked_details.thumbsDown[props.liker_id + "down"] ? (delete liked_details.thumbsDown[props.liker_id + "down"]) : liked_details.thumbsDown;
        await set(ref(db, 'users/'+liked_id),{
          name: liked_details.name,
          email: liked_details.email,
          photoURL: liked_details.photoURL,
          uid: liked_details.uid,
          likes: liked_details.likes,
          thumbsUp: liked_details.thumbsUp,
          thumbsDown: likes,
          description: liked_details.description
        }).then(function(res){
            window.location.reload();
        }).catch(function(err){
          alert("Data error");
        }) 
      }
      var listData = null;
      
      useEffect(()=>{
        let ignore = false;
        async function fetchData(){
          console.log("hi");
          if (!user) {
            const dbRef = ref(db);
            const res = await get(child(dbRef, `users/`))
              .then((snapshot) => {
                console.log(snapshot.val());
                if (!ignore) setUser(snapshot.val()) ;
                
              })
              .catch((error) => {
                console.error(error);
              });
          }
        };
        fetchData();
        return () => { ignore = true; }
        
      }, []);
    
    return(
        <div>
        <Row>
            <Col>
                {(users && users[props.liked_id] && users[props.liked_id].thumbsUp[props.liker_id + "up"]) ? <LikeFilled  style={{ fontSize: '150%'}} onClick={thumbsUpClear}/> : <LikeOutlined style={{ fontSize: '150%'}} onClick={thumbsUp}/>}
            </Col>
            <Col className="dislike">
                {(users && users[props.liked_id] && users[props.liked_id].thumbsDown[props.liker_id + "down"]) ? <DislikeFilled style={{ fontSize: '150%'}} onClick={thumbsDownClear}/> : <DislikeOutlined style={{ fontSize: '150%'}} onClick={thumbsDown}/>}
            </Col>
        </Row>
        </div>
    )
}