import React,{useState,useEffect} from 'react';
import './App.css';
import {Button,TextField} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import Todoitems from './Todoitems';
import db from './firebase'
import firebase from 'firebase';
import NavBar from './NavBar'
function App() {

  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState('');
  
 // when the loads , we need to listen to the database and fetch new todos
 // as they get added removed

 useEffect(()=>{
   db.collection('todos').orderBy('timestamp','desc').onSnapshot(snap=>{

    
    // console.log(snapshot.docs.map(doc=>doc.data().todo));
      setTodos(snap.docs.map(doc=>({id:doc.id,todo:doc.data().todo})))

   })
   
 },[]);


  const addToDo =(event)=>{
    event.preventDefault();
    db.collection('todos').add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })

    
      setInput('')
    
    }
  
   const onInputChange=(event)=>{
   const inputvalue = event.target.value
   
  
    setInput(inputvalue)
  }


  return (
    <div className="App" >

      <NavBar/>

     


    
     <form  style={{margin:"20px"}}>
     {/* <input onChange={onInputChange} value={input} type="text"   /> */}

     <TextField  style={{width:'40%'}} autoComplete="off" id="outlined-basic" label="Please Create New Task ..." variant="outlined"  onChange={onInputChange} value={input} type="text"      />
     {/* <button type='submit' onClick={addToDo} disabled={dis} >Create to do disabled </button> */}

     <Button style={{  margin: "10px"}} variant="contained"  type='submit' onClick={addToDo} disabled={!input} color="primary" >Create Task</Button>


     </form>
     <div  className='record'>
     <ol>
     

      {todos.length ? todos.map(todo=>(
        
      
         <li key={todo.id}>
         <Todoitems  todo={todo} />

         </li>

        
    
      )) : <Alert severity="error">Currently you don't have any task </Alert> }
     
     </ol>
     
     </div>
     
    </div>
  );
}

export default App;
