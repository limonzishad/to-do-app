import React from "react";
import useNotes from "../../hooks/useNotes";

const Note = ({ note }) => {
    const { _id, title, description } = note;
    const [notes, setNotes] = useNotes();

    const deleteItem = (id) => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `https://fathomless-tundra-60429.herokuapp.com/note/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    const remainingItems = notes.filter(note => note._id !== id);
                    setNotes(remainingItems);
                });
        }
    };

    return (
        <div>
            <div className="component-shadow custom-border">
                <div className="cards-container">
                    <h5 className="mt-4">{title}</h5>
                </div>
                <p className="item-text">Description: {description}</p>
                <div className="w-75 mx-auto"><button variant="primary" className="w-100 mx-auto mb-1 common-button custom-border" style={{ margin: '0', padding: '5px' }}>COMPLETE</button></div>
                <div className="w-75 mx-auto"><button onClick={() => { deleteItem(note._id) }} variant="danger" className="w-100 mx-auto mb-1 common-button custom-border" style={{ margin: '0', padding: '5px' }}>DELETE</button></div>
            </div >
        </div >
    );
};

export default Note;