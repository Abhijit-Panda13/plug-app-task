import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut, db } from "../../services/firebase";
import Signin from "./Signin";
import "./Profile.css";
import PropTypes from "prop-types";
import { Pagination, Card, Button, Modal } from "antd";
import { Row, Col } from "antd";
import { List, Avatar, Switch } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { ref, child, get, set } from "firebase/database";
import { Form, Input } from "antd";

let user_details = JSON.parse(localStorage.getItem("token"));
export default function Profile({ onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const { Meta } = Card;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Add Status");
  const [formValue, setFormValue] = useState({
    description: "",
  });
  let navigate = useNavigate();
  console.log(user_details);

  const saveDescription = async () => {
    const details = user[user_details.uid];
    console.log("Details", details);
    console.log("Key", formValue.description);
    await set(ref(db, "users/" + user_details.uid), {
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
    newData[e.target.name] = e.target.value;
    console.log("Value", e.target.name);
    setFormValue(newData);
  };

  const showModal = () => {
    setModalText("Add Status");
    setVisible(true);
  };

  // const handleOk = () => {

  // };

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

  const navigateToDashboard = () => {
    let path = `../`; 
    navigate(path);
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
  if (user) {
    user_details = user[unique_id];
  }

  useEffect(() => {
    async function fetchData() {
      console.log("hi");
      if (!user) {
        const dbRef = ref(db);
        const res = await get(child(dbRef, `users/`))
          .then((snapshot) => {
            console.log(snapshot.val());
            setUser(snapshot.val());
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="dashboard-text">
        Welcome to Abhijit Panda's Task for Plug-App
      </h1>
      <button class="button-28" role="button" onClick={navigateToDashboard}>
        See All Users
      </button>
      <div class="box-1 logout-button">
        <div onClick={onLogout} class="btn btn-one">
          <span>LOGOUT</span>
        </div>
      </div>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          onSubmit={(e) => handleSubmit(e)}
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            value={formValue.description}
            label="Description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input name="description" onChange={handleChange} />
          </Form.Item>
        </Form>
        <p>{modalText}</p>
      </Modal>
      <Card
        hoverable
        style={{ width: 400 }}
        cover={
          <img
            alt="example"
            src={user_details.photoURL}
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
        <Meta
          className="foot"
          title={user_details.name}
          description={user_details.description}
        />
        {user_details.description === true ? (
          <Button
            type="primary submit"
            onClick={showModal}
            className="status submit"
          >
            Add Status
          </Button>
        ) : (
          <Button type="primary" onClick={showModal} className="status">
            Edit Status
          </Button>
        )}
      </Card>
    </div>
  );
}
