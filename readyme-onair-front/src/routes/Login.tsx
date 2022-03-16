import axios from 'axios';
import { read } from 'fs';
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

export const Login = () => {
   
    return (
        <div>
        <Container>
        <Notice>
            로그인 후 <br/> 이용 가능합니다.
        </Notice>
        <a href='http://localhost:8080/auth/login'>
        <LoginBtn>로그인하기</LoginBtn>     
        </a>
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