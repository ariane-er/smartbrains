import React from "react";
import "./faceRecognition.css"



const FaceRecognition = ({ imageUrl, boxes }) => {

    return (
        <div className="center ma">
            <div className="absolute mt2">
            <img id="inputImage" alt="" src={imageUrl} width="500px" height="auto"/>
            
            {Object.values(boxes).map(box => {
                
                return (
                    <div className="bounding-box" style={{top: box.topRow,
                                                                             bottom: box.bottomRow,
                                                                             left: box.leftCol,
                                                                             right: box.rightCol
                                 }}></div>
                )
            })}            
            </div>
        </div>
    );
}

export default FaceRecognition;