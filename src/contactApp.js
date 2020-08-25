import React from "react";
import ContactInf from "./contactInf.js";
import ContactDetail from "./contactDetail.js";
import ContactCreate from "./contactCreate.js";
import update from "react-addons-update";

class ContactApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      key: -1,
      contact: [
        {
          name: "Yeong",
          phone: "010-1111-2222",
        },
        {
          name: "Cheon",
          phone: "010-3333-4444",
        },
        {
          name: "Seok",
          phone: "010-5555-6666",
        },
        {
          name: "Bak",
          phone: "010-7777-8888",
        },
      ],
    };
  }

  handleOnClick = (key) => {
    this.setState({
      key: key,
    });
  };

  handleContactInf = (contactData) => {
    contactData.sort((a, b) => {
      return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
    });
    contactData = contactData.filter((data) => {
      return (
        data.name.indexOf(this.state.value) > -1 ||
        data.name.toLowerCase().indexOf(this.state.value) > -1 ||
        data.name.toUpperCase().indexOf(this.state.value) > -1
      );
    });
    return contactData.map((inf, i) => {
      return (
        <ContactInf
          contact={inf}
          key={i}
          onClick={() => this.handleOnClick(i)}
        />
      );
    });
  };

  handleOnChange = (event) => {
    let value = event.target.value;
    this.setState({ value });
  };

  contactCreate = (contact) => {
    this.setState({
      contact: update(this.state.contact, {
        $push: [contact],
      }),
    });
  };

  contactRemove = () => {
    if (this.state.key < 0) {
      return;
    }
    this.setState({
      contact: update(this.state.contact, {
        $splice: [[this.state.key, 1]],
      }),
      key: -1,
    });
  };

  contactEdit = (name, phone) => {
    if (this.state.key === -1) {
      return;
    }
    this.setState({
      contact: update(this.state.contact, {
        [this.state.key]: {
          name: { $set: name },
          phone: { $set: phone },
        },
      }),
    });
  };

  render() {
    return (
      <div>
        <section>
          <h1>Contact</h1>
          <input
            name="search"
            placeholder="search"
            type="text"
            value={this.state.value}
            onChange={this.handleOnChange}
          />
          {this.handleContactInf(this.state.contact)}
        </section>
        <section>
          <ContactDetail
            onEdit={this.contactEdit}
            onRemove={this.contactRemove}
            contact={this.state.contact[this.state.key]}
          />
        </section>
        <section>
          <ContactCreate onCreate={this.contactCreate} />
        </section>
      </div>
    );
  }
}

export default ContactApp;
