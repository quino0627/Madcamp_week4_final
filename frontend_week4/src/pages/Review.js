import React, { Component } from "react";
import Post from "../components/Post";
import axios from "axios";
import "./Review.css";
import moment from "moment";
import {
  Layout,
  Card,
  Menu,
  Breadcrumb,
  Pagination,
  List,
  Avatar,
  Icon,
  Button,
  Modal,
  Input,
  Form
} from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
const axiosInstance = axios.create({
  baseURL: ""
});

var d = new Date();
var ISOData = d.toISOString();
var ISODate = ISOData.split("T", 1);
ISODate = moment().format().split("T", 1)

class Review extends Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false,
    visibles: false,
    titles: "",
    contents: ""
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };
  handleCancels = () => {
    console.log("Clicked cancel button");
    this.setState({
      visibles: false
    });
  };
  componentDidMount() {
    this._getPosts();
  }

  _renderPosts = () => {
    const posts = this.state.posts.map((post, index) => {
      return (
        // <Post
        //   onCreate={this.handleCreate}
        //   title={post.title}
        //   content={post.content}
        //   date={post.date}
        // />

        <Card
          nick = {this.state.nick}
          title={post.title}
          bordered={false}
          style={{ width: 300 }}
          onCreate={this.handleCreate}
        >
          <p>{post.nick}</p>
          <p>{post.date}</p>
          <p>{post.content}</p>
        </Card>
      );
    });
    return posts;
  };

  _getPosts = async () => {
    const posts = await this._callApi();
    posts.reverse();
    console.log("awaiting in getPosts");
    console.log(posts);
    this.setState({
      posts
    });
  };

  _callApi = () => {
    return axiosInstance
      .get("http://143.248.140.106:680/api/review")
      .then(function(response) {
        console.log(response.data);
        return response.data;
      });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOks = e => {
    console.log(e);
    this.setState({
      visibles: false
    });
  };
  handleOk = e => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true
    });

    e.preventDefault();


    axiosInstance.get('http://143.248.140.106:680/api/user',{withCredentials:true})
    .then((response) => {
      if(response.data === 'You are not authenticated'){
          console.log('권한이 없습니다')
          return
      }else {
          console.log('hello')

          axiosInstance
      .post("http://143.248.140.106:680/api/review", {
        nick: response.data.user.nick,
        title: this.state.postTitle,
        content: this.state.postContent,
        date:""+ISODate
      })
      .then(function(response) {
        console.log(response);
        window.location.reload();
        // 상태 초기화
        this.setState({
          postTitle: "",
          postContent: ""
        });
        this.setState({
          visible: false,
          confirmLoading: false
        });
      })
      .catch(function(error) {
        console.log(error);
      });
          // self.$set(this, 'user', response.data.user)
          // this.$set(this, 'user', response.data.user)
          this.setState({
              login: true,
              name: response.data.user.name,
              email: response.data.user.email
          })
          // this.state.name = response.data.user.name
          // this.state.email = response.data.user.email
          console.log('get user')
          console.log(response.data.user)
          // this.state.login = true
          //this.props.history.push('/')
          return response.data.user.email
      }
    })
    .catch((errors) => {
      console.error(errors)
      console.log('get user data error')
      //this.props.history.push('/')
    })

    // 상태값을 onCreate 를 통하여 부모에게 전달
    // this.props.onCreate(this.state);
    console.log(this.state.postTitle + this.state.postContent);
    
  };

  handleCreate = data => {
    console.log(data);
    this.setState({
      titles: "Aasdasd",
      contents: "ASDASD",
      visibles: true
    });
  };

  myCallback = data => {
    console.log(data);
  };

  render() {
    const { visible, confirmLoading, ModalText, visibles } = this.state;
    const { posts } = this.state;
    return (
      <div className={posts ? "Notice" : "Notice-loading"}>
        
        <div className="review__row1">
          <div>
            <Button type="primary" onClick={this.showModal}>
              후기 올리기
            </Button>
            <Modal
              title="후기 올리기"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
            >
              {/* <span>Title</span>
              <Input placeholder="Basic usage" />
              <span>Content</span>
              <TextArea
                placeholder="Autosize height with minimum and maximum number of lines"
                autosize={{ minRows: 2, maxRows: 6 }} */}
              <form onSubmit={this.handleSubmit} className="review__submit">
                <input
                  className="input__title"
                  placeholder="제목"
                  value={this.state.postTitle}
                  onChange={this.handleChange}
                  name="postTitle"
                />
                
                <textarea
                className="input__content"
                rows="5"
                cols="50"
                  placeholder="컨텐츠"
                  value={this.state.postContent}
                  onChange={this.handleChange}
                  name="postContent"
                />
              </form>
            </Modal>
            <Modal
              title={this.state.title1}
              visible={this.state.visibles}
              onOk={this.handleOks}
              onCancel={this.handleCancels}
            />
          </div>
        </div>
        <div className="review__row">
          {posts ? this._renderPosts() : "loading"}
        </div>
      </div>
    );
  }
}

export default Review;
