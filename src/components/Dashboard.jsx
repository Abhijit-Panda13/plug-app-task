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



export default function Dashboard({onLogout}) {
  const [user, setUser]=useState(null);
  const [loading, setLoading] = useState(true);
  const { Meta } = Card;
  

  var listData = null;
  
  let navigate = useNavigate();
  console.log(user);
  
  
  if(user){
    listData = Object.values(user);
    
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
      <h1 className="dashboard-text">Welcome Home</h1>
      <button className="logout-button" onClick={onLogout}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
          alt="google icon"
        />
        <span>logout</span>
      </button>
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
        <b>ant design</b> footer part
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
        extra={
          <img
            width={150}
            alt="logo"
            src={item.photoURL}

          />
        }
      >
        
        <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
          <Meta
            avatar={<Avatar src={item.photoURL} />}
            title={item.name}
            description="This is the description"
          />
        </Card>
      </List.Item>
    )}
  />
    </div> 
  </div>
    
  );
}
