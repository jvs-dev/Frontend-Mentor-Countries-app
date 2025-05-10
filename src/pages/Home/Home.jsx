import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import styled from 'styled-components'
import CountryCard from '../../components/CountryCard'

const HomeSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
padding: 30px 20px;
`

const SearchLabel = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: var(--White);
    box-shadow: -2px 1px 16px 7px var(--shadow-color);
    padding: 14px 20px;
    border-radius: 4px;
    input {
        border: 0px;
        outline-width: 0px;
        width: 100%;
        font-size: 16px;
        background: transparent;
        color: var(--Grey-950-Light-Mode-Text);
        &::placeholder {
            color: var(--Grey-950-Light-Mode-Text);
            opacity: 0.6;
            font-weight: 500;
        }
    }
    ion-icon {
        color: var(--Grey-950-Light-Mode-Text);
        font-size: 20px;
        margin-right: 10px;
    }
`

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 50px 0px 0px 0px;
`

const Filter = styled.select`    
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: var(--White);
    box-shadow: -2px 1px 16px 7px var(--shadow-color);
    padding: 14px 40px 14px 20px;    
    border-radius: 4px;
    border: 0px;
    border-right: solid 20px var(--White);    
    outline-width: 0px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: var(--Grey-950-Light-Mode-Text);    
`

const AllCountriesDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;
    margin: 30px 0px 0px 0px;
`

const LoadMoreBtn = styled.button`
    background: var(--Blue900-Dark-Mode-Elements);
    padding: 5px 25px;
    border: 0px;
    outline-width: 0px;
    color: #fff;
`

const Home = () => {

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCount, setShowCount] = useState(8);
    const [filterCountries, setFilterCountries] = useState(null)
    const [regions, setRegions] = useState([])
    const [searchTo, setSearchTo] = useState("")

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const sorted = data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                const uniqueRegions = [...new Set(sorted.map(country => country.region).filter(Boolean))];

                setRegions(uniqueRegions);
                setCountries(sorted);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar os países:', error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Header />
            <HomeSection>
                <SearchLabel htmlFor="">
                    <ion-icon name="search"></ion-icon>
                    <input type="text" placeholder='Search for a country...' value={searchTo} onChange={(e) => setSearchTo(e.target.value)} />
                </SearchLabel>
                <FilterContainer>
                    <Filter name="country" id="country" defaultValue="" onChange={(e) => setFilterCountries(e.target.value == "" ? null : e.target.value)}>
                        <option value="" style={{ display: "none" }} disabled>
                            Filter by Region
                        </option>
                        <option value="">Todos</option>
                        {regions.map((re) => <option key={re} value={re}>{re}</option>)}
                    </Filter>
                </FilterContainer>
                <AllCountriesDiv>
                    {loading ? (
                        <p disabled>Carregando...</p>
                    ) : (
                        filterCountries == null ? (
                            searchTo == "" ? countries.map((country, index) => (index < showCount ? <CountryCard country={country} key={index} /> : null)) : countries.map((country, index) => `${country.name.common}`.toLowerCase().includes(searchTo.toLowerCase()) ? <CountryCard country={country} key={index} /> : null)
                        ) : (
                            countries.map((country, index) => (filterCountries == country.region ? <CountryCard country={country} key={index} /> : null))
                        )
                    )}
                    {!filterCountries && <LoadMoreBtn type='button' onClick={() => setShowCount(showCount + 8)}>Load More</LoadMoreBtn>}
                </AllCountriesDiv>
            </HomeSection>
        </>
    )
}

export default Home
