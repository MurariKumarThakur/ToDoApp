import React,{useState} from 'react'

import { Button ,Checkbox} from '@material-ui/core';


import TransitionsModal from './Modal'
import ConfirmationMdoel from './ConfirmationModel'
import './Todoitems.css'
function Todoitems(props) {
  console.log('props is-->',props);
  const [isOpen, setIsOpen] = useState(false)
  const [isChecked,setIsChecked] =useState(false);
  const [backColor,setBackColor] =useState('');
  const [isDeleted,SetIsDeleted]=useState(false)
   

 const delteRecord =()=>{

  SetIsDeleted(true);
  
  

 }
 const updateTask=()=>{ 

  setIsOpen(true);


 }

 

 const checking=(event)=>{ 
   
   if(isChecked){
     setIsChecked(false)
     setBackColor("")
   }else{
     setIsChecked(true)
     setBackColor("rgb(15 208 181)")

   }
   
 }

    return (
     
     <>
      
        <div className="listContainer" style={{background:backColor}}>

        <Checkbox className='checkbox'
        checked={isChecked}
        onClick={checking}   style={{zIndex: '0 !important'}}/>
      
     
     
        <Button onClick={updateTask} variant="contained"

          color="primary">Edit Task </Button> 


         <Button style={{marginLeft:'5px'}} onClick={delteRecord} variant="contained"
          color="secondary"> Delete Task </Button>


          <span title={props.todo} style={{fontSize:'20px',margin:'10px'}}
          >       {props.todo} </span>

        </div>
       
         
      
       

        <ConfirmationMdoel open={isDeleted} setDel={SetIsDeleted} user={props.user}  todo={props.todo} mytodos={props.mytodos}/>
        <TransitionsModal  openwin={isOpen} models={setIsOpen} user={props.user}  todo={props.todo} mytodos={props.mytodos}  />
        </>
    )
}

export default Todoitems
