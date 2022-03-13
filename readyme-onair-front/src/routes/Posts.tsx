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
import axios from 'axios';

// 게시글 리스트 페이지

//서버 연동 테스트
const Posts = () => {
  useEffect(()=>{
    axios.get("/board/list")
    .then(()=>console.log("success"));
  },[])

  
  const [designClick, setDesignClick]=useState<boolean>(false);
  const [developClick, setDevelopClick]=useState<boolean>(false);
  const [pdClick, setPdClick]=useState<boolean>(false);
  const [teambuildClick, setTeambuildClick]=useState<boolean>(false);
  const [dailyClick, setDailyClick]=useState<boolean>(false);

  //각 버튼들 클릭 유무를 배열로 관리해서 하나 클릭하면 그 전에 클릭했던거 색 없어지도록 하기
  //[디자인, 개발, 기획, 프로젝트모집, 일상]
  const [click, setClick]=useState<boolean[]>([false, false, false, false, false])

  const [category, setCategory]=useState<string>("");
  const categoryPost=()=>{
    switch(category){
      case "":
        return (<All searchText={searchText} searchOption={searchOption}></All>);
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
  const [searchText, setSearchText]=useState<string>("");
  const [searchOption, setSearchOption]=useState<string>("");
  
  
  return (
    <>
    <Container>
      
      <Category>
        <CategoryBtn isClick={click[0]} onClick={
          ()=>category==="design"
          ? (setCategory("") , setClick([false, false,false, false, false]))
          : (setCategory("design"),setClick([true, false,false, false, false]))
        }>
          디자인
        </CategoryBtn>
        <CategoryBtn isClick={click[1]} onClick={
          ()=>category==="develop"
          ? (setCategory(""), setClick([false, false,false, false, false]))
          : (setCategory("develop"),setClick([false, true,false, false, false]))}
          >
            개발
          </CategoryBtn>
        <CategoryBtn isClick={click[2]} onClick={
          ()=>category==="pd"
          ? (setCategory(""), setClick([false, false,false, false, false]))
          : (setCategory("pd"), setClick([false, false,true, false, false]))
          }>
            기획
          </CategoryBtn>
        <CategoryBtn isClick={click[3]} onClick={
          ()=>category==="teambuild"
          ? (setCategory(""), setClick([false, false,false, false, false]))
          : (setCategory("teambuild"),setClick([false, false,false, true, false]))
          }>
            프로젝트 모집
          </CategoryBtn>
        <CategoryBtn isClick={click[4]} onClick={
          ()=>category==="daily"
          ? (setCategory(""), setClick([false, false,false, false, false]))
          : (setCategory("daily"), setClick([false, false,false, false, true]))
          }>
            일상
          </CategoryBtn>
      </Category>
      <SearchContainer>
        <select onChange={(e) => setSearchOption(e.target.value)}>
          <option value="S">작성자</option>
          <option value="M">제목</option>
          <option value="L">내용</option>
          <option value="XL">제목/내용</option>
        </select>
      <SearchInput
          onChange={
            (e)=>setSearchText(e.target.value)
          }
          onSubmit={()=>{
            setCategory("");
            categoryPost();//<All></All>이 호출되도록
          }}
          >
      </SearchInput>
      </SearchContainer>
      {categoryPost()}
    </Container>
    </>
  ); 
};
const Container=styled.div`
  background-color:#2152F4 ;
  text-align: center;
  min-height: 800px;
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
const SearchContainer=styled.div`
  float: right;
  margin: 20px;
`
const SearchInput=styled.input`
    width: 205px;
    height: 35px;
    border-radius: 5px;
    margin-left: 10px;
`
export default Posts;
