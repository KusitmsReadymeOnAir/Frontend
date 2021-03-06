import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../config';
const currentUser = localStorage.getItem('userId');
let prePath="";
const Header = () => {
    
    let location = useLocation();
    const [user, setUser]=useState<any[]>([{}]);
    const id=localStorage.getItem("userId");
    useEffect(()=>{
       
        console.log(location)
       if (prePath.indexOf('/login')!==-1){
           console.log("refresh")
           window.location.reload();
       }
        
        prePath=location.pathname;    
    },[location])

    useEffect(()=>{
       
        if(currentUser){
            axios.get(`${API_URL}/mypage/user/${id}`)
            .then((res)=>{
            setUser(res.data.userData);});
    }
    
    },[user])
   
    return (
        <HeaderStyle>
            <Link to="/">
            <HeaderLeft>
                    <LogoImg src="../imgs/logo.png"></LogoImg> 
                    <LogoText>레디미 온에어</LogoText>   
                </HeaderLeft>
            </Link>
            {
                currentUser
                ?
                <HeaderRight>
                    <Link to="/write">
                    <HeaderBtn>새 글 작성</HeaderBtn>
                    </Link>
                    <Link to="/mypage"  style={{ textDecoration: "none", color:"black"}}>
                    <User>
                    <UserImg src="../imgs/readyme_img.png"></UserImg>
                    <UserName>{user[0].name}</UserName>
                    </User> 
                    </Link>
                </HeaderRight>
                :
                <div></div>
            }
            
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
    margin-top: 10px;
    display: flex;
    align-items: center;
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
    margin-top: 20px;
`
const User=styled.div`
    display: flex;
    flex-direction: column;
`
const UserImg=styled.img`
    margin-bottom: 10px;
    width: 80px;
`
const UserName=styled.div`
    text-align: center;
`
export default Header;