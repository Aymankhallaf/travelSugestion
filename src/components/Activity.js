import React, { useState } from "react";

export function Activity() {

    const [activity, setActivity] = useState("beach");
    
    return (

           <div>
        <label>Activity: </label>
        <select value={activity} onChange={(e) => { setActivity(e.target.value); console.log(e.target.value)}
            }>
            <option value="beach">Beach</option>
            <option value="beach">Family</option>
            <option value="hiking">Hiking</option>
            <option value="skiing">Skiing</option>
            <option value="cultural">Cultural Tours</option>
        </select>
    </div>
    )
 
}