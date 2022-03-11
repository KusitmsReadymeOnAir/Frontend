import React from 'react';
import styled from 'styled-components';
import { EditText } from 'react-edit-text';
import { UserInfoForm } from './Write';
import Comments from '../Components/Comments';

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
  border-style: none;
  border-color: #fff;
  color: #fff;
  font-size: 20px;
  text-align: center;
`;
const PostBtns = styled.div`
  float: right;
`;
const PostBtn = styled(CategoryName)`
  width: 120px;
  height: 40px;
  font-size: 18px;
  margin-left: 20px;
  cursor: pointer;
`;
const PostBox = styled.div`
  background: #ffffff;
  border-radius: 12px;
  height: 600px;
  margin: 0 auto;
  padding: 20px;
  padding-left: 40px;
`;

const CommentContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const Comment = styled(PostBox)`
  height: 120px;
  margin-top: 20px;
  padding: 20px;
`;

const CommentId = styled.h3`
  margin: 0 auto;
  margin-left: 10px;
  margin-bottom: 5px;
`;

const CommentContent = styled.textarea`
  height: 40px;
  border: 0px;
  resize: none;
  width: 100%;
  margin: 5px 0;
`;

const DelConatiner = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const DelBtn = styled(PostBtn)`
  position: relative;
  font-size: 14px;
  width: 100px;
  height: 34px;
`;

const sampleComment = [
  {
    boardId: 'user1',
    pw: '1234',
    content: 'ddd',
    createdAt: '2022-03-10',
  },
  {
    boardId: 'user2',
    pw: '5678',
    content: 'content2',
    createdAt: '2022-03-10',
  },
];

const Post = () => {
  return (
    <Container>
      <PostContainer>
        <CategoryName>카테고리명</CategoryName>
        <h1>제목</h1>
        <PostBox>
          <div style={{ width: '100%', height: '100px' }}>
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
      <Comments />
    </Container>
  );
};
export default Post;
