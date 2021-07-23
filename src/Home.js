import React, { useState, useEffect, Component } from "react";

import { Button, TextField, Checkbox } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Todoitems from "./Todoitems";

import firebase from "firebase";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { db, auth } from "./firebase";

const Home = ({ user }) => {
  const [mytodos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const ref = db.collection("todos").doc(user?.uid);
      ref.onSnapshot((snap) => {
        if (snap.exists) {
          console.log(snap.data().todos);
          setTodos(snap.data().todos);
        } else {
          setTodos([]);
        }
      });
    }
  }, [user]);

  const addToDo = (event) => {
    event.preventDefault();
    const docRef = db.collection("todos").doc(user?.uid);
    if (mytodos.length > 0) {
      docRef.set({
        todos: [...mytodos, input],
      });
    } else {
      docRef.set({
        todos: [input],
      });
    }

    setInput("");
  };

  const onInputChange = (event) => {
    const inputvalue = event.target.value;

    setInput(inputvalue);
  };

  return (
    <div className='container'>
      <form style={{ margin: "20px", textAlign: "center" }}>
        <div className='takContainer'>
          <input
            placeholder='Create new task'
            value={input}
            type='text'
            autoComplete='off'
            onChange={onInputChange}
          />
          <button type='submit' onClick={addToDo} disabled={!input}>
            Create New Task
          </button>
        </div>
      </form>
      <div className='record'>
        <ol className='order_list'>
          {mytodos.length > 0 ? (
            mytodos.map((todo) => (
              <li className='recordList'>
                <Todoitems mytodos={mytodos} todo={todo} user={user} />
              </li>
            ))
          ) : (
            <Alert severity='error'>Currently you don't have any task </Alert>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Home;
