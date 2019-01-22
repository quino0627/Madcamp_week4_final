import React, { Component } from "react";
import "./Food.css";
import FoodElement from "./FoodElement";
import moment from "moment";
import axios from "axios";

var d = new Date();
var ISOData = d.toISOString();
var ISODate = ISOData.split("T", 1);

let config = {
  headers: {
    AccessToken: "gArHoycVk4OMqAfR8G2MNfCIIXBHmfsu61mEldQCKyCrh93WXy"
  }
};

const axiosInstance = axios.create({
  baseURL: ""
});

let schoolId = "tqbAESBISp"; //default : korea univ

class FoodColumn extends Component {
  state = {};

  componentDidMount() {
    this._getPosts(this.props.title);
  }
  componentWillReceiveProps(nextProps) {
    // this.props 는 아직 바뀌지 않은 상태
    console.log("nextProp is ", nextProps);
    this._getPosts(nextProps.title);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   this._getPosts();
  // }

  _classifySchool = aaa => {
    console.log("classifySCHOOL" + aaa);
    switch (aaa) {
      case "KAIST":
        schoolId = "JEnfpqCUuR";
        break;
      case "DGIST":
        schoolId = "08mFeMHwku";
        break;
      case "UNIST":
        schoolId = "WMjo37L5TL";
        break;
      case "GIST":
        schoolId = "xOM42OofYz";
        break;
      case "POSTECH":
        schoolId = "3hXYy5crHG";
        break;
      default:
        schoolId = "tqbAESBISp";
        break;
    }
    this.setState({
      schoolId
    });
    return schoolId;
  };

  _renderPosts = () => {
    console.log(this.state.posts);
    const posts = this.state.posts.map((post, index) => {
      return <FoodElement name={post.name} menus={post.menus} />;
    });
    return posts;
  };

  _getPosts = async aaa => {
    const posts = await this._callApi(aaa);

    this.setState({
      posts
    });
  };

  _callApi = aaa => {
    let qq = this._classifySchool(aaa);

    // for (let i = 0; i < 23; i++) {
    //   listData.push({
    //     title: `ant design part ${i}`,
    //     date: "20181111",
    //     content:
    //       "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
    //   });
    // }

    // return fetch("http://143.248.140.106:680/api/notice")
    //   .then(potato => {
    //     console.log(potato.json());
    //     return potato.json();
    //   })
    //   .then(json => {
    //     console.log(json);
    //     console.log(json.data);
    //     return json.data;
    //   }) //화살표 표시는 리턴작성할필요없음 모던js라서 자동임
    //  .catch(err => console.log(err));
    return axiosInstance
      .get(
        "https://bablabs.com/openapi/v1/campuses/" +
          schoolId +
          "/stores?date=" +
          ISODate,
        config
      )
      .then(function(response) {
        console.log(schoolId);
        return response.data.stores;
      });
  };

  render() {
    // this._getPosts();
    const { posts } = this.state;

    return (
      <div className="food__column">
        {posts ? this._renderPosts() : "loading"}
      </div>
    );
  }
}

export default FoodColumn;
