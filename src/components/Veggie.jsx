import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    margin: 4rem 0 rem;
`

const Card = styled.div`
    min-height: 25rem;
    overflow: hidden;
    position: relative;
    border-radius: 2rem;
    img {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2rem;
    }
    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 1.5rem;
        transform: translate(-50%, 0%);
        color: #fff;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media screen and (max-width: 768px) {
        min-height: 12rem;
    }
`
const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

function Veggie() {
    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie();
    }, []);

    const getVeggie = async () => {

        const check = localStorage.getItem('veggie');

        if (check) {
            setVeggie(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
            const data = await api.json();

            localStorage.setItem('veggie', JSON.stringify(data.recipes));

            setVeggie(data.recipes);
            console.log(data.recipes);
        }
    }
    return (
        <div>
            <Wrapper>
                <h3>Our Vegetarian Picks</h3>
                <Splide
                    options={{
                        perPage: 3,
                        arrows: false,
                        pagination: false,
                        drag: 'free',
                        gap: "5rem",
                        breakpoints: {
                            1280: {
                                perPage: 3,
                                gap: "1rem",
                            },
                            768: {
                                perPage: 2,
                                gap: "1rem",
                            },
                        }
                    }
                    }
                >
                    {veggie.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/' + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient />
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

export default Veggie