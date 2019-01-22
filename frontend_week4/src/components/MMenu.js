import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Card, Modal } from "antd";
import "../css/MMenu.css";
import axios from 'axios';
const { Header, Footer, Sider, Content } = Layout;

const axiosInstance = axios.create({
  baseURL: "",
  // headers:{
  //     'Content-Type' : null
  // }
});


// 앱에서 다른 라우트로 이동, Link 컴포넌트 쓰면 새로고침 안됨, a href 쓰면 새로고침 된다
// NavLink: 설정한 url 활성화되면 특정 스타일 혹은 클래스 지정, 중첩가능한 것은 exact, 활성화될 때 특정 클래스 설정은 activeClassName

class MMenu extends Component {

  state = {
    nick: 'guest',
    login: false
  }

  handleSubmit = (e) => {
      e.preventDefault()

      this.getUserData();
  }

  componentDidMount() {
    this.getUserData();
  }

  

  getUserData = () => {
    //let self = this
    axiosInstance.get('http://143.248.140.106:680/api/user',{withCredentials:true})
      .then((response) => {
        if(response.data === 'You are not authenticated'){
            console.log('권한이 없습니다')
            return
        }else {
            console.log('hello')
            // self.$set(this, 'user', response.data.user)
            // this.$set(this, 'user', response.data.user)
            this.setState({
                login: true,
                nick: response.data.user.nick
                // email: response.data.user.email
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
  }

  onLogout = (e) => {
    axiosInstance.get('http://143.248.140.106:680/api/logout', {withCredentials:true})
        .then((response) => {
            console.log('logout ok')
            // this.name = 'guest'
            this.state.login = false
            // this.email = 'guest'
            /* 새로고침 */
            window.location.reload()
            console.log(this.state.login)
            alert('로그아웃 되었습니다')
        })
        .catch((errors) => {
            console.log('로그아웃 할 수 없습니다')
            console.error(errors)
        })
  }


  render() {
    const { login } = this.state

    return (
      <div>
      <Header className="header">
      <a href="/" className="aaa"><input type="button" class="img-button"></input></a>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">
            <Link to="/notice">공지</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/review">후기</Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/chat">채팅</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/food">식당</Link>
          </Menu.Item>
        </Menu>
        <div className="login">
          {!login && <Link to="/auth/login">로그인</Link>}
          <span className="user">{login && this.state.nick +"님, 안녕하세요"}</span>
          {login && <Link to="/" onClick={this.onLogout}>&nbsp;&nbsp;&nbsp;&nbsp;로그아웃</Link>}
        </div>
      </Header>
      </div>
    );
  }
}

export default MMenu;
