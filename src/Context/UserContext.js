import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {

    let token = localStorage.getItem("token");

    let headers = {
        token
    }

    function signUp(values) {
        return axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
            .then((res) => res)
            .catch((err) => err)
    }

    function signIn(values) {
        return axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
            .then((res) => res)
            .catch((err) => err)
    }

    function addNotes(values) {
        return axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
            headers
        })
            .then((res) => res)
            .catch((err) => err)
    }

    function getUserNotes() {
        return axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
            headers
        })
            .then((res) => res)
            .catch((err) => err)
    }

    async function getAllNotes() {
        let { data } = await getUserNotes();
        setAllNotes(data?.notes)
    }
    
    useEffect(() => {
        getAllNotes();
    }, []);
    const [allNotes, setAllNotes] = useState(null);




    function deleteNote(id) {
        return axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
            headers
        })
            .then((res) => res)
            .catch((err) => err)
    }


    function updateNote(values, id) {
        return axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, values, {
            headers
        })
            .then((res) => res)
            .catch((err) => err)
    }



    return <userContext.Provider value={{ signUp, signIn, addNotes, getUserNotes, deleteNote, updateNote,getAllNotes,allNotes }}>
        {props.children}
    </userContext.Provider>

}