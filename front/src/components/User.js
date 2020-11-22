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
    <div className="col">
      <p className="user-p">
        <h1>Welcome to PokéMongoDB!</h1> To get started, create an account and login
        from this page. Once you've created your account and logged in, you will be taken to
        the Team Page preloaded with a team of six. The Team Page in the navigation bar above will display your
        Pokémon as well as the sum of their types! If you would like to change
        a Pokémon in your team, click on Pokémon List above. From
        there, you can search for the Pokémon you would like in your team with
        the search form, or scroll until you find one you like. Choose the
        position you would like to place the Pokémon in your team and click
        the add Pokémon button to update your team! Finally, if there are
        Pokémon you would like to frequently move in and out of your team you
        can add them or remove them from your favorites section easily!
      </p>
      <h1>Enter Your Username</h1>
      <br/>
      <div id="userLogin">
        <form onSubmit={submit}>
          <label className="visuallyhidden">
            <input
              type="text"
              placeholder="Username"
              onChange={usernameChange}
              aria-label="Enter Username"
            />
            <button type="submit" value="Login">Login</button>
          </label>
        </form>
      </div>
      <div id="userCreate">
        <form action="/newUser" method="post" onSubmit={haveUser}>
          <label className="visuallyhidden">
            <input
              type="text"
              name="newUsername"
              placeholder="Username"
              onChange={usernameChange}
              aria-label="Create User"
            />
            <button type="submit" value="Create User">Create User</button>
          </label>
        </form>
      </div>
      <div id="userDelete">
        <form action="/deleteUser" method="post" onSubmit={deleteUser}>
          <label className="visuallyhidden">
            <input
              type="text"
              placeholder="Username"
              name="deletedUser"
              onChange={usernameChange}
              aria-label="Delete User"
            />
            <button className="delete" type="submit" value="Delete User">Delete User</button>
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
