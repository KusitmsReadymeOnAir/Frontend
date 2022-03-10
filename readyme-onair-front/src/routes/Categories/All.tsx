import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const All=()=>{
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
        title: "테스트 글2",
        content: "테스트 내용",
        category: 1,
        writer: "test1",
        pw: 1234,
        imageId: "이미지 번호",
        date: "2022-03-08T06:59:29.920Z"
    },])

    return(<>
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
    </PostsContainer>
    </>);
}
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
export default All;