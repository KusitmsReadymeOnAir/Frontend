import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface search{
  searchText:string;
  searchOption:string;
}
const All=({searchText, searchOption}: search)=>{
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
      {
        _id: "6226fed1aa058eaab230059e",
        title: "테스트 글2",
        content: "테스트 내용",
        category: 1,
        writer: "test1",
        pw: 1234,
        imageId: "이미지 번호",
        date: "2022-03-08T06:59:29.920Z"
    },])
    /*useEffect(()=>{
      //검색어가 존재한다면 
      if (searchText!==""){
        //axios로 검색 결과 받아서 setPost()
      }
    },[])*/
    return(<>
    <PostsContainer>
    {posts.map((item)=>{
          return (
            <Link to={`/post/${item._id}`} style={{textDecoration:"none"}}>
              <Card>
                <CardImg src="../imgs/Image.png"></CardImg>
                <div>{item.title}</div>
              </Card>  
            </Link>
        )})}
    </PostsContainer>
    </>);
}
const PostsContainer=styled.div`
  display:grid ;
  grid-template-columns:repeat(auto-fill, minmax(33%,33%));
  margin-top:90px;
  row-gap:20px;
  grid-template-rows:1fr 1fr 1fr;
  text-align:center ;
  padding-left: 30px;
  padding-right: 30px;
`
const Card=styled.div`
padding-top: 20px;
height: 420px;
width: 380px;
/* White */
background: #FFFFFF;
/* Secondary / Black */
border: 4px solid #000000;
box-shadow: 4px 4px 0px #000000;
border-radius: 12px;
margin: 0 auto;
`
const CardImg=styled.img`
  width: 300px;
`
export default All;