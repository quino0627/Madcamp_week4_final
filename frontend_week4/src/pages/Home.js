import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Card, Input, Carousel } from "antd";
import "../css/home.css";
//주소에 아무 path가 주어지지 않았을 때 기본적으로 보여주는 라우트

const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search;

class Home extends Component {
  render() {
    return (
      <Layout className="layout">
        <Content>
        <Carousel autoplay>
         <img className="img__school" src="https://i.ytimg.com/vi/FDF4SI-N6Fk/maxresdefault.jpg" alt=""/>
          <img className="img__school" src="https://www.kaist.ac.kr/Upl/_board/photo_kr/photo_kr_0_1406194841.jpg" alt=""/>
          <img className="img__school" src="http://ph.kyongbuk.co.kr/news/photo/201704/990880_268907_1851.jpg" alt=""/>
         <img className="img__school" src="https://csc.ibs.re.kr/img/csc_en/contents/lifein.jpg" alt=""/>
         <img className="img__school" src="https://www.gist.ac.kr/bbs/pds/editor/98dcf9e3062ad2763d11cdcdc19957c6.jpg" alt=""/>
  </Carousel>
        </Content>
        <Footer style={{ textAlign: "center" }}>STREET Madcamp_4</Footer>
      </Layout>
    );
  }
}

export default Home;
