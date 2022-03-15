import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { currentUser } from '../../Components/getCurrentUser';
import WarnModal from '../../Components/WarnModal';
import {
  BsBookmark,
  BsBookmarkFill,
  BsHeart,
  BsHeartFill,
} from 'react-icons/bs';

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
    
    return (<>
    <PostsContainer>
    {posts && posts.map((item)=>{
          return (
              <Card onClick={onClickCard}>
                {isLogin?
                <Link to={`/post/${item._id}`} style={{ textDecoration: "none" }}>
                <CardImg src="../imgs/Image.png"></CardImg>
              </Link>
              :
              <CardImg src="../imgs/Image.png"></CardImg>
              } 
              <CardTitle>
                  <Writer>{item.writer}</Writer>
                  {/*좋아요, 스크랩 버튼 하나씩만 눌리게 하는 건 api 나오면 하겠음. 어떤 형태로 서버에 줘야할 지 모르겠어서*/}
                  <LikeBtns>
                    <ScrapBtn onClick={onClickScrap}>
                      {scrap === false ? (
                        <BsBookmark size="35" />
                      ) : (
                        <BsBookmarkFill size="35" />
                      )}
                    </ScrapBtn>
                    <LikeBtn onClick={onClickLike}>
                      {like === false ? <BsHeart size="35" /> : <BsHeartFill size="35" />}
                    </LikeBtn>
                  </LikeBtns>
                </CardTitle>
                <div>{item.title}</div><Date>
                  <span>{String(item.date).substr(0, 10) + " "}</span>
                  <span>
                    {String(item.date).substr(11, 12).split(":")[0] +
                      ":" +
                      String(item.date).substr(11, 12).split(":")[1]}
                  </span>
                </Date>
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
margin: 0 auto;
position: relative;
`
const CardTitle=styled.div`
display: flex;
`
const Writer=styled.div`
font-size: 24px;
  float: left;
  width: 50%;
  margin-top: 15px;
`
const LikeBtns = styled.div`
  width: 90%;
  display: flex;
  justify-content: right;
  margin-left: 40px;
  margin-top: 10px;
`;
const CardImg=styled.img`
  width: 300px;
`
const Date=styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
`
const ScrapBtn = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;
const LikeBtn = styled(ScrapBtn)`
  margin-right: 20px;
`;

export default PostsForm;
