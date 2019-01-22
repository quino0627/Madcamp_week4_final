import React, { Component } from "react";
import "./Food.css";
import { Card } from "antd";

class FoodElement extends Component {
  _renderMenus = () => {
    const mmmm = this.props.menus.map((menu, index) => {
      if (menu.description.includes("http")) {
        return <img className="menu__img" src={menu.description} alt="" />;
      } else {
        return <p>{menu.description}</p>;
      }
    });
    return mmmm;
  };
  render() {
    return (
      <div className="food__element">
        <Card title={this.props.name} bordered={false}>
          {this._renderMenus()}
        </Card>
      </div>
    );
  }
}

export default FoodElement;
