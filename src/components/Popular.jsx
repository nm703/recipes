import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Popular() {

    const [popular, setPopular] = useState([]);

    //zove fju cim se pokrene strana, only run it when the component gets mounted
    useEffect(() => {
        getPopular();
    }, []);

   

    // async because we're waiting for the data
    const getPopular = async () => {

        const check = localStorage.getItem("popular");
       

        if(check){
            // getting the data back, prebaci iz string-a opet u array item
            setPopular(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
            );
            const data = await api.json();
            

            // making an array of data into a string and saving it that way
            localStorage.setItem("popular", JSON.stringify(data.recipes));

            setPopular(data.recipes);
        }

    };

    return (
        <div>
                    <Wrapper>
                        <h3>Popular Picks</h3>

                        <Splide options={{
                            perPage: 4,
                            arrows:false,
                            pagination:false,
                            drag:'free',
                            gap:"4rem",
                        }}>
                            {popular.map((recipe) => {
                                return (
                                    <SplideSlide key={recipe.id}>
                                        <Card>
                                            <Link to ={"/recipe/" + recipe.id}>
                                            <p>{recipe.title}</p>
                                            <img src={recipe.image} alt={recipe.title} />
                                            <Gradient/>
                                            </Link>
                                        </Card>
                                    </SplideSlide>
                                );
                            })}
                        </Splide>
                    </Wrapper>
                
        </div>
    )
}

const Wrapper = styled.div`
margin: 4rem 0rem;
`;

const Card = styled.div`
min-height:25rem;
border-radius: 2rem;
overflow:hidden;
position:relative;

img {
    border-radius:2rem;
    position:absolute;
    left: 0;
    width:100%;
    height:100%;
    object-fit:cover;


}

p{
   position:absolute;
   z-index:10;
   left:50%;
   bottom:0%;
   color:white;
   width:100%;
   transform:translate(-50%, 0%);
   text-align:center;
   font-size:1rem;
   display:flex;
   jusitfy-content: center;
   font-weight:600;
   align-items:center;


}

`;

const Gradient = styled.div`
z-index:3;
position:absolute;
width:100%;
height:100%;
background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Popular
