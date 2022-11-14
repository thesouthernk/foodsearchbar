import React from "react";
import {useState, useEffect} from "react";
import BasicTable from './itemFoodTable';

interface foodItems {
    items: Array<object>;
}

const DisplayFood = ( foodItems: foodItems ) => {
    if (foodItems.items.length > 0){
        return(
            <div>
                <BasicTable rows={foodItems.items}/>
            </div>
        );
    }
    else{
        return(
            <div>
            </div>
        );
    }
};

export default DisplayFood;

