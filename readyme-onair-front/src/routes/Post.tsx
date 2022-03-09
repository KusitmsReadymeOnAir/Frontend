import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';

// 개별 게시글 페이지

const Post = () => {
  return (
    <div>
      <Header/>
      <Container>
        <PostContainer>

       
        <CategoryName>카테고리명</CategoryName>
        <h1>제목</h1>
        <PostBox>
        <div style={{"width":"100%" ,"height":"100px"}}>
          <PostBtns>
            <PostBtn>수정</PostBtn>
            <PostBtn>삭제</PostBtn>
          </PostBtns>
        </div>
        
         
         
          <div>
          <img src="../imgs/Image.png"></img>
          </div>
          
          <div>내용~~~~</div>
        </PostBox>
        </PostContainer>
      </Container>
    </div>
  );
};
const Container=styled.div`
  background-color:#CEE9F8 ;
  width:100% ;
  padding-top: 50px;
`
const PostContainer=styled.div`
  width:90%;
  margin:0 auto ;
`
const CategoryName=styled.div`
    width: 176px;
    height: 43px;
    background: #2152F4;
    border-radius: 25px;
    border-style: none;
    border-color:#fff;
    color:#fff ;
    font-size: 20px;
    text-align:center ;
`
const PostBtns=styled.div`
  float:right ;
  
`
const PostBtn=styled.button`
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
const PostBox=styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  height:600px;
  margin: 0 auto;
  padding:40px ;
`
export default Post;
