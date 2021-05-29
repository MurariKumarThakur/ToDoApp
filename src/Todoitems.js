import React from 'react'
import Paper from '@material-ui/core/Paper';
function Todoitems(props) {
    return (


      <div>
         <ol>

        {props.todos.map(todo=>(
       
         <li>
        <Paper style={{margin:'15px',textAlign:'left'}} elevation={3}> {todo} </Paper>
        </li>
))}
          
          </ol>
          </div>










      
      
      
    )
}

export default Todoitems
