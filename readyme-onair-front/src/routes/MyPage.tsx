import React from 'react'
import styled from 'styled-components'

const mypage = () => {
  return (
   <Container>
       <User>
           <UserImg src='../imgs/Image.png'></UserImg>
           <Profile>
               <Name>이름</Name>
               <Email>이메일</Email>
           </Profile>
       </User>
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
`
const Name=styled.div`
`
const Email=styled.div`
`
export default mypage