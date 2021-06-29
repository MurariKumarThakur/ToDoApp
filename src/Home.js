import React,{useState,useEffect,Component} from 'react';

import {Button,TextField,Checkbox} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Todoitems from './Todoitems';

import firebase from 'firebase';
import './Home.css'
import {useHistory} from 'react-router-dom'
import {db,auth} from './firebase'



const Home = ({user}) => {
 

 
 
    
    const [mytodos,setTodos]=useState([]);
    const [input,setInput]=useState('');
    const [loading,setLoading]=useState(true);
  
  
    
    useEffect(() => {
    

         
           if(user){
           
             const ref = db.collection('todos').doc(user?.uid);
             ref.onSnapshot(snap=>{
              if(snap.exists){
                 console.log(snap.data().todos);
                 setTodos(snap.data().todos)
                  
               }else{
                setTodos([])
               }
           })
         
           }
        
    }, [user])



    const addToDo =(event)=>{
    event.preventDefault();
   const docRef= db.collection('todos').doc(user?.uid)
     if(mytodos.length>0){
      docRef.set({
        todos:[...mytodos,input]
        
      })
     }else{
      docRef.set({
        todos:[input]
      })
     }
    


     
      setInput("");
   
    
    }
  
   const onInputChange=(event)=>{
   const inputvalue = event.target.value
   
  
    setInput(inputvalue)
  }



  
    return (


    
     
    <div className='container'>
    
    <form  style={{margin:"20px", textAlign:"center"}}>
    {/* <input onChange={onInputChange} value={input} type="text"   /> */}

    <TextField  style={{width:'40%'}} autoComplete="off" id="outlined-basic" label="Please Create New Task ..." variant="outlined"  onChange={onInputChange} value={input} type="text"      />
    {/* <button type='submit' onClick={addToDo} disabled={dis} >Create to do disabled </button> */}

    <Button style={{  margin: "10px"}} variant="contained"  type='submit' onClick={addToDo} disabled={!input} color="primary" >Create Task</Button>


    </form>
    <div  className='record'>
  
   
    <ol>
    
    
     
     {mytodos.length > 0  ? mytodos.map(todo=>(
       
     
     
        <li className='recordList' >
        
        <Todoitems mytodos={mytodos} todo={todo} user={user} />

        </li>

       
   
     )) : <Alert severity="error">Currently you don't have any task </Alert> }
    
    </ol>
  
     
    </div>
    </div>
      
    
    )
  
   
}

export default Home
