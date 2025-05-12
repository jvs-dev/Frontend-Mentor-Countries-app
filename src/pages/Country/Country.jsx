import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const CountrySection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 30px;
    width: 100%;
    @media only screen and (min-width: 950px) {
      padding: 30px 48px 50px 48px;
    }
`

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: var(--White);
  box-shadow: -2px 1px 16px 7px var(--shadow-color);
  padding: 14px 30px;    
  gap: 12px;
  border-radius: 4px;
  border: 0px;    
  outline-width: 0px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: var(--Grey-950-Light-Mode-Text);    
  margin: 16px 0px 0px 0px;
`

const FlagImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  @media only screen and (min-width: 950px) {
    padding-right: 20px;
  }
`
const DataCointainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 40px;
  width: 100%;
  @media only screen and (min-width: 950px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: flex-start;
    justify-content: flex-start;    
    gap: 48px;
  }
`

const CointainerDesktop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
`

const CountryName = styled.h1`
    margin: 42px 0px 0px 0px;
    font-size: 26px;
    font-weight: 800;
    color: var(--Grey-950-Light-Mode-Text);
    @media only screen and (min-width: 950px) {
      margin: 30px 0px 0px 0px;
    }
`

const DataList = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 18px 0px;
  @media only screen and (min-width: 950px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 8px 0px;
  }
  li {
    font-size: 16px;
    color: var(--Grey-950-Light-Mode-Text);
  }
`

const CountryBorderh2 = styled.h2`
    margin: 28px 0px 0px 0px;
    padding: 0px 0px 40px 0px;
    font-size: 22px;
    font-weight: 700;
    color: var(--Grey-950-Light-Mode-Text);
    @media only screen and (min-width: 950px) {
      font-size: 16px;
      padding: 0px 0px 10px 0px;
    }
`

const BorderContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: flex-start;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 12px;
  color: var(--Grey-950-Light-Mode-Text);
  a {
    text-align: center;
    background: var(--White);
    box-shadow: -2px 1px 16px 0px var(--shadow-color);
    width: 100%;
    padding: 6px 0px;    
    gap: 12px;
    border-radius: 4px;
    border: 0px;    
    outline-width: 0px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: var(--Grey-400-Light-Mode-Input);
    text-decoration: none;
    margin: 0px;  
  }
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  @media only screen and (min-width: 950px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: flex-start;
    justify-content: flex-start;    
    gap: 12px;
  }
`

const Country = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then(response => response.json())
      .then(data => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os países:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Header />
      <CountrySection>
        <Link to={`/`} style={{ textDecoration: "none", color: "unset" }}>
          <BackBtn><ion-icon name="return-up-back-outline"></ion-icon> Back</BackBtn>
        </Link>
        {loading ? (
          <p style={{color: "var(--Grey-950-Light-Mode-Text)"}} disabled>Carregando...</p>
        ) : (
          <DataCointainer>
            <FlagImg src={country.flags.png} alt={country.flags.alt} />
            <CointainerDesktop>
              <CountryName>{country.name.common}</CountryName>
              <ListContainer>
                <DataList>
                  <li><strong>Native Name:</strong>{' '}{country.name.official}</li>
                  <li><strong>Population:</strong>{' '}{country.population}</li>
                  <li><strong>Region:</strong>{' '}{country.region}</li>
                  <li><strong>Sub Region:</strong>{' '}{country.subregion}</li>
                  <li><strong>Capital:</strong>{' '}{country.capital?.[0] || 'no capital'}</li>
                </DataList>
                <DataList>
                  <li><strong>Top Level Domain:</strong>{' '}{country.tld[0]}</li>
                  <li><strong>Currencies:</strong>{' '} {country.currencies
                    ? Object.values(country.currencies)
                      .map(coin => `${coin.name} (${coin.symbol})`)
                      .join(', ')
                    : 'No more informations'}</li>
                  <li><strong>Languages:</strong>{' '}{country.languages
                    ? Object.values(country.languages)
                      .map(lang => `${lang}`).join(', ')
                    : 'No more informations'}</li>
                </DataList>
              </ListContainer>
              <CountryBorderh2>Border Countries:</CountryBorderh2>
              <BorderContainer>
                {country.borders ? country.borders.map((border) => <Link key={border} to={`/country/${border}`}>{border}</Link>) : "No borders"}
              </BorderContainer>
            </CointainerDesktop>
          </DataCointainer>
        )}
      </CountrySection>
    </>
  )
}

export default Country
