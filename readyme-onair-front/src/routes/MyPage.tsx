import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Cookies, useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { setSourceMapRange } from 'typescript';

/*interface posts{
    posts:Array<object>;
}
*/
const MyPage = () => {
    const [click, setClick]=useState<boolean[]>([false, false])
    const [category, setCategory]=useState("post");
    const [posts, setPosts]=useState<any[]>([]);
    const [user, setUser]=useState<any[]>([{}]);
    const id=localStorage.getItem("userId");
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const Logout=()=>{
        axios.get("http://localhost:8080/auth/logout")
        .then((res)=>{console.log(res.status);
            localStorage.removeItem("userId");
            //removeCookie("user");
            window.location.replace("/")
        }
        )
    }
    useEffect(()=>{
        axios.get(`http://localhost:8080/mypage/user/${id}`)
        .then((res)=>{console.log(res.data.userData);
        setUser(res.data.userData);});
    },[]);
    useEffect(()=>{
        if (category==="post"){
            axios.get(`http://localhost:8080/mypage/board/${id}`)
            .then((res)=>{//setPosts(res.data); 
                setPosts( [])
                console.log(res.data.boardData)});
        }
        else if (category==="comment"){
            axios.get(`http://localhost:8080/mypage/comment/${id}`)
            .then((res)=>{//setPosts(res.data); 
                setPosts([])
                console.log(res.data.commentData)})} 
    },[category])
    return (
   <Container>
       <LogBtn>
       <LogoutBtn onClick={Logout}>로그아웃</LogoutBtn>
       </LogBtn>
       
       <User>
           <UserImg src='../imgs/Image.png'></UserImg>
           <Profile>
           <Name>{user[0].name}</Name>
            <Email>{user[0].email}</Email>
           </Profile>
       </User>
       <Menu>
        <Btn isClick={click[0]} onClick={
          ()=>category==="post"
          ? (setCategory("") , setClick([false,false]))
          : (setCategory("post"),setClick([true, false]))
        }>내가 쓴 글</Btn>
        <Btn isClick={click[1]} onClick={
          ()=>category==="comment"
          ? (setCategory("") , setClick([false,false]))
          : (setCategory("comment"),setClick([false, true]))
        }>댓글 단 글</Btn>
        
       </Menu>
       <List>
        {posts && posts.map((item)=>{
            console.log(item);
            console.log(item.commentCnt[0].cnt);
            
            return(
                <Link to={`/post/${item.commentData[0][0]._id}`} style={{ textDecoration: "none" , color:"black"}}>
                <ListForm>
                    <Head>
                    <Writer>{item.commentData[0][0].userId.name}</Writer>
                    <Date>
                    <span>{String(item.commentData[0][0].date).substr(0, 10) + " "}</span>
                    <span>
                    {String(item.commentData[0][0].date).substr(11, 12).split(":")[0] +
                      ":" +
                      String(item.commentData[0][0].date).substr(11, 12).split(":")[1]}
                    </span>
                  </Date>
                    </Head>
                    <Title>{item.commentData[0][0].title}</Title>
                    <Foot>
                    <Category>{item.category}</Category>
                    <Comment>
                    <CommentImg src="../imgs/Comment.png"></CommentImg>
                    <CommentNum>{item.commentCnt[0].cnt}</CommentNum>
                    </Comment>
                    </Foot>
                    
                </ListForm>
                </Link>
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
const LogBtn=styled.div`
display: flex;
justify-content: flex-end;
`
const LogoutBtn=styled.button`
    height: 50px;
    font-size: 20px;
    padding: 12px 24px;
    background: #fff;
    border: 4px solid #000000;
    box-shadow: 4px 4px 0px #000000;
    border-radius: 12px;
    width: 130px;
`
const Profile=styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    margin-top: 10px;
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
font-size: 20px;
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
const Comment=styled.div`
    display: flex;
    align-items: center;
`
const CommentImg=styled.img`
    width: 30px;
    height: 30px;
    margin-right: 5px;
`
export default MyPage;