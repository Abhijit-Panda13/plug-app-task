import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut, db } from "../../services/firebase";
import Signin from "./Signin";
import "./Dashboard.css"
import PropTypes from 'prop-types';
import { Pagination, Card } from 'antd';
import { Row, Col } from 'antd';
import { List, Avatar, Switch } from 'antd';
import { doc, getDoc } from "firebase/firestore";
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import { ref, child, get } from "firebase/database";
import LikeArticle from "./LikeArticle";
import Thumbs from "./Thumbs";




export default function Dashboard({onLogout}) {
  const [user, setUser]=useState(null);
  const [loading, setLoading] = useState(true);
  const [likes,setLikes] = useState(0);
  const { Meta } = Card;
  const user_details = JSON.parse(localStorage.getItem("token"));
  
  // var likeDislike = new Firebase("https://like-unlike.firebaseio.com/");

  // var like;
  // var dislike;

  // likeDislike.on("value", function(likeDislikeData) {
  //   var data = likeDislikeData.val();
  //   like = data.like;
  //   dislike = data.dislike;
  // });

  // $('.like-container').on('click', function() {
  //   likeDislike.update({
  //     like: like+1
  //   });
  //   console.log("Number of likes:" + like);
  // });

  // $('.dislike-container a').on('click', function() {
  //   likeDislike.update({
  //     dislike: dislike+1
  //   });
  //   console.log("Number of dislikes: " + dislike);
  // });

  var listData = null;
  const unique_id = user_details.uid;
  
  let navigate = useNavigate();
  
  
  if(user){
    listData = Object.values(user);
    listData.sort((a, b) => parseFloat(Object.keys(b.likes).length) - parseFloat(Object.keys(a.likes).length));
  }

  

  
  
  console.log(listData);
// for (let i = 0; i < listData.size(); i++) {
//   listData.push({
//     href: li[i].photoURL,
//     title: userAll[i].name,
//     avatar: userAll[i].photoURL,
//     description:
//       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }

const IconText = ({ type, text }) => (
  <span>
    <StarOutlined type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

  useEffect(async () => {
    console.log("hi");
    if(!user){
      const dbRef = ref(db);
      await get(child(dbRef, `users/`)).then((snapshot) => {
        setUser(snapshot.val());
        setLoading(false);
      }).catch((error) => {
        console.error(error);
      })
    }
  }, []);
  return (
    <div>
      
      <div className="dashboard">
      <Row>
      <Col>
        <h1 className="dashboard-text">Welcome Home</h1>
        <button className="logout-button" onClick={onLogout}>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
            alt="google icon"
          />
          <span>logout</span>
        </button>
      </Col>
      </Row>
      <Row>
      <Col span={4}>col-8</Col>
      <Col span={16} style={{textAlign : "center"}}>
      <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 1,
    }}
    dataSource={listData ? listData: []}
    footer={
      <div>
        
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.title}
        // actions={[
        //   <IconText type="star-o" text="156" key="list-vertical-star-o" />,
        //   <IconText type="like-o" text="156" key="list-vertical-like-o" />,
        //   <IconText type="message" text="2" key="list-vertical-message" />,
        // ]}
        
      >
        <Card
          hoverable
          style={{ width: 400 }}
          cover={<img alt="example" src={item.photoURL} style={{padding:"2rem", borderRadius : "50%"}}/>}
        >
        <div>
        <Row>
          
          <div class="container">
          <Col>
            {user && <LikeArticle liker_id = {unique_id} liked_id = {item.uid} />}
          </Col>
          
          <Col>
            {Object.keys(user[item.uid].likes).length}
          </Col>
          </div>
        </Row>
        <Row>
        <Col>
            {user && <Thumbs liker_id = {unique_id} liked_id = {item.uid} />}
          </Col>
        </Row>
        </div>
          <Meta title={item.name} description="www.instagram.com" />
        </Card>
        
      </List.Item>
    )}
  />
  </Col>
  </Row>
    </div> 
  </div>
    
  );
}
