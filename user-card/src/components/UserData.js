import React from "react";
import axios from "axios";
import User from "./User";
import Followers from "./Followers";

class UserData extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      user: [],
      followers: [],
      input: "slightflow",
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get(`https://api.github.com/users/${this.state.username}`),
        axios.get(
          `https://api.github.com/users/${this.state.username}/followers`
        ),
      ])
      .then(
        axios.spread((userRes, followerRes) => {
          this.setState({
            user: userRes.data,
            followers: followerRes.data,
          });
        })
      );
  }

  handleInput = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.username !== prevState.username) {
      axios
        .all([
          axios.get(`https://api.github.com/users/${this.state.username}`),
          axios.get(
            `https://api.github.com/users/${this.state.username}/followers`
          ),
        ])
        .then(
          axios.spread((userRes, followerRes) => {
            this.setState({
              user: userRes.data,
              followers: followerRes.data,
            });
          })
        );
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      username: this.state.input,
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
