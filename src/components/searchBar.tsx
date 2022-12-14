import React from "react";
import { useState, useEffect } from "react";
import {Container, TextField, Autocomplete, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import NutritientList from './advancedSearchElements';
import DisplayFood from "./displayFood";
import axios from "axios";
import swal from 'sweetalert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



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
    const [advancedSearchElements, setAdvancedSearchElements] = useState<foodItems[]>([]);
    const [foodItems, setFoodItems] = useState<foodItems[]>([]);
    const getFoodNames = (search: string) => {
        axios.get('https://api.javiermansilla.com/foodData/search',{headers: {'Access-Control-Allow-Origin': '*', }})
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
            axios.get('https://api.javiermansilla.com/foodData/search?name=' + searchValue,{headers: {'Access-Control-Allow-Origin': '*', }})
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
    function advancedClick(){
        setAdvancedSearch(!adanvacedSearch);
        console.log(searchValue);
        setSearchValue('');
        
    }
    if (foodDescriptions.length == 0) {
        return( 
        <Box sx={{ margin: 2 }}>
            <CircularProgress />
        </Box>)
    }    
    else {
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
                        {adanvacedSearch &&  
                         <Autocomplete
                         disablePortal
                         id="combo-box-demo"
                         options={foodDescriptions}
                         sx={{ width: 300 }}
                         renderInput={searchValue => <TextField {...searchValue} label="Search Food" />}
                         onSelect={(event) => setSearchValue((event.target as HTMLInputElement).value)}
                         />
                        }
                    </Container>
                </Grid>
                <Grid 
                    item xs={12}
                    alignItems="right"
                    paddingTop={2}
                >
                    <Button onClick={() => advancedClick() }>Advanced Search</Button>
                    {adanvacedSearch &&  <Button variant="contained" onClick={() => doSearch(searchValue)}>Search</Button>}
                    {!adanvacedSearch &&  <Button variant="contained" onClick={() => doAvancedSearch('')}>Advanced Search</Button>}
                
                    
                </Grid>
                <Grid
                    hidden = {adanvacedSearch}
                >
                </Grid>
                <Grid>
                    <DisplayFood items={foodItems} />
                </Grid>
            </Grid>
            
            
            
        )
        }
    };

export default SearchBar;

