import React from 'react';
import styled from 'styled-components';


const Header = () => {
    return (
        <HeaderStyle>
            <span>
                <img src="../imgs/logo.png"></img> 
                <LogoText>레디미 온에어</LogoText>   
            </span>
            <HeaderRight>
                <HeaderBtn>새 글 작성</HeaderBtn>
                <SearchInput/>
            </HeaderRight>
        </HeaderStyle>
    );
};
const HeaderStyle=styled.div`
    height: 100px;
    padding:30px 50px 30px 50px;
    
`
const LogoText=styled.span`
    width: 182px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #C4C4C4;
`
const HeaderRight=styled.span`
    float:right ;
`
const HeaderBtn=styled.button`
    width: 176px;
    height: 43px;
    background: #2152F4;
    border-radius: 25px;
    border-style: none;
    border-color:#fff;
    color:#fff ;
    margin-right:38px ;
    font-style: normal;
    font-size: 20px;
`
const SearchInput=styled.input`
    
`
const SearchIcon=styled.img`
    position:absolute ;
    src:"../imgs/search.png" ;
`
export default Header;