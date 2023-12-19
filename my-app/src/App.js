import React, { useState ,useEffect} from 'react';
import './App.css';
import Navbar from './Componenrts/Navbar'
import Listgroup from './Componenrts/Listgroup';
import Todoform from './Componenrts/Todoform';
import axios from "axios";
function App() {
  const [todos, settodos] = useState([])
  useEffect(()=>{
    axios.get("/api/todos/")
    .then((res)=>{
      settodos(res.data)
    }).catch(()=>{
      alert("something went wrong");
    })
  },[])
  return (
    
    <div className=''>
    <Navbar/>
    <Todoform settodos={settodos}/>
    <Listgroup todos={todos} settodos={settodos}/>
    </div>
  );
}

export default App;
