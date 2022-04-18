import React, {useState, useEffect} from "react";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
// import { unique_id } from "./Main";
import { doc, setDoc } from "firebase/firestore";
import {ref, set, get, child} from "firebase/database"; 
import {auth, provider, db} from "../../services/firebase";

export default function LikeArticle({liker, liked}){
    const [users, setUser]=useState(null);
    const user = JSON.parse(localStorage.getItem("token"));
    const saveChange = async(user) =>{
        console.log("Hi");
        await set(ref(db, 'users/'+user.uid),{
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          likes: {...liker},
          favourites: []
        }).then(function(res){
          alert("Liked");
        }).catch(function(err){
          alert("Data error");
        }) 
      }
      var listData = null;
      if(user){
        listData = Object.values(user);
      }
      useEffect(async () => {
        console.log("hi");
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
            {listData && listData.filter(user => user.uid === liked).map((user)=>{
                {user.likes.includes(liker) ? <HeartFilled /> : <HeartOutlined />}
            })}
            
        </div>
    )
}