import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut, db } from "../../services/firebase";
import Signin from "./Signin";
import "./Dashboard.css";
import PropTypes from "prop-types";
import { Pagination, Card, Button, Modal } from "antd";
import { Row, Col } from "antd";
import { List, Avatar, Switch } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { ref, child, get, set } from "firebase/database";
import LikeArticle from "./LikeArticle";
import Thumbs from "./Thumbs";
import { Form, Input } from "antd";

const user_details = JSON.parse(localStorage.getItem("token"));
export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const { Meta } = Card;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Add Status");
  let navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    description: "",
  });
  const year = new Date().getFullYear();
  const [key, setKey] = useState(null);
  console.log(user_details);

  const saveDescription = async () => {
    const details = user[key];
    console.log("Details", details);
    console.log("Key", formValue.description);
    await set(ref(db, "users/" + key), {
      name: details.name,
      email: details.email,
      photoURL: details.photoURL,
      uid: details.uid,
      likes: details.likes,
      thumbsUp: details.thumbsUp,
      thumbsDown: details.thumbsDown,
      description: formValue.description,
    })
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (err) {
        alert("Data error");
      });
  };

  const handleChange = (e) => {
    const newData = { ...formValue };
    newData[e.target.name.slice(0, 11)] = e.target.value;
    console.log("Value", e.target.name.slice(0, 11));
    setKey(e.target.name.slice(11));
    setFormValue(newData);
  };

  const showModal = () => {
    setModalText("Add Status");
    setVisible(true);
  };

  const handleSubmit = async (e) => {
    console.log(e);
    setModalText("Submitting");
    setConfirmLoading(true);
    saveDescription();
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    e.preventDefault();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  var listData = null;
  const unique_id = user_details.uid;

  const navigateToProfile = () => {
    let path = `./profile`; 
    navigate(path);
  };
  if (user) {
    listData = Object.values(user);
    listData.map((a) => {
      if (!a.likes[unique_id]) {
        listData.push(listData.splice(listData.indexOf(a), 1)[0]);
      }
    });
    listData.sort(function (a, b) {
      if (a.likes[unique_id] && !b.likes[unique_id]) {
        return -1;
      }
      if (!a.likes[unique_id] && b.likes[unique_id]) {
        return 1;
      }

      return (
        parseFloat(Object.keys(b.thumbsUp).length) -
        parseFloat(Object.keys(a.thumbsUp).length)
      );
    });
  }
  
  const IconText = ({ type, text }) => (
    <span>
      <StarOutlined type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

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
  return (
    <div>
      <div className="dashboard">
        <h1 className="dashboard-text">
          <u>Welcome to Abhijit Panda's Task for Plug-App</u>
        </h1>
        <h1 className="text">
          All Users
        </h1>
        <button class="button-28" role="button" onClick={navigateToProfile}>
          My Profile
        </button>
        <div class="box-1 logout-button">
          <div onClick={onLogout} class="btn btn-one">
            <span>LOGOUT</span>
          </div>
        </div>

        <Row>
          <Col span={4}></Col>
          <Col span={16} style={{ textAlign: "center" }}>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 1,
              }}
              dataSource={listData ? listData : []}
              footer={<div></div>}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  // actions={[
                  //   <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                  //   <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                  //   <IconText type="message" text="2" key="list-vertical-message" />,
                  // ]}
                >
                  <Card
                    className="User-Card"
                    hoverable
                    style={{ width: 400, height: 420 }}
                    cover={
                      <img
                        alt="example"
                        src={item.photoURL}
                        style={{
                          position: "relative",
                          left: "5rem",
                          padding: "1rem",
                          borderRadius: "50%",
                          width: "15rem",
                        }}
                      />
                    }
                  >
                    <div>
                      <Row className="Row1">
                        <div class="container">
                          <Col className="heart">
                            {user && (
                              <LikeArticle
                                liker_id={unique_id}
                                liked_id={item.uid}
                              />
                            )}
                          </Col>
                          <Col className="favourite">Favourite</Col>
                        </div>
                      </Row>
                      <Row className="Row2">
                        <Col className="heart">
                          {user && (
                            <Thumbs liker_id={unique_id} liked_id={item.uid} />
                          )}
                        </Col>
                        <Col className="likenumber">
                          {Object.keys(user[item.uid].thumbsUp).length}
                        </Col>
                        <Col className="dislikeName">Dislike</Col>
                      </Row>
                    </div>
                    <Meta
                      className="foot"
                      title={item.name}
                      description={item.description}
                    />
                    {/* {item.description === true ? <Button type="primary submit" onClick={showModal} className = "status submit">Add Status</Button> : <Button type="primary" onClick={showModal} className = "status">Edit Status</Button>} */}
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <footer className="Copyright">
          <p>Copyright ⓒ {year}</p>
        </footer>
      </div>
    </div>
  );
}
