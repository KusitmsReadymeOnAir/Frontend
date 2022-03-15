import React, { useEffect, useState } from 'react';
import { EditTextarea } from 'react-edit-text';
import styled from 'styled-components';
import { IComment } from '../routes/Post';
import { currentUser } from './getCurrentUser';
import { BsThreeDotsVertical } from 'react-icons/bs';

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

const Menu = styled.div`
  display: flex;
  justify-content: right;
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Btn = styled.button`
  background: #2152f4;
  border-radius: 25px;
  border-style: none;
  border-color: #fff;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  width: 100px;
  height: 34px;
`;

const SaveBtn = styled(Btn)`
  margin-top: 40px;
`;

const Comments = ({ comments }: any) => {
  console.log(comments);
  const [newComment, setNewComment] = useState<IComment>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isRepOpen, setIsRepOpen] = useState(false);
  const toggleRep = () => {
    setIsRepOpen(!isRepOpen);
  };

  // 댓글 등록
  // useEffect(() => {
  //   (async () => {
  //     const comments = await (
  //       await fetch(API_URL + '/board/list/622b6947fb6a4fdf1d331961')
  //     ).json();
  //     console.log(comments.title);
  //   })();
  // }, []);

  const onClickRepBtn = (writer: string) => {
    if (currentUser !== null) {
    }
  };

  const onClickDelBtn = (writer: string) => {
    // 로컬 스토리지의 사용자와 댓글 작성자가 일치하면 댓글 삭제
    if (writer === currentUser) {
      console.log('댓글 삭제');
    }
  };

  const onChangeComment = (value: string) => {
    // setNewComment({
    //   ...newComment,
    //   comment: value,
    // });
    console.log(newComment);
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
        return (
          <Comment key={comment.userId._id}>
            <Menu>
              <BsThreeDotsVertical
                onClick={toggleMenu}
                size={20}
                style={{ cursor: 'pointer' }}
              />
              {isMenuOpen ? (
                <ButtonContainer>
                  <Btn onClick={toggleRep}>답글 달기</Btn>
                  <Btn onClick={() => onClickDelBtn(comment?.userId.name)}>
                    삭제
                  </Btn>
                </ButtonContainer>
              ) : (
                <></>
              )}
            </Menu>
            <CommentId>{comment?.userId.name}</CommentId>
            <CommentContent>{comment.comment}</CommentContent>
            <Comment style={{ visibility: isRepOpen ? 'visible' : 'hidden' }}>
              <CommentId>대댓글 작성자</CommentId>
              <CommentContent>대댓글</CommentContent>
            </Comment>
          </Comment>
        );
      })}
      <h2>댓글 작성</h2>
      <Comment>
        <EditTextarea
          id="comment"
          placeholder="내용을 입력하세요"
          value={newComment?.comment}
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
