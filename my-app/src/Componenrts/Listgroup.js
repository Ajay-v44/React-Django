import axios from "axios";
import React, { useState, useCallback } from "react";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Listgroup = ({ todos = [], settodos }) => {
  const [show, setshow] = useState(false);
  const [record, setrecord] = useState(null);

  const handleClose = useCallback(() => {
    setshow(false);
  }, []);

  const handleEdit = useCallback((t) => {
    setrecord(t);
    setshow(true);
  }, []);

  const handleUpdate = useCallback(
    async (id, value) => {
      try {
        const res = await axios.patch(`/api/todos/${id}/`, value);
        const updatedTodo = res.data;
        settodos((prevTodos) =>
          prevTodos.map((t) => (t.id === id ? updatedTodo : t))
        );
        handleClose();
      } catch (error) {
        console.error("Error updating todo:", error);
        alert("Something went wrong");
      }
    },
    [settodos, handleClose]
  );

  const handleChange = useCallback((e) => {
    setrecord((prevRecord) => ({
      ...prevRecord,
      name: e.target.value,
    }));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`/api/todos/${id}/`)
      .then(() => {
        const newTodos = todos.filter((t) => {
          return t.id !== id;
        });
        settodos(newTodos);
      })
      .catch(() => {
        alert("something went wrong");
      });
  };
  const completedtodos = todos.filter((t) => t.completed == true);
  const incompletedtodos = todos.filter((t) => t.completed == false);
  return (
    <div>
      <ul className="list-group m-5 p-5">
        <li className="list-group-item active" aria-current="true">
          Completed Tasks({completedtodos.length})
          <button type="button " className="btn btn-primary">
            <i className="bi bi-check2-circle"></i>
          </button>
        </li>
        {completedtodos.map((t) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={t.id}
          >
            <span>1</span> {t.name}
            <button
              type="button"
              onClick={() => handleEdit(t)}
              className="
            btn btn-success"
            >
              <i className="bi bi-vector-pen"></i>
            </button>
            {t.completed === true ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleUpdate(t.id, { completed: !t.completed })}
              >
                <i className="bi bi-star-fill"></i>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdate(t.id, { completed: !t.completed })}
              >
                <i className="bi bi-check2-circle"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDelete(t.id);
              }}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </li>
        ))}
      </ul>

      <ul className="list-group m-5 p-5">
        <li className="list-group-item active" aria-current="true">
          To be completed ({incompletedtodos.length})
          <button type="button " className="btn btn-primary">
            <i className="bi bi-check2-circle"></i>
          </button>
        </li>
        {incompletedtodos.map((t) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={t.id}
          >
            <span>1</span> {t.name}
            <button
              type="button"
              onClick={() => handleEdit(t)}
              className="
            btn btn-success"
            >
              <i className="bi bi-vector-pen"></i>
            </button>
            {t.completed === true ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleUpdate(t.id, { completed: !t.completed })}
              >
                <i className="bi bi-star-fill"></i>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdate(t.id, { completed: !t.completed })}
              >
                <i className="bi bi-check2-circle"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDelete(t.id);
              }}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </li>
        ))}
      </ul>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            value={record ? record.name : ""}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUpdate(record.id, { name: record.name })}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Listgroup;
