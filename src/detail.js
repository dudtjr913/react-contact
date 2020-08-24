import React from "react";

export default class Detail extends React.Component {
  render() {
    const details = (
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    );
    const blank = <div>Not Selected</div>;
    return (
      <div>
        <h1>Detail</h1>
        {this.props.isSelected ? details : blank}
      </div>
    );
  }
}

Detail.defaultProps = {
  contact: {
    name: "",
    phone: "",
  },
};
