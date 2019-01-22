import React, { Component } from "react";
import "./Post.css";
import LinesEllipsis from "react-lines-ellipsis";
import { Form } from "react-form";

class Post extends Component {
  /*
  constructor() {
    super();
    // Good Solution: Bind it in here!
    this.handleSubmit = this.handleSubmit.bind(this);
  }*/
  state = {
    title1: this.props.title,
    date1: this.props.date,
    content1: this.props.content
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onCreate(this.state);
    console.log("123");
  };
  render() {
    return (
      <div className="post" onSubmit={this.handleSubmit}>
        <form onSubmit={this.handleSubmit}>
          <div className="post__columns">
            <h1 className="post_title">{this.state.title1}</h1>
          </div>
          <div className="post__columns">{this.state.date1}</div>
          <div className="post__columns">{this.state.content1}</div>
        </form>
      </div>
    );
  }
}

export default Post;
