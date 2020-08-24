import React from "react";

export default class Contact extends React.Component {
  render() {
    return <div onClick={this.props.onClick}>{this.props.contact.name}</div>;
  }
}
