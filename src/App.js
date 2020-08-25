import React from "react";
import Contact from "./contact.js";
import Detail from "./detail.js";
import ContactCreate from "./contactCreate.js";
import update from "react-addons-update";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      selectedKey: -1,
      contact: [
        { name: "Yeong", phone: "010-9000-0000" },
        { name: "Bak", phone: "010-1111-2222" },
        { name: "Kim", phone: "010-3333-4444" },
        { name: "Cheon", phone: "010-5555-6666" },
      ],
    };
  }

  handleInput = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  contactClick = (key) => {
    this.setState({
      selectedKey: key,
    });
  };

  contactCreate = (contact) => {
    this.setState({
      contact: update(this.state.contact, {
        $push: [contact],
      }),
    });
  };

  contactRemove = () => {
    if (this.state.selectedKey >= 0) {
      this.setState({
        contact: update(this.state.contact, {
          $splice: [[this.state.selectedKey, 1]],
        }),
        selectedKey: -1,
      });
    }
  };

  contactEdit = (name, phone) => {
    this.setState({
      contact: update(this.state.contact, {
        [this.state.selectedKey]: {
          name: { $set: name },
          phone: { $set: phone },
        },
      }),
    });
  };

  render() {
    const contactData = (data) => {
      data.sort((a, b) => {
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      });
      data = data.filter((inf) => {
        return (
          inf.name.toLowerCase().indexOf(this.state.keyword) > -1 ||
          inf.name.indexOf(this.state.keyword) > -1
        );
      });
      return data.map((inf, i) => {
        return (
          <Contact
            onClick={() => this.contactClick(i)} //
            contact={inf}
            key={i}
          />
        );
      });
    };
    return (
      <div>
        <section>
          <h1>Contact</h1>
          <input
            type="text"
            placeholder="Search"
            value={this.state.keyword}
            onChange={this.handleInput}
          />
          {contactData(this.state.contact)}
        </section>
        <section>
          <Detail
            isSelected={this.state.selectedKey !== -1}
            contact={this.state.contact[this.state.selectedKey]}
            onRemove={this.contactRemove}
            onEdit={this.contactEdit}
          />
        </section>
        <section>
          <ContactCreate onCreate={this.contactCreate} />
        </section>
      </div>
    );
  }
}

export default App;
