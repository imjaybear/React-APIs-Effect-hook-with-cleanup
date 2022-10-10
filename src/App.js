import React, { useEffect, useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/todos?userId=3"
  const abortController = new AbortController()
  
   useEffect(() => {
     async function loadData() {
       try{
       const response  =  await fetch(url, {signal: abortController.signal})
       const dataFromAPI = await response.json()
       setToDos(dataFromAPI)
       } catch(err){
         if (error.name === "AbortError"){
           console.log("Aborted", toDos)
         } else{
           throw err
         }
       }
     }
     loadData()
   return () => abortController.abort()
   }, [])

  // Load data from https://jsonplaceholder.typicode.com/todos?userId=3

  return (
    <div className="App">
      <h1>To Do List</h1>
      <ul className="todo-list">
        {toDos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "",
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
