import React from "react";

export function Activity({activity, setActivity}) {

    
    return (

           <div>
        <label>Activity: </label>
        <select value={activity} onChange={(e) => {
             setActivity(e.target.value);}
            }>
            <option value="beach">Beach</option>
            <option value="beach">Family & friends</option>
            <option value="hiking">Hiking</option>
            <option value="skiing">Skiing</option>
            <option value="cultural">Cultural Tours</option>
        </select>
    </div>
    )
 
}