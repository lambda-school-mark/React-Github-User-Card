import React from "react";
import axios from "axios";
import User from "./User";
import Followers from "./Followers";

class UserData extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      followers: [],
      updatedUser: [],
      input: "slightflow",
    };
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/${this.input}`).then((res) => {
      console.log(res);
      this.setState({
        user: res.data,
      });
    });

    axios
      .get(`https://api.github.com/users/${this.input}/followers`)
      .then((res) => {
        console.log(res);
        this.setState({
          followers: res.data,
        });
      });
  }

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.state.input}`)
      .then((res) => {
        this.setState({
          user: res.data,
        });
      });
    axios
      .get(`https://api.github.com/users/${this.state.input}/followers`)
      .then((res) => {
        this.setState({
          followers: res.data,
        });
      });
  }

  handleInput = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.input}`)
      .then((res) => {
        this.setState({
          user: res.data,
        });
      });
    axios
      .get(`https://api.github.com/users/${this.state.input}/followers`)
      .then((res) => {
        this.setState({
          followers: res.data,
        });
      });
  };

  render() {
    return (
      <div>
        <form className="formContainer">
          <input
            className="searchInput"
            type="text"
            value={this.input}
            onChange={this.handleInput}
            placeholder="Search..."
          />
          <button className="searchButton" onClick={this.handleSubmit}>
            Search
          </button>
        </form>
        <div>
          <User user={this.state.user} />
          <h4>Followers:</h4>
          {this.state.followers.map((follower) => (
            <Followers key={follower.id} follower={follower} />
          ))}
        </div>
      </div>
    );
  }
}

export default UserData;
