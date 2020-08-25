import React from "react";

export default class ContactCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
    };
  }

  handleOnChange = (event) => {
    const contactObj = {};
    contactObj[event.target.name] = event.target.value;
    this.setState(contactObj);
  };

  handleClick = () => {
    const contact = {
      name: this.state.name,
      phone: this.state.phone,
    };
    this.props.onCreate(contact);
    this.setState({
      name: "",
      phone: "",
    });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Create</h1>
          <input
            name="name"
            placeholder="write name"
            type="text"
            value={this.state.name}
            onChange={this.handleOnChange}
          />
          <input
            name="phone"
            placeholder="write phone-number"
            type="text"
            value={this.state.phone}
            onChange={this.handleOnChange}
          />
        </div>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}

ContactCreate.defaultProps = {
  onCreate: () => {
    console.error("not create");
  },
};
