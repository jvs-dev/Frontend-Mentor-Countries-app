import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CountryArticle = styled.article`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 12px;
    background: var(--White);
    box-shadow: -0px 1px 20px 12px var(--shadow-color);
    width: 100%;
    max-width: 300px;
    overflow: hidden;    
`

const CountryFlag = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    @media only screen and (min-width: 950px) {
        width: 300px;
        height: 200px;
    }
`

const CountryDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    padding: 0px 20px 40px 20px;
`

const CountryName = styled.h1`
    margin: 30px 0px 12px 0px;
    font-size: 20px;
    font-weight: 800;
    color: var(--Grey-950-Light-Mode-Text);
`

const CountryData = styled.p`
    margin: 4px 0px;
    font-size: 16px;
    font-weight: 500;
    color: var(--Grey-950-Light-Mode-Text);
`

const CountryCard = (props) => {

    return (
        <Link to={`/country/${props.country.cca3}`} style={{ textDecoration: "none", color: "unset" }}>
            <CountryArticle>
                <CountryFlag src={props.country.flags.png} alt="" />
                <CountryDataContainer>
                    <CountryName>{props.country.name.common}</CountryName>
                    <CountryData><strong>Population: </strong>{props.country.population}</CountryData>
                    <CountryData><strong>Region: </strong>{props.country.region}</CountryData>
                    <CountryData><strong>Capital: </strong>{props.country.capital?.[0] || 'no capital'}</CountryData>
                </CountryDataContainer>
            </CountryArticle>
        </Link>
    )
}

export default CountryCard
