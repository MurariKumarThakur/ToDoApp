import React,{useState} from 'react'
import Paper from '@material-ui/core/Paper';
import { Button,Checkbox } from '@material-ui/core';
import "./App.css"
import db from './firebase';
import TransitionsModal from './Modal'
import ConfirmationMdoel from './ConfirmationModel'
function Todoitems(props) {
 
  const [input,setInput]=useState('');
  const [isOpen, setIsOpen] = useState(false)
  const [isChecked,setIsChecked] =useState(false);
  const [backColor,setBackColor] =useState('');
  const [isDeleted,SetIsDeleted]=useState(false)
 const delteRecord =(event)=>{
  
  SetIsDeleted(true);
   
  

 }
 const updateTask=(event)=>{ 

  setIsOpen(true);
 }

 

 const handleChange=(event)=>{ 
   if(isChecked){
     setIsChecked(false)
     setBackColor("")
   }else{
     setIsChecked(true)
     setBackColor("#09f109")

   }
   
 }

    return (
     
    
      <div>
      
        
        <Paper style={{margin:'15px',textAlign:'left', background:backColor }} elevation={3}     >
        {/* <DeleteForeverIcon onClick={delteRecord} /> */}

        
        <Checkbox
            checked={isChecked}
           
            onChange={handleChange}
            name="checkedB"
            color="primary"
           
          />
        <Button onClick={updateTask} variant="contained"

          color="primary">Edit Task </Button> {" "}
         <Button onClick={delteRecord} variant="contained"
          color="secondary"> Delete Task </Button>
          <span style={{fontSize:'20px'}} >   {props.todo.todo} </span>
         
         
        
       
        
      
        </Paper>
        <ConfirmationMdoel Delete={isDeleted} setDel={SetIsDeleted}   todo={props.todo}/>
        <TransitionsModal  open={isOpen} set={setIsOpen}  todo={props.todo} />
         

          </div>










      
      
      
    )
}

export default Todoitems
