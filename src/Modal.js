import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, TextField } from "@material-ui/core";
import { db } from "./firebase";
import { SettingsInputAntenna } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",

    justifyContent: "center",
  },
  paper: {
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({
  openwin,
  models,
  user,
  todo,
  mytodos,
}) {
  const [mytext, SetMyText] = useState(todo);

  useEffect(() => {
    SetMyText(todo);
  }, [todo]);

  const updateToDo = () => {
    let record = [];
    let updateResult = [];
    const initialText = todo;
    const currentText = mytext;
    const docRef = db.collection("todos").doc(user?.uid);

    mytodos.map((rec) => {
      if (initialText == rec) {
        if (updateResult.length < 1) {
          updateResult.push(currentText);
        } else {
          record.push(rec);
        }
      } else {
        record.push(rec);
      }
    });

    docRef
      .update({
        todos: record.concat(updateResult),
      })
      .then(() => {
        models(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const closetheWindow = () => {
    models(false);
  };
  const updatingInputField = (event) => {
    SetMyText(event.target.value);
  };

  const classes = useStyles();

  if (!openwin) return null;

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openwin}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openwin}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Update Task</h2>
            <div>
              <TextField
                style={{ width: "100%" }}
                value={mytext}
                onChange={updatingInputField}
                autoComplete='off'
                id='outlined-basic'
                label='Please Update Task'
                variant='outlined'
              />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  disabled={!mytext}
                  variant='contained'
                  color='primary'
                  onClick={updateToDo}
                >
                  Update TAsk{" "}
                </Button>{" "}
                <Button variant='contained' onClick={closetheWindow}>
                  Close Me
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
