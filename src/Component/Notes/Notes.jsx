import React, { useContext, useEffect, useState } from "react";
import style from "./Notes.module.css"
import { useFormik } from "formik";
import { userContext } from "../../Context/UserContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Note from "../Note/Note";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  let navigate = useNavigate();

  // strat modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // end modal




  let { addNotes,getAllNotes } = useContext(userContext);

  async function addUserNote(values) {
    let { data } = await addNotes(values);
    if (data.msg === "done") {
      handleClose();
      getAllNotes()
      

    }
  }




  let formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    }, onSubmit: addUserNote
  })

  function logOut() {
    localStorage.removeItem("token");
    navigate('/signin')
  }
  function signUp() {
    navigate('/')
  
  }








  return <>
    {/* start modal */}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input onChange={formik.handleChange} value={formik.values.title} type="text" className="form-control" placeholder="Title" name="title" />
          <input onChange={formik.handleChange} value={formik.values.content} type="text" className="form-control mt-3 " placeholder="content" name="content" />
        </form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          Add Note
        </Button>
      </Modal.Footer>
    </Modal>
    {/* end modal */}







    <div className="row w-100   ">

      <div className="col-md-2 Notes vh-100 py-5 px-4">
        <h3 className="mb-5">Notes<i className="fa-regular fa-note-sticky mx-3 fs-3 text-warning"></i></h3>
        <h2 onClick={signUp} className="h6 mb-4 cursor-pointer">Rigester<i className="fa-solid fa-user text-white mx-4"></i></h2>
        <h2 onClick={logOut} className="h6 cursor-pointer ">Log Out<i className="fa-solid fa-right-to-bracket text-white mx-3"></i></h2>
      </div>

      <div className="col-md-10 p-5">

        <div className="d-flex justify-content-end">
          <button onClick={handleShow} className="btn btn-primary"><i className="fa-solid fa-plus"></i>Add Notes</button>
        </div>

        <div className="w-100 border-bottom mt-3 flex  ">
          <h2 className="text-muted">My Notes</h2>
        </div>
        <Note />

      </div>
    </div>


  </>
}
