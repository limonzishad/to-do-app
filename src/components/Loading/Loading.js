import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
    return (
        <div style={{ height: "50px" }} className="w-100 my-5 text-center fs-3">
            <Spinner animation="border" variant="primary"></Spinner>
            <p className="my-1 text-center">Loading...</p>
        </div>
    );
};

export default Loading;