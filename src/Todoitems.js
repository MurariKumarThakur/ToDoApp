import React, { useState } from "react";

import { Button, Checkbox } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TransitionsModal from "./Modal";
import ConfirmationMdoel from "./ConfirmationModel";
import "./Todoitems.css";
function Todoitems(props) {
  console.log("props is-->", props);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [backColor, setBackColor] = useState("");
  const [isDeleted, SetIsDeleted] = useState(false);
  const [border, setBorder] = useState("");

  const delteRecord = () => {
    SetIsDeleted(true);
  };
  const updateTask = () => {
    setIsOpen(true);
  };

  const checking = (event) => {
    if (isChecked) {
      setIsChecked(false);
      setBackColor("");
      setBorder("");
    } else {
      setIsChecked(true);
      setBackColor("rgb(15 208 181)");
      setBorder("1px solid");
    }
  };

  return (
    <>
      <div
        className='listContainer'
        style={{ background: backColor, border: border }}
      >
        {/* <Checkbox className='checkbox' style={{zIndex: '0 !important'}}
        checked={isChecked}
        onClick={checking}  />
       */}
        <div className='list_part1'>
          <input
            className='checkbox'
            type='checkbox'
            checked={isChecked}
            onClick={checking}
          />
          <span title={props.todo} style={{ fontSize: "12px", margin: "10px" }}>
            {props.todo}{" "}
          </span>
        </div>
        <div className='action'>
          <EditIcon onClick={updateTask} color='primary' className='edit' />
          <DeleteIcon
            onClick={delteRecord}
            color='secondary'
            className='delete'
          />
        </div>

        {/* <button onClick={updateTask}  style={{zIndex: '1 !important'}}

        >Edit Task </button> 


         <button style={{marginLeft:'5px'}} onClick={delteRecord}  style={{zIndex: '1 !important'}}
          > Delete Task </button> */}
      </div>

      <ConfirmationMdoel
        open={isDeleted}
        setDel={SetIsDeleted}
        user={props.user}
        todo={props.todo}
        mytodos={props.mytodos}
      />
      <TransitionsModal
        openwin={isOpen}
        models={setIsOpen}
        user={props.user}
        todo={props.todo}
        mytodos={props.mytodos}
      />
    </>
  );
}

export default Todoitems;
