import React from "react";

export default class ContactDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: "",
      phone: "",
    };
  }

  handleOnEdit = () => {
    if (!this.state.editMode) {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone,
      });
    } else {
      this.props.onEdit(this.state.name, this.state.phone);
    }
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  handleOnChange = (event) => {
    const contactObj = {};
    contactObj[event.target.name] = event.target.value;
    this.setState(contactObj);
  };

  handleEnter = (event) => {
    if (event.charCode === 13) {
      this.handleOnEdit();
    }
  };

  render() {
    const edit = (
      <div>
        <input
          name="name"
          placeholder="name"
          type="text"
          value={this.state.name}
          onChange={this.handleOnChange}
          onKeyPress={this.handleEnter}
        />
        <p></p>
        <input
          name="phone"
          placeholder="phone"
          type="text"
          value={this.state.phone}
          onChange={this.handleOnChange}
          onKeyPress={this.handleEnter}
        />
      </div>
    );
    const notEdit = (
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    );

    return (
      <div>
        <h1>Detail</h1>
        {this.state.editMode ? edit : notEdit}
        <button onClick={this.handleOnEdit}>
          {this.state.editMode ? "OK" : "Edit"}
        </button>
        <button onClick={this.props.onRemove}>Remove</button>
      </div>
    );
  }
}

ContactDetail.defaultProps = {
  contact: {
    name: "",
    phone: "",
  },
};
