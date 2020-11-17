import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles/User.css";

function User(props) {
  const [username, setUsername] = useState("");

  function usernameChange(evt) {
    setUsername(evt.target.value);
  }

  function submit(event) {
    const users = props.player;
    let len = users.length;
    for (let x = 0; x < len; x++) {
      console.log("checking user");
      if (users[x].name === username) {
        event.preventDefault();
        props.handleChange(username);
        sessionStorage.setItem("username", username);
        return;
      }
    }
    alert(
      "Error: no user with that name. Try logging in again or create a new account."
    );
  }

  function haveUser(event) {
    const users = props.player;
    let len = users.length;
    for (let x = 0; x < len; x++) {
      console.log("checking user");
      if (users[x].name.length < 1) {
        alert("Error: please enter valid username.");
        return;
      }
      if (users[x].name === username) {
        alert("Error: user already exists.");
        return;
      }
    }
  }

  function deleteUser(event) {
    const users = props.player;
    let len = users.length;
    for (let x = 0; x < len; x++) {
      console.log("checking user");
      if (users[x].name === username) {
        return;
      }
    }
    alert("Error: user does not exist.");
  }

  return (
    <div>
      <div>
        <p>
          Welcome to PokeMongoDB! To get started, create an account and login
          from this page. Once you've created your account and logged in, you will be taken to
          the Team Page preloaded with a team of six. The Team Page in the navigation bar above will display your
          Pokemon as well as the sum of their types! If you would like to change
          a Pokemon in your team, click on Pokemon List above. From
          there, you can search for the Pokemon you would like in your team with
          the search form, or scroll until you find one you like. Choose the
          position you would like to place the Pokemon in your team and click
          the add Pokemon button to update your team! Finally, if there are
          Pokemon you would like to frequently move in and out of your team you
          can add them or remove them from your favorites section to do so easily!
        </p>
      </div>
      <br />
      <div>
        <form onSubmit={submit}>
          <label className="visuallyhidden">
            <input
              type="text"
              placeholder="Username"
              onChange={usernameChange}
              aria-label="Enter Username"
            />
            <input type="submit" value="Login" />
          </label>
        </form>
      </div>
      <br />
      <div>
        <form action="/newUser" method="post" onSubmit={haveUser}>
          <label className="visuallyhidden">
            <input
              type="text"
              name="newUsername"
              placeholder="Username"
              onChange={usernameChange}
              aria-label="Create User"
            />
            <input type="submit" value="Create User" />
          </label>
        </form>
      </div>
      <br/>
      <div>
        <form action="/deleteUser" method="post" onSubmit={deleteUser}>
          <label className="visuallyhidden">
            <input
              type="text"
              placeholder="Username"
              name="deletedUser"
              onChange={usernameChange}
              aria-label="Delete User"
            />
            <input type="submit" value="Delete User" />
          </label>
        </form>
      </div>
    </div>
  );
}

User.propTypes = {
  player: PropTypes.array,
};

export default User;
