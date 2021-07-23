import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, TextField } from "@material-ui/core";
import { db } from "./firebase";
import { SettingsPowerRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",

    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ConfirmationMdoel({
  open,
  setDel,
  todo,
  mytodos,
  user,
}) {
  const deleteMyTodo = () => {
    let delTodo = [];
    let actualTodo = [];
    let delteOption = todo;
    const docref = db.collection("todos").doc(user?.uid);
    console.log(mytodos);
    mytodos.map((result) => {
      if (result == delteOption) {
        if (delTodo < 1) {
          delTodo.push(result);
        } else {
          actualTodo.push(result);
        }
      } else {
        actualTodo.push(result);
      }
    });

    docref
      .update({
        todos: actualTodo,
      })
      .then(() => {
        setDel(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const closetheWindow = () => {
    setDel(false);
  };

  const classes = useStyles();

  if (!open) return null;

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Confirmation Box</h2>
            <p>Are you Sure , You Want to Remove The Task ?</p>
            <br /> <br />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                onClick={deleteMyTodo}
                variant='contained'
                color='secondary'
              >
                Yes{" "}
              </Button>{" "}
              <Button variant='contained' onClick={closetheWindow}>
                No
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
