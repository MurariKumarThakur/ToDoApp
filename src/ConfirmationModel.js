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
  
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ConfirmationMdoel({Delete,setDel,todo}) {

 const [input, setInput] = useState(todo.todo);
 
 const delteTheRecord=(event)=>{ debugger;
    console.log(todo);
     db.collection('todos').doc(todo.id).delete();
     setDel(false);
 }

  const closetheWindow=()=>{
   setDel(false);
  
    
  }

  
  const classes = useStyles();




  if(!Delete) return null
 

  return (
    <div>
   
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={Delete}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Delete}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Confirmation Box</h2>
           
              <p>Are you Sure , You Want to Remove The Task ?</p>
             <br /> <br/>
           <div style={{display:'flex' ,justifyContent:'space-evenly'}}>
            <Button onClick={delteTheRecord}  variant="contained" color="secondary" >Yes </Button> 
             {" "}
            <Button  variant="contained" onClick={closetheWindow}>No</Button>
            </div>
           
           

          </div>

          
        </Fade>
      
      </Modal>
    </div>
  );
}
