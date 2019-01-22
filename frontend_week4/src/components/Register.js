import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink
} from "components";
import axios from 'axios';
import "./Register.css";
import {

  Select
} from "antd";

const Option = Select.Option;

const axiosInstance = axios.create({
  baseURL: ""
});


class Register extends Component {
  state = {
    name: '',
    nick: '',
    email: '',
    passwd: '',
    school:''
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    
    this.onRegister();

    // 상태값을 onCreate를 통하여 부모에게 전달
    // this.props.onCreate(this.state);

    // 상태 초기화
    this.setState({
        name: '',
        nick: '',
        email: '',
        passwd: ''
    })            
  }

  onRegister = (e) => {
    console.log('회원가입 요청')
    let name = this.state.name
    let nick = this.state.nick
    let email = this.state.email
    let passwd = this.state.passwd
    let onRegister = () => {
        let data = {
            name: name,
            nick: nick,
            email: email,
            passwd: passwd
        }
        axiosInstance.post('http://143.248.140.106:680/api/register', data, {withCredentials:true})
        .then((response) => {
            if(response.data === '이미 가입된 email입니다'){
                alert('이미 존재하는 email입니다')
                this.props.history.push('/register')
            } else {
                alert('회원가입이 완료되었습니다')
                this.props.history.push('/auth/login')
            }
        })
        .catch((errors) => {
        })
    }
    onRegister();
  }


  render() {
    return (
      <AuthContent title="회원가입">
        {/* <InputWithLabel label="이메일" name="email" placeholder="이메일" />
        <InputWithLabel label="아이디" name="username" placeholder="아이디" />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <InputWithLabel
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
        />
        <AuthButton>회원가입</AuthButton> */}
        <form onSubmit={this.handleSubmit} className="register__form">
                <input 
                    className="register__input"
                    type="text"
                    placeholder='이름'
                    value={this.state.name}
                    onChange={this.handleChange}
                    name='name'
                />
                <input 
                   className="register__input"
                    type="text"
                    placeholder='별명'
                    value={this.state.nick}
                    onChange={this.handleChange}
                    name='nick'
                />
                <input 
                   className="register__input"
                    type="text"
                    placeholder='이메일'
                    value={this.state.email}
                    onChange={this.handleChange}
                    name='email'
                />
                <input 
                   className="register__input"

                    type="password"
                    placeholder='비밀번호'
                    value={this.state.passwd}
                    onChange={this.handleChange}
                    name='passwd'
                />
                <input 
                    className="register__input last"
                    id="asdf"
                    type="text"
                    placeholder='학교'
                    value={this.state.school}
                    onChange={this.handleChange}
                    name='school'
                />
                
                <button type='submit'>회원가입</button>
            </form>
        <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default Register;
