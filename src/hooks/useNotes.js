import { useEffect, useState } from "react";

const useNotes = () => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        fetch('https://fathomless-tundra-60429.herokuapp.com/')
            .then(response => response.json())
            .then(data => setNotes(data));
    }, []);
    return [notes, setNotes];
}

export default useNotes;