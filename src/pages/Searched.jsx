import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Searched() {


  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();


  const getSearched = async (name) =>{
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&query=${name}`);
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(()=>{

    getSearched(params.search);
    // ovo search je zapravo naziv koji sam zadala u url u route delu, tj url 
    // parametar se tako zove

  }, [params.search]);



  return (
    <Grid>
      {searchedRecipes.map((item)=>{
        return (
          <Card key = {item.id}>
            <img src={item.image} alt={item.title}/>
            <h4>{item.title}</h4>
          </Card>
        );
      })}
    </Grid>
  )
}

const Grid = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap:2rem;

`
const Card = styled.div`

img{
  widht:100%;
  border-radius:2rem;
}

a{
  text-decoration:none;
}
h4{
  text-align:center;
  padding:1rem;
}

`

export default Searched
