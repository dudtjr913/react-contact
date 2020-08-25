import React from "react";

export default class ContactInf extends React.Component {
  render() {
    return <p onClick={this.props.onClick}>{this.props.contact.name}</p>;
  }
}
