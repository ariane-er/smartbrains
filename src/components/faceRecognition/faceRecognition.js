import React from "react";

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className="center">
            <img alt="bein recognised" src={imageUrl}/>
        </div>
    );
}

export default FaceRecognition;