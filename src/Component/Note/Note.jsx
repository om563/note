import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/UserContext";
import style from "./Note.module.css"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";

export default function Note() {
    const [noteId, setNoteId] = useState(null);
    
    // strat modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id,title,content) => {
        console.log(title,content);
        formik.values.title=title;
        formik.values.content=content;
        setNoteId(id);
        return setShow(true);
    } 
    // end modal


    let { getAllNotes, deleteNote,updateNote ,allNotes } = useContext(userContext);
 
  

    async function deleteUserNote(id) {
        let { data } = await deleteNote(id);
        getAllNotes();

    }

    async function updateNoteNow(values) {
       let {data} =  await updateNote(values,noteId);
        console.log(data);
       if(data.msg=="done"){
        handleClose()
        getAllNotes();
       }
        
      }
    
    let formik = useFormik({
        initialValues: {
          title: "",
          content: ""
        }, onSubmit:updateNoteNow
      })

      
    
      






    return <>
        {/* start modal */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>update Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form >
                    <input onChange={formik.handleChange}   value={formik.values.title}  type="text"  className="form-control" placeholder="Title" name="title" />
                    <input onChange={formik.handleChange} value={formik.values.content} type="text" className="form-control mt-3 " placeholder="content" name="content" />
                </form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={formik.handleSubmit} variant="primary">
                    update Note
                </Button>
            </Modal.Footer>
        </Modal>
        {/* end modal */}

        <div className="row mt-5 gy-5">
            {allNotes?.map((note) =>

                <div key={note._id} className={`col-md-4`}>
                    <div className={`${style.card} d-flex justify-content-center align-items-center flex-column border border-dark-subtle shadow shadow-lg `}>
                        <h4>{note.title}</h4>
                        <h4 className={style.teal}>{note.content}</h4>

                        <div className="d-flex justify-content-between  w-25 mt-2">
                            <i  onClick={()=>handleShow(note._id,note.title,note.content)}  className="fa-solid fa-pen-to-square text-primary cursor-pointer"></i>
                            <i onClick={() => deleteUserNote(note._id)} className="fa-solid fa-trash text-danger cursor-pointer " ></i>
                        </div>
                    </div>

                </div>
            )}


        </div>

    </>
}
