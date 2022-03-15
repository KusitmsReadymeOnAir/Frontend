import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comments from '../Components/Comments';
import { currentUser } from '../Components/getCurrentUser';
import WarnModal from '../Components/WarnModal';
import {
  BsBookmark,
  BsBookmarkFill,
  BsHeart,
  BsHeartFill,
} from 'react-icons/bs';
import { BiFemaleSign } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
const API_URL = 'http://localhost:8080';

// 개별 게시글 페이지
const Container = styled.div`
  background-color: #cee9f8;
  width: 100%;
  padding: 50px 0px;
`;
const PostContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const CategoryName = styled.button`
  width: 176px;
  height: 43px;
  background: #2152f4;
  border-radius: 25px;
  border-color: #fff;
  color: #fff;
  font-size: 20px;
  text-align: center;
`;
const PostBtns = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  height: 100px;
`;
const EditBtn = styled(CategoryName)`
  width: 120px;
  height: 40px;
  font-size: 18px;
  margin-left: 20px;
  color: #2152f4;
  background: #fff;
  border-color: #2152f4;
  &: hover {
    color: #fff;
    background: #2152f4;
  }
  cursor: pointer;
`;
const DelBtn = styled(EditBtn)``;
const PostBox = styled.div`
  background: #ffffff;
  border-radius: 12px;
  height: 600px;
  margin: 0 auto;
  padding: 20px;
  padding-left: 40px;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;
const ContentContainer = styled(ImageContainer)`
  margin-bottom: 0px;
`;

const LikeBtns = styled.div`
  width: 90%;
  display: flex;
  justify-content: right;
  margin-left: 40px;
  margin-top: 20px;
`;
const ScrapBtn = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;
const LikeBtn = styled(ScrapBtn)`
  margin-right: 20px;
`;

interface IPost {
  title: string;
  content: string;
  category: string;
  writer: string;
  pw: number;
  imageId: string;
  date: Date;
  comments: IComment[];
}

export interface IComment {
  writer: string;
  pw: number;
  createdAt: Date;
  content: string;
}

// 게시물의 댓글 샘플
const sampleComments: IComment[] = [
  {
    writer: '가나',
    pw: 1234,
    createdAt: new Date('2022-03-01'),
    content: '최고예요!',
  },
  {
    writer: '다라',
    pw: 5678,
    createdAt: new Date('2022-03-03'),
    content: '응원합니다',
  },
];

// 게시물 샘플
const DummyPost: IPost = {
  title: '기업 프로젝트 회고록',
  content: '큐시즘에서 레디미 기업 프로젝트를 진행했다.',
  category: '개발',
  writer: '최은형',
  pw: 1234,
  imageId: '../imgs/Image.png',
  date: new Date('2022-03-12'),
  comments: sampleComments,
};

const Post = () => {
  const id = useLocation().pathname.toString().substring(6);
  const [post, setPost] = useState<IPost>(DummyPost);
  const [comments, setComments] = useState(post.comments);
  const [modalShow, setModalShow] = useState(false);
  const [scrap, setScrap] = useState(false);
  const [like, setLike] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await (await fetch(API_URL + `/board/list/${id}`)).json();
      setPost(res.board);
      setComments(post.comments);
    })();
  }, []);

  // board/show/:id'
  const onClick = (btnType: string) => {
    if (post.writer !== currentUser) {
      // 게시물 작성자와 현재 사용자가 다른 경우
      setModalShow(true);
    } else if (btnType === 'edit') {
      console.log('게시물 수정');
    } else {
      console.log('게시물 삭제');
    }
  };

  const onClickScrap = () => {
    setScrap(!scrap);
    console.log('스크랩');
  };
  const onClickLike = () => {
    setLike(!like);
    console.log('좋아요');
  };
  return (
    <Container>
      <PostContainer>
        <CategoryName>{post.category}</CategoryName>
        <h1>{post.title}</h1>
        <PostBox>
          <PostBtns>
            <EditBtn onClick={() => onClick('edit')}>수정</EditBtn>
            <DelBtn onClick={() => onClick('delete')}>삭제</DelBtn>
          </PostBtns>
          <ImageContainer>
            <img src={post.imageId}></img>
          </ImageContainer>
          <ContentContainer>
            <p>{post.content}</p>
          </ContentContainer>
        </PostBox>
      </PostContainer>
      <LikeBtns>
        <ScrapBtn onClick={onClickScrap}>
          {scrap === false ? (
            <BsBookmark size="35" />
          ) : (
            <BsBookmarkFill size="35" />
          )}
        </ScrapBtn>
        <LikeBtn onClick={onClickLike}>
          {like === false ? (
            <BsHeart size="35" />
          ) : (
            <BsHeartFill size="35" color="violet" />
          )}
        </LikeBtn>
      </LikeBtns>
      <Comments comments={comments} setComments={setComments} />
      <WarnModal
        show={modalShow}
        message={'로그인이 필요합니다.'}
        setModalShow={setModalShow}
      />
    </Container>
  );
};
export default Post;
