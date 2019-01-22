import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink
} from "components";
import axios from 'axios';
import Password from "antd/lib/input/Password";

const axiosInstance = axios.create({
  baseURL: ""
});



class Login extends Component {
  state = {
    user: [],
    email: '',
    passwd : '',
    login: false
  }
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    
    this.onLogin();

    console.log('--------------------')
    console.log(this.state)
    console.log('--------------------')
    // 상태값을 onCreate를 통하여 부모에게 전달
    // this.props.onCreate(this.state);

    // 상태 초기화
    this.setState({
        email: '',
        passwd: ''
    })
  }

  onLogin(){
    console.log('Login 요청 들어옴')
    let email = this.state.email
    let passwd = this.state.passwd
    let data = {
        email: email,
        passwd : passwd
    }
    
    axiosInstance.post('http://143.248.140.106:680/api/login', data, { withCredentials: true })
    .then((response) => {
        console.log(response.data);
        console.log(this.state.login);
        window.location.reload()
        this.props.history.push('/')
    })
    .catch((error) => {
        console.log(error)
    })

  }

  checkSession = () => {
    axiosInstance.get('http://143.248.140.106:680/api/sess',{withCredentials:true})
    .then((response) => {
        console.log(response)
    })
    .catch(function(err){
        console.log(err);
    })
  }

  getUserData = () => {
    axiosInstance.get('http://143.248.140.106:680/api/user',{withCredentials:true})
      .then((response) => {
        if(response.data === 'You are not authenticated'){
            console.log('권한이 없습니다')
            return
        }else {
            console.log('hello')
            this.$set(this, 'user', response.data.user)
            this.setState({
                login: true,
                name: response.data.user.name,
                email: response.data.user.email
            })
            console.log('get user')
            console.log(response.data.user)
            return response.data.user.email
        }
      })
      .catch((errors) => {
        console.error(errors)
        console.log('get user data error')
      })
  }

  render() {
    return (
      <AuthContent title="로그인">
        {/* <InputWithLabel label="이메일" name="email" placeholder="이메일" />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <AuthButton>로그인</AuthButton> */}
        <form onSubmit={this.handleSubmit}>
                <input 
                    type='text'
                    placeholder='이메일'
                    value={this.state.email}
                    onChange={this.handleChange}
                    name='email'/>
                <input 
                    type='password'
                    placeholder='비밀번호'
                    value={this.state.passwd}
                    onChange={this.handleChange}
                    name='passwd'/>
                <button type="submit">로그인</button>
            </form>
        <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default Login;
