import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/firebase";
import Signin from "./Signin";
import PropTypes from 'prop-types';
import { Pagination, Card } from 'antd';
import { Row, Col } from 'antd';
import { List, Avatar, Icon } from 'antd';


export default function Dashboard({onLogout}) {
  const [user, setUser]=useState(localStorage.getItem("User"));
  const [state, setState] = useState({
    minValue: 0,
    maxValue: 1
  })
  let navigate = useNavigate();
  console.log(user);


  const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

  const numEachPage = 4 ;  // Use a constant here to keep track of number of cards per page

  
    let data = [
      { title: "Card title1", value: "Card content1" },
      { title: "Card title2", value: "Card content2" },
      { title: "Card title3", value: "Card content3" },
      { title: "Card title4", value: "Card content4" },
      { title: "Card title5", value: "Card content5" }
    ];
    const handleChange = value => {
      setState({
        minValue: (value - 1) * numEachPage,
        maxValue: value * numEachPage
      });
    };
  return (
    <div>
      <div>
        {data &&
          data.length > 0 &&
          data.slice(state.minValue, state.maxValue).map(val => (
            <Card
              title={val.title}
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>{val.value}</p>
            </Card>
          ))}
        <Pagination
          defaultCurrent={1}
          defaultPageSize={numEachPage} //default size of page
          onChange={handleChange}
          total={5} //total number of card data available
        />
      </div>
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
      pageSize: 3,
    }}
    dataSource={listData}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <IconText type="star-o" text="156" key="list-vertical-star-o" />,
          <IconText type="like-o" text="156" key="list-vertical-like-o" />,
          <IconText type="message" text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
    </div> 
  </div>
    
  );
}
