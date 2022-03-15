import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Header = () => {
    return (
        <HeaderStyle>
            <Link to="/">
            <HeaderLeft>
                    <LogoImg src="../imgs/logo.png"></LogoImg> 
                    <LogoText>레디미 온에어</LogoText>   
                </HeaderLeft>
            </Link>
               
            <HeaderRight>
               <Link to="/write">
               <HeaderBtn>새 글 작성</HeaderBtn>
               </Link>
                
            
            </HeaderRight>
        </HeaderStyle>
    );
};
const HeaderStyle=styled.div`
    height: 100px;
    padding:30px 50px 30px 50px;
    
`
const HeaderLeft=styled.div`
    float: left;
    display: flex;
    margin-top: 10px;
`
const LogoImg=styled.img`
    
`
const LogoText=styled.div`
    width: 182px;
    height: 100%;
    font-family: Roboto;
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 28px;
    margin-top: 15px;
    color: #C4C4C4;
`
const HeaderRight=styled.span`
    float:right ;
    margin-top: 40px;
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
export default Header;