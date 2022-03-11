import React, { useEffect, useState } from 'react';
import { EditTextarea } from 'react-edit-text';
import styled from 'styled-components';

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
  margin-bottom: 5px;
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

const sampleComment = [
  {
    boardId: 'user1',
    pw: '1234',
    content: 'content2',
    createdAt: '2022-03-10',
  },
  {
    boardId: 'user2',
    pw: '5678',
    content: 'content2',
    createdAt: '2022-03-10',
  },
];

interface IComment {
  _id: string;
  boardId: number;
  pw: number;
  createdAt: Date;
  Comment: string;
}

const Comments = () => {
  const [comment, setComment] = useState('');

  const onChangeComment = (value: string) => {
    setComment(value);
  };

  const onSubmit = () => {
    console.log(1);
    getData(() => {
      getData((receivedComments: IComment[]) => {
        console.log(receivedComments);
      });
    })(0, 1);
  };
  type GetDataPromiseCallback = (a: IComment[]) => void;
  const getData =
    (fn: GetDataPromiseCallback) => (skip: number, limit: number) =>
      fetch('http://localhost:8000/')
        .then((res) => res.json())
        .then(fn);

  useEffect(onSubmit, []);

  return (
    <CommentContainer>
      <h2>댓글</h2>
      {sampleComment.map((com) => {
        return (
          <Comment key={com.boardId}>
            <CommentId>{com.boardId}</CommentId>
            <CommentContent>{com.content}</CommentContent>
            <ButtonContainer>
              <DelBtn>삭제</DelBtn>
            </ButtonContainer>
          </Comment>
        );
      })}
      <h2>댓글 작성</h2>
      <Comment>
        <EditTextarea
          id="comment"
          placeholder="내용을 입력하세요"
          value={comment}
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
          <SaveBtn onSubmit={onSubmit}>저장</SaveBtn>
        </ButtonContainer>
      </Comment>
    </CommentContainer>
  );
};

export default Comments;
