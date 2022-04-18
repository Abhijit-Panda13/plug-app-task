import React, {useState, useEffect} from "react";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
// import { unique_id } from "./Main";
import { doc, setDoc } from "firebase/firestore";
import {ref, set, get, child} from "firebase/database"; 
import {auth, provider, db} from "../../services/firebase";
import { Row, Col } from 'antd';


var liked_id=null;
export default function LikeArticle(props){
    const [users, setUser]=useState(null);
    liked_id = props.liked_id;
    console.log(liked_id);
    const user = JSON.parse(localStorage.getItem("token"));
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
      
      var listData = null;
      
      useEffect(async () => {
        if(!users){
          const dbRef = ref(db);
          await get(child(dbRef, `users/`)).then((snapshot) => {
            setUser(snapshot.val());
          }).catch((error) => {
            console.error(error);
          })
        }
      }, []);
    
    return(
        <div>
        <Row>
            <Col>
                {(users && users[props.liked_id] && users[props.liked_id].likes[props.liker_id]) ? <HeartFilled onClick={saveUnlikeChange}/> : <HeartOutlined onClick={saveLikeChange}/>}
            </Col>
            <Col>
                
            </Col>
        </Row>
        </div>
    )
}