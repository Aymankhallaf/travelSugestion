import React from "react";

export function Activity({ activity, setActivity }) {


    return (

        <div className='flex-1 block overflow-hidden bg-white border-gray-200 rounded-lg	px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
            <label className="">Activity: </label>
            <select
                className='mt-1 w-full border-none p-0'
                value={activity} onChange={(e) => {
                    setActivity(e.target.value);
                }
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