import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Header from '../Components/Header';
import styled from 'styled-components';
import internal from 'stream';

// 게시글 리스트 페이지
const Posts = () => {
  const [isClick, setIsClick]=useState<boolean>(false);
  const [posts, setPosts]=useState([
    {
      _id: "6226fed1aa058eaab230059e",
      title: "테스트 글1",
      content: "테스트 내용",
      category: 1,
      writer: "test1",
      pw: 1234,
      imageId: "이미지 번호",
      date: "2022-03-08T06:59:29.920Z"
  },
  {
    _id: "6226fed1aa058eaab230059e",
    title: "테스트 글1",
    content: "테스트 내용",
    category: 1,
    writer: "test1",
    pw: 1234,
    imageId: "이미지 번호",
    date: "2022-03-08T06:59:29.920Z"
},
  ])
  useEffect(()=>{
   ;
  },[])
  return (
    <>
    <Container>
      <Category>
        {/*<CategoryBtn isClick={isClick}>디자인</CategoryBtn>*/}
        <CategoryBtn>개발</CategoryBtn>
        <CategoryBtn>기획</CategoryBtn>
        <CategoryBtn>프로젝트 모집</CategoryBtn>
        <CategoryBtn>일상</CategoryBtn>
      </Category>
      <PostsContainer>
        {posts.map((item)=>{
          return (
            <Link to={`/post/${item._id}`} style={{textDecoration:"none"}}>
              <Card>
                <img src="../imgs/Image.png"></img>
                <div>{item.title}</div>
              </Card>  
            </Link>
        )})}
        <Card></Card>
      </PostsContainer>
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
// background: ${props=>props.isClick ?'#366EFF' : '#fff'};

const CategoryBtn=styled.button`
  height: 60px;
  font-size: 24px;
  padding: 12px 24px;
  background:#fff;
  border: 4px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  border-radius: 12px;
  margin-left:50px ;
`
const PostsContainer=styled.div`
  display:grid ;
  grid-template-columns:repeat(auto-fill, minmax(33%,33%));
  margin-top:50px ;
  row-gap:30px;
  grid-template-rows:1fr 1fr 1fr;
  text-align:center ;
`
const Card=styled.div`
padding: 32px;
width: 380px;
height: 420px;
/* White */
background: #FFFFFF;
/* Secondary / Black */
border: 4px solid #000000;
box-shadow: 4px 4px 0px #000000;
border-radius: 12px;
margin: 0 auto;
`
export default Posts;
