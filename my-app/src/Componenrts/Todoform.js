import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import axios from "axios";
const Todoform = ({ settodos }) => {
  const [name, setname] = useState("");

  const handleChange = (e) => {
    setname(e.target.value);
  };

  const sendData = async () => {
    try {
      const res = await axios.post(`/api/todos/`, { name, completed: false });
      const newTodo = res.data;

      // Ensure 'completed' is defined and set it to false if not
      if (!('completed' in newTodo)) {
        newTodo.completed = false;
      }

      // Update the todos list by adding the new todo
      settodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-dark text-light">
      <Form className="w-25 p-5">
        <InputGroup className="mb-4" onChange={handleChange} value={name}>
          <FormControl placeholder="New Todo"></FormControl>
          <Button type="submit" onClick={sendData}>
            Add
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Todoform;
