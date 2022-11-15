import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NutrientsCheckList from "./advancedSearch";

interface StateProperties {
    label: Array<string>;
    
  }
  

const NutritientList = () => {
    
    const [nutrientNames, setNutrientNames] = React.useState<StateProperties[]>([]);
    const [checked, setChecked] = React.useState([0]);
    const getNutrientsList = () => {
        axios.get('https://api.javiermansilla.com/foodData/nutrients',{headers: {'Access-Control-Allow-Origin': '*', }})
            .then((response) => {
                const newDict = [];

                //console.log(response.data.items.length);
                for (let i = 0; i < response.data.items.length; i++) {
                    newDict.push({'label':response.data.items[i], 'id':i});
                }   
                setNutrientNames(newDict);
            })
    }
    useEffect(() => {
        getNutrientsList();
    }
    , []);
    //console.log(nutrientNames);
    return(
        <div>
            <p>nutrient list</p>
            <NutrientsCheckList labels={nutrientNames} />
        </div>
    );
};

export default NutritientList;
        
