import React from "react";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: "",
      phone: "",
    };
  }

  handleToggle = () => {
    if (!this.state.isEdit) {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone,
      });
    } else {
      this.handleonEdit();
    }
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  handleOnChange = (event) => {
    const contactObj = {};
    contactObj[event.target.name] = event.target.value;
    this.setState(contactObj);
  };

  handleonEdit = () => {
    this.props.onEdit(this.state.name, this.state.phone);
  };

  render() {
    const editDetails = (
      <div>
        <p>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleOnChange}
          />
        </p>
        <input
          name="phone"
          type="text"
          value={this.state.phone}
          onChange={this.handleOnChange}
        />
      </div>
    );

    const details = (
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    );

    const view = this.state.isEdit ? editDetails : details;

    const blank = <div>Not Selected</div>;
    return (
      <div>
        <h1>Detail</h1>
        {this.props.isSelected ? view : blank}
        <div>
          <button onClick={this.handleToggle}>
            {this.state.isEdit ? "OK" : "Edit"}
          </button>
          <button onClick={this.props.onRemove}>Remove</button>
        </div>
      </div>
    );
  }
}

Detail.defaultProps = {
  contact: {
    name: "",
    phone: "",
  },
  onRemove: () => {
    console.error("not Removed");
  },
};
