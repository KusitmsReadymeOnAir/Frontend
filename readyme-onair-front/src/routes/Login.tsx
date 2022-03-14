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
        <GoogleLogin
            clientId="998580338911-ku2cplpoidtk01jb82k5sb133dsl70pv.apps.googleusercontent.com"
            buttonText='구글로 로그인하기'
            onSuccess={(res)=>console.log(res)}
            onFailure={(err)=>console.log(err)}
           >    
            </GoogleLogin> 
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