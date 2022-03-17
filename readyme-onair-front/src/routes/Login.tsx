import axios from 'axios';
import { read } from 'fs';
import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
const currentUser = localStorage.getItem('userId')
export const Login = () => {
    const [cookies, setCookie]=useCookies();
        if (cookies.user){
            localStorage.setItem("userId", cookies.user);
            console.log(currentUser);
        }
    const Login=()=>{
    window.location.href="http://localhost:8080/auth/login"
   }
   
    return (
        <div>
        <Container>
            {currentUser
            ?
            <>
         <Notice>
        로그인 <br/>되었습니다.
        </Notice>
        <Link to="/">
        <LoginBtn>홈으로 돌아가기</LoginBtn>
        </Link>
        
        </> 
        :<>
         <Notice>
        로그인 후 <br/> 이용 가능합니다.
        </Notice>
         <LoginBtn onClick={Login}>로그인하기</LoginBtn>
        </> 
        }
           
        </Container>
        </div>
    )
}
const Container = styled.div`
  background-color: #2152F4 ;
  width: 100%;
  padding: 50px 0px;
  text-align: center;
  min-height: 800px;
`;
const Notice=styled.div`
    color: white;
    font-size: 36px;
    margin-top: 50px;
    margin-bottom: 70px;
`
const LoginBtn=styled.button`
    height: 60px;
    font-size: 24px;
    padding: 12px 24px;
    background: #fff;
    color: black;
    border: 4px solid #000000;
    box-shadow: 4px 4px 0px #000000;
    border-radius: 12px;
`