import React from "react";
import {   
    Routes,
    Route 
  } from "react-router-dom";

import Cantantes from './cantantes';


function Index() {
    return(
        <div> 
            <Routes>

            <Route path='*' element={<Cantantes/>} />
            <Route path='/cantantes' element={<Cantantes/>} />

            </Routes>
        </div>
    )
}

export default Index;