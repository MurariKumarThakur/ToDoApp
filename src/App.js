import React,{useState,useEffect} from 'react';
import './App.css';
import {Button,TextField} from '@material-ui/core';
import Todoitems from './Todoitems';
import db from './firebase'
import firebase from 'firebase';
function App() {

  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState('');
  
 // when the loads , we need to listen to the database and fetch new todos
 // as they get added removed

 useEffect(()=>{
   db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
    // console.log(snapshot.docs.map(doc=>doc.data().todo));
      setTodos(snapshot.docs.map(doc=>doc.data().todo))
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
    <div className="App">
     <h3 style={{background:'#EDF6B1'}}>My Task Tracker !!!! </h3>
     <form >
     {/* <input onChange={onInputChange} value={input} type="text"   /> */}

     <TextField id="outlined-basic" label="Please Enter Task" variant="outlined"  onChange={onInputChange} value={input} type="text"      />
     {/* <button type='submit' onClick={addToDo} disabled={dis} >Create to do disabled </button> */}

     <Button style={{  margin: "10px"}} variant="contained"  type='submit' onClick={addToDo} disabled={!input} color="primary" >Create Task</Button>


     </form>
    
     <Todoitems todos={todos}/>

    </div>
  );
}

export default App;
