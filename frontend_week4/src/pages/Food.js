import React, { Component } from "react";
import axios from "axios";
import FoodElement from "../components/";
import { FoodColumn } from "../components/";
import { Modal, Button } from "antd";
import "../components/Food.css";
import moment from "moment";
const token = "gArHoycVk4OMqAfR8G2MNfCIIXBHmfsu61mEldQCKyCrh93WXy";

var d = new Date();
var ISOData = d.toISOString();
var ISODate = ISOData.split("T", 1);
ISODate = moment().format().split("T", 1)

class Food extends Component {
  state = { visible: false, schoolTitle: "KOREA" };

  showModal = strrr => {
    console.log("strrr is " + strrr);
    this.setState({
      visible: true,
      schoolTitle: strrr
    });
    console.log("ASDFASDF" + this.state.visible);
    this.setState({


      schoolTitle: strrr
    });
    console.log(this.state.schoolTitle);
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    console.log(ISODate)
    return (
      <div className="top__div">
        <div className="today__date">
          <h1>{ISODate} Menu</h1>
        </div>
        <div className="school__buttons">
          <Button
            className="school__button"
            onClick={() => this.showModal("DGIST")}
            title="DGIST"
          >
            <img
              className="sch__img"
              src="https://www.dgist.ac.kr/kr/img/sub01/his_top.png"
              alt=""
            />
          </Button>
          <Button
            className="school__button"
            onClick={() => this.showModal("KAIST")}
            title="KAIST"
          >
            <img
              className="sch__img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/KAIST_logo.svg/175px-KAIST_logo.svg.png"
              alt=""
            />
          </Button>
          <Button
            className="school__button"
            onClick={() => this.showModal("UNIST")}
            title="UNIST"
          >
            <img
              className="sch__img"
              src="http://kim2dir.unist.ac.kr/images/icons/UNIST.png"
              alt=""
            />
          </Button>
          <Button
            className="school__button"
            onClick={() => this.showModal("GIST")}
            title="GIST"
          >
            <img
              className="sch__img"
              src="http://soslab.co/wp-content/uploads/2017/01/GIST.png"
              alt=""
            />
          </Button>
          <Button
            className="school__button"
            onClick={() => this.showModal("POSTECH")}
            title="POSTECH"
          >
            <img
              className="sch__img"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/POSTECH_emblem.svg/150px-POSTECH_emblem.svg.png"
              alt=""
            />
          </Button>
        </div>
        <Modal
          title={this.state.schoolTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button type="primary" key="Ok" onClick={this.handleOk}>
              Ok
            </Button>
          ]}
        >
          <FoodColumn title={this.state.schoolTitle} />
        </Modal>
        {/* <div className="food__content">
          <FoodColumn title="DGIST" />
          <FoodColumn title="KAIST" />
          <FoodColumn title="UNIST" />
          <FoodColumn title="GIST" />
          <FoodColumn title="POSTECH" />
        </div> */}
      </div>
    );
  }
}

export default Food;
