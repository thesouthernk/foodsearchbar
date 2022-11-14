import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {Container, TextField, Autocomplete, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import NutritientList from './advancedSearchElements';
import DisplayFood from "./displayFood";
import axios from "axios";
import { display } from "@mui/system";
import swal from 'sweetalert';




interface StateProperties {
    label: Array<string>;
  }

interface foodItems {
    items: Array<object>;
}
  

const SearchBar = () => {
    
    const [foodDescriptions, setFoodDescriptions] = useState<StateProperties[]>([]);
    const [adanvacedSearch, setAdvancedSearch] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [foodItems, setFoodItems] = useState<foodItems[]>([]);
    const getFoodNames = (search: string) => {
        axios.get('http://157.230.82.73/foodData/search')
            .then((response) => {
                const newDict = [];
                for (let i = 0; i < response.data.items.length; i++) {
                    newDict.push({'label':response.data.items[i].description});
                }
                setFoodDescriptions(newDict);
            })
        // }
    }
    const doSearch = (searchValue: string) => {
        if (searchValue === ''){
            swal({
                title: "Error!",
                text: "You must enter a search value",
                icon: "error"
            });
        }
        else{
            axios.get('http://157.230.82.73/foodData/search?name=' + searchValue)
            .then((response) => {
                if (response.data.items.length > 0){
                    setFoodItems(response.data.items);
                }
                else{
                    setFoodItems(response.data.items);
                    swal({
                        title: "We couldn't find some food items",
                        text: "Could you try with other search value?",
                        icon: "info"
                    });
                }
            }).catch((error) => {
                swal({
                    title: "Error!",
                    text: "No results found",
                    icon: "error"
                });
            })
        }
    }
    useEffect(() => {
        getFoodNames('');
    }, []);
    const doAvancedSearch =  (searchValue: any) => {
        swal({
            title: "Cooming soon",
            text: "This feature is not available yet",
            icon: "info"
        });
            
    }
    
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '10vh', minWidth: '10vw' }}
            hidden={adanvacedSearch}
            >
            <Grid 
                item xs={12}
            >
                <Container maxWidth="sm">
                    <h1>Search Bar</h1>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={foodDescriptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="cheese" />}
                        onSelect={(event) => setSearchValue((event.target as HTMLInputElement).value)}
                        />
                </Container>
            </Grid>
            <Grid 
                item xs={12}
                alignItems="right"
                paddingTop={2}
            >
                <Button onClick={() => setAdvancedSearch(!adanvacedSearch) }>Advanced Search</Button>
                {adanvacedSearch &&  <Button variant="contained" onClick={() => doSearch(searchValue)}>Search</Button>}
                {!adanvacedSearch &&  <Button variant="contained" onClick={() => doAvancedSearch('')}>Advanced Search</Button>}
               
                
            </Grid>
            <Grid
                hidden = {adanvacedSearch}
            >
                <NutritientList />
            </Grid>
            <Grid>
                <DisplayFood items={foodItems} />
            </Grid>
        </Grid>
        
        
        
    )
    };

export default SearchBar;

