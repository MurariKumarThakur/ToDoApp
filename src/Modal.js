import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button,TextField  } from '@material-ui/core';
import db from './firebase';
import { SettingsPowerRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
   
    justifyContent: 'center',
  },
  paper: {
    width:'40%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({open,set,todo}) {

 const [input, setInput] = useState(todo.todo);
 

  const updateTodo =(event)=>{
   //update the todo with
   
   db.collection('todos').doc(todo.id).set({
    
    todo:input

   },{merge:true})



   set(false);

  }

  const closetheWindow=()=>{
   set(false);
   setInput(todo.todo)
    
  }

  
  const classes = useStyles();




  if(!open) return null
 

  return (
    <div>
   
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
            <h2 id="transition-modal-title">Update Task</h2>
             <div >
            <TextField style={{width:'100%'}}  value={input} onChange={event=> setInput(event.target.value)} autoComplete="off" id="outlined-basic" label="Update Task" variant="outlined" />  
             <br /> <br/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
            <Button  disabled={!input}  variant="contained" color="primary" onClick={updateTodo}>Update TAsk  </Button> 
             {" "}
            <Button  variant="contained" onClick={closetheWindow}>Close Me</Button>
            </div>
            </div>
           

          </div>

          
        </Fade>
      
      </Modal>
    </div>
  );
}
