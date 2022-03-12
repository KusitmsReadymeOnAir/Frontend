import React, { useEffect, useState } from 'react';
import { EditTextarea } from 'react-edit-text';
import styled from 'styled-components';
import { IComment } from '../routes/Post';
import { currentUser } from './getCurrentUser';
const API_URL = 'http://localhost:8000';

// styled components
const CommentContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const Comment = styled.div`
  background: #ffffff;
  border-radius: 12px;
  height: 120px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
`;

const CommentId = styled.h3`
  margin: 0 auto;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const CommentContent = styled.div`
  height: 40px;
  border: 0px;
  width: 100%;
  margin: 5px 0;
  padding-left: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const DelBtn = styled.button`
  background: #2152f4;
  border-radius: 25px;
  border-style: none;
  border-color: #fff;
  color: #fff;
  text-align: center;
  margin-left: 20px;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  width: 100px;
  height: 34px;
`;

const SaveBtn = styled(DelBtn)``;

const Comments = ({ comments }: any) => {
  const [newComment, setNewComment] = useState<IComment>({
    // 새로 등록할 댓글
    writer: 'none',
    pw: 99,
    createdAt: new Date(Date.now()),
    content: '',
  });

  // 댓글 등록
  // useEffect(() => {
  //   (async () => {
  //     const comments = await (await fetch(API_URL + '')).json();
  //     console.log(comments);
  //   })();
  // }, []);

  const onClickDelBtn = (writer: string) => {
    // 로컬 스토리지의 사용자와 댓글 작성자가 일치하면 댓글 삭제
    if (writer === currentUser) {
      console.log('댓글 삭제');
    }
  };

  const onChangeComment = (value: string) => {
    setNewComment({
      ...newComment,
      content: value,
    });
  };

  const onSubmit = () => {
    if (currentUser !== null) {
      console.log(newComment);
    } else {
      console.log('로그인 페이지로 이동');
    }
  };

  return (
    <CommentContainer>
      <h2>댓글</h2>
      {comments.map((comment: IComment) => {
        const writer = comment.writer;
        return (
          <Comment key={writer}>
            <CommentId>{writer}</CommentId>
            <CommentContent>{comment.content}</CommentContent>
            <ButtonContainer>
              <DelBtn onClick={() => onClickDelBtn(writer)}>삭제</DelBtn>
            </ButtonContainer>
          </Comment>
        );
      })}
      <h2>댓글 작성</h2>
      <Comment>
        <EditTextarea
          id="comment"
          placeholder="내용을 입력하세요"
          value={newComment.content}
          onChange={(value) => onChangeComment(value)}
          rows={2}
          style={{
            marginBottom: '10px',
            width: '100%',
            height: '70px',
            resize: 'none',
          }}
        />
        <ButtonContainer>
          <SaveBtn onClick={onSubmit}>등록</SaveBtn>
        </ButtonContainer>
      </Comment>
    </CommentContainer>
  );
};

export default Comments;
