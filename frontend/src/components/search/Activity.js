import React from "react";
import { FaHiking } from 'react-icons/fa';

export function Activity({ activity, setActivity }) {


    return (

        <div className="flex-1 relative">
            <label chtmlFor="travel-date" className="sr-only">Activity</label>
            <select
                id="activity"
                className="mt-1 block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                aria-label="Select activity"
            >
                <option value="beach">Beach</option>
                <option value="family">Family & Friends</option>
                <option value="hiking">Hiking</option>
                <option value="skiing">Skiing</option>
                <option value="cultural">Cultural Tours</option>
            </select>
        </div>
    )

}