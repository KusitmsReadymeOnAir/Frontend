import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WarnModal from '../Components/WarnModal';
import {
  BsBookmark,
  BsBookmarkFill,
  BsHeart,
  BsHeartFill,
  BsChat
} from 'react-icons/bs';
const currentUser = localStorage.getItem('userId')

interface category{
    category:string,
}
const PostsForm = (category: category) => {
    const [posts, setPosts]=useState<any[]>([])
    useEffect(()=>{
        console.log(category);
        axios.get(`http://localhost:8080/board/list/${category.category}`)
        .then((res)=>{console.log(res.data.categoriedData); setPosts(res.data.categoriedData)})
      },[])
    const [modalShow, setModalShow]=useState(false);
    const [isLogin, setIsLogin]=useState(false);
    
    const onClickCard=()=>{
      //로그인하지 않은 경우엔 모달 띄우기
      if(!currentUser){
        setModalShow(true);
      }
      //로그인 한 경우엔 상세 페이지로 이동
      else{
        setIsLogin(true);
      }
    }
    const [scrap, setScrap] = useState(false);
    const [like, setLike] = useState(false);
  
    const onClickScrap = () => {
      setScrap(!scrap);
      console.log('스크랩');
    };
    const onClickLike = () => {
      setLike(!like);
      console.log('좋아요');
      //추천수 1 증가시키기

    };
    const Categories=(category: any)=>{
      switch(category){
        case "design": return "디자인"
        case "develop": return "개발"
        case "pd": return "기획"
        case "teambuilding": return "프로젝트모집"
        case "daily": return "일상"
      }
      
    }
    return (<>
    <PostsContainer>
    {posts && posts.map((item)=>{
     
          return (
              <Card onClick={onClickCard}>
                {isLogin?
                  <Link to={`/post/${item._id}`} style={{ textDecoration: "none" }}>
                    {item.imageId ?
                      <CardImg src={item.imageId}></CardImg>
                      :<CardImg src="../imgs/Image.png"></CardImg>
                    }
                  </Link>
                :
                <>
                {item.imageId ?
                  <CardImg src={item.imageId}></CardImg>
                  :<CardImg src="../imgs/Image.png"></CardImg>
                }
                </>
              } 
              <CardTitle>
                <WriterTitle>
                <WriterImg src="../imgs/User.png"></WriterImg>
                  <Writer>{item.userId.name}</Writer>
                </WriterTitle>
                  
                  {/*좋아요, 스크랩 버튼 하나씩만 눌리게 하는 건 api 나오면 하겠음. 어떤 형태로 서버에 줘야할 지 모르겠어서*/}
                  <LikeBtns>
                   <div>조회수</div>
                    <ViewNum>{item.views}</ViewNum>
                  </LikeBtns>
                </CardTitle>
                <Center>
                <Title>{item.title}</Title>
                </Center>
                
                <Foot>
                  <Category>{Categories(item.category)}</Category>
                <Date>
                  <span>{String(item.date).substr(0, 10) + " "}</span>
                 
                </Date>
                </Foot>
                
              </Card>  
        )})}
        <WarnModal
        show={modalShow}
        message={'로그인이 필요합니다.'}
        setModalShow={setModalShow}
      />
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
//position: relative;
margin: 0 auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const CardTitle=styled.div`
display: flex;
margin-top: 10px;
height: 70px;
justify-content: space-between;
width: 80%;
`
const Writer=styled.div`
  font-size: 24px;
  float: left;
  width: 80%;
  margin-top: 15px;
`
const WriterTitle=styled.div`
  display: flex;
`
const WriterImg=styled.img`
  margin-right: 10px;
`
const LikeBtns = styled.div`
  display: flex;
`;
const CardImg=styled.img`
  width: 300px;
  height:250px;
`;
const Center=styled.div`
 width: 300px;
  margin-left: 50px;
`
const Title=styled.div`
  margin-top: 10px;
  text-align: left;
  font-size: 32px;
  font-weight: bold;
  height: 80px;
`
const ViewNum=styled.div`
margin-left: 5px;
`
const Foot=styled.div`
  display: flex;
  margin-bottom: 10px;
`
const Category=styled.div`
  margin-right: 150px;
`
const Date=styled.div`
`
export default PostsForm;
