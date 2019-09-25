import React, { useState, useEffect } from "react";
import Sampler from "./sampler";
import Tone from "tone";

export default function App() {


    return (
        <React.Fragment>
            <div id="body-wrapper">
                <div className="sampler-container">
                    <Sampler />
                </div>


            </div>
        </React.Fragment>
    );
}
