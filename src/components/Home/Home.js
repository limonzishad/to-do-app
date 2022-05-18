import React from "react";
import './Home.css';
import Note from '../Note/Note';
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import useNotes from '../../hooks/useNotes';
import auth from "../../firebase.init";

const Home = () => {
    const [notes, setNotes] = useNotes();

    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        const url = `https://fathomless-tundra-60429.herokuapp.com/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
    };

    return (
        <div>
            {/* add new note */}
            <div className="w-75 mx-auto">
                <h2 className="mt-5 custom-title">ADD NEW NOTE</h2>
                <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                    <input className="p-2 my-2 custom-border" {...register("addedBy")} value={user.email} hidden />
                    <input className="p-2 my-2 custom-border" {...register("name", { required: true })} placeholder="Title" />
                    <textarea className="p-2 my-2 custom-border" {...register("description", { required: true })} placeholder="Description" />
                    <input className="w-50 mx-auto common-button custom-border" type="submit" value="SUBMIT" />
                </form>
            </div>

            {/* all notes */}
            <div>
                <h2 className="custom-title">ALL NOTES</h2>
                <div className="mt-3 item-container">
                    {
                        notes.map(note => <Note key={note._id} note={note}></Note>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;