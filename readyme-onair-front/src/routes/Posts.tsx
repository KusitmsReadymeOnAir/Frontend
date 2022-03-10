import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Header from '../Components/Header';
import styled from 'styled-components';
import internal from 'stream';
import Design from './Categories/Design';
import All from './Categories/All';
import Devlop from './Categories/Develop';
import PD from './Categories/PD';
import TeamBuild from './Categories/TeamBuild';
import Daily from './Categories/Daily';

// 게시글 리스트 페이지
const Posts = () => {
  //검색->카테고리
  const [designClick, setDesignClick]=useState<boolean>(false);
  const [developClick, setDevelopClick]=useState<boolean>(false);
  const [pdClick, setPdClick]=useState<boolean>(false);
  const [teambuildClick, setTeambuildClick]=useState<boolean>(false);
  const [dailyClick, setDailyClick]=useState<boolean>(false);

  const [category, setCategory]=useState<string>("");
  const categoryPost=()=>{
    switch(category){
      case "":
        return (<All></All>);
      case "design":
        return(<Design></Design>);
      case "develop":
        return (<Devlop/>)
      case "pd":
        return (<PD/>)
      case "teambuild":
        return (<TeamBuild/>)
      case "daily":
        return (<Daily/>)
    }
  }
  
  
  useEffect(()=>{
   ;
  },[])
  return (
    <>
    <Container>
     <input>
     </input>
      <Category>
        <CategoryBtn isClick={designClick} onClick={()=>category==="design"? (setCategory("") , setDesignClick(false)):(setCategory("design"),setDesignClick(true))}>디자인</CategoryBtn>
        <CategoryBtn isClick={developClick} onClick={()=>category==="develop"? (setCategory(""), setDevelopClick(false)):(setCategory("develop"),setDevelopClick(true))}>개발</CategoryBtn>
        <CategoryBtn isClick={pdClick} onClick={()=>category==="pd"? (setCategory(""), setPdClick(false)):(setCategory("pd"), setPdClick(true))}>기획</CategoryBtn>
        <CategoryBtn isClick={teambuildClick} onClick={()=>category==="teambuild"? (setCategory(""), setTeambuildClick(false)):(setCategory("teambuild"),setTeambuildClick(true))}>프로젝트 모집</CategoryBtn>
        <CategoryBtn isClick={dailyClick} onClick={()=>category==="daily"? (setCategory(""), setDailyClick(false)):(setCategory("daily"), setDailyClick(true))}>일상</CategoryBtn>
      </Category>
      {categoryPost()}
    </Container>
    </>
  ); 
};
const Container=styled.div`
  background-color:#2152F4 ;
  text-align: center;
 
`
const Category=styled.div`
  text-align: center;
  padding-top:30px ;
`
type isClick={
  isClick:boolean;
};
const CategoryBtn=styled.button<isClick>`
  height: 60px;
  font-size: 24px;
  padding: 12px 24px;
  background: #fff;
  color: ${props=>props.isClick ?'#366EFF' : 'black'};
  border: 4px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  border-radius: 12px;
  margin-left:50px ;
`


export default Posts;
