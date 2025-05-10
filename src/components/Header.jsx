import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const HeaderStyled = styled.header`
    background: var(--White);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 35px 20px;
    width: 100%;
    box-shadow: 0px 1px 2px 2px var(--shadow-color);    
`

const Title = styled.h1`
    font-size: 16px;
    font-weight: 900;
    color: var(--Grey-950-Light-Mode-Text);
    margin: 0px;
`

const ThemeToggler = styled.button`
    background: transparent;
    color: var(--Grey-950-Light-Mode-Text);
    font-size: 16px;
    font-weight: 600;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ion-icon {
        margin-right: 6px;
        font-size: 20px;
    }
`

const Header = () => {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        if (dark != false) {
            document.querySelector("body").classList.add("active")
        } else {
            document.querySelector("body").classList.remove("active")
        }
    }, [dark])
    return (
        <HeaderStyled>
            <Title>Where in the world?</Title>
            <ThemeToggler type="button" onClick={() => setDark(!dark)}>{dark ? <ion-icon name="sunny"></ion-icon> : <ion-icon name="moon-outline"></ion-icon>}{dark ? "Light" : "Dark"} Mode</ThemeToggler>
        </HeaderStyled>
    )
}

export default Header
