import React, { useState } from 'react'
import styled from 'styled-components'

const MyPage = () => {
    const [click, setClick]=useState<boolean[]>([false, false, false])
    const [category, setCategory]=useState("");
    const [posts, setPosts]=useState(["post1", "post2","post3"]);
    return (
   <Container>
       <User>
           <UserImg src='../imgs/Image.png'></UserImg>
           <Profile>
               <Name>이름</Name>
               <Email>이메일</Email>
           </Profile>
       </User>
       <Menu>
        <Btn isClick={click[0]} onClick={
          ()=>category==="posts"
          ? (setCategory("") , setClick([false,false,false]))
          : (setCategory("posts"),setClick([true, false,false]))
        }>내가 쓴 글</Btn>
        <Btn isClick={click[1]} onClick={
          ()=>category==="comments"
          ? (setCategory("") , setClick([false,false,false]))
          : (setCategory("comments"),setClick([false, true,false]))
        }>댓글 단 글</Btn>
        <Btn isClick={click[2]} onClick={
          ()=>category==="scraps"
          ? (setCategory("") , setClick([false,false,false]))
          : (setCategory("scraps"),setClick([false, false,true]))
        }>스크랩</Btn>
       </Menu>
       <List>
        {posts&& posts.map((item)=>{
            return(
                <ListForm>
                    <Head>
                    <Writer>작성자</Writer>
                    <Date>날짜</Date>
                    </Head>
                    <Title>제목~~~~~~~~~~~~~~~</Title>
                    <Foot>
                    <Category>카테고리명</Category>
                    <CommentNum>댓글 수</CommentNum>
                    </Foot>
                    
                </ListForm>
            )
        })}
       </List>
   </Container>
  )
}
const Container=styled.div`
  background-color:#2152F4 ;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  padding: 30px 130px;
`
const User=styled.div`
    display: flex;
`
const UserImg=styled.img`
    width: 176px;
    height: 169px;
    border: 4px solid #000000;
    border-radius: 6px;
`
const Profile=styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
`
const Name=styled.div`
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 36px;
line-height: 150%;
color: #FFFFFF;
`
const Email=styled.div`
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 150%;
color: #FFFFFF;
`
const Menu=styled.div`
display: flex;
justify-content:center;
margin-top: 50px;
`
type isClick={
    isClick:boolean;
  };
  const Btn=styled.button<isClick>`
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
const List=styled.div`

`
const ListForm=styled.div`
    height: 182px;
    background: #FFFFFF;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 30px;
    margin-top: 35px;
    padding: 20px;
`
const Head=styled.div`
display: flex;
justify-content: space-between;
`
const Writer=styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
`
const Date=styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
   
`
const Title=styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    height: 90px;
`
const Foot=styled.div`
display: flex;
justify-content: space-between;
`
const Category=styled.div`
 font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
`
const CommentNum=styled.div`
 font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
`

export default MyPage;