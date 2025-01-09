import React, { useState } from 'react';
import { TemperatureSearch } from './Temperature';
import { Activity } from './Activity';

export function Search() {  


    return (
        <div>
            <label>Search: </label>
            <TemperatureSearch />
            <Activity />
        </div>
    );
}