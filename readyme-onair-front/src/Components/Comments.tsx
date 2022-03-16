import React, { useEffect, useState } from 'react';
import { EditTextarea } from 'react-edit-text';
import styled from 'styled-components';
import { currentUser } from './getCurrentUser';
import { BsThreeDotsVertical } from 'react-icons/bs';
const API_URL = 'http://localhost:8080';

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

interface IComment {
  _id: string;
  boardId: string;
  userId: { _id: string; name: string };
  createdAt: Date;
  comment: string;
  isDeleted: boolean;
  childComments?: IComment[];
}

interface INewComment {
  comment: string;
  boardId: string;
  parendComment?: string;
  userId: string | null;
}

const Comments = ({ id, modalShow, setModalShow, setModalMessge }: any) => {
  const [comments, setComments] = useState<IComment[]>();
  const [newComment, setNewComment] = useState(''); // 새로 등록할 댓글
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isRepOpen, setIsRepOpen] = useState(false);
  const toggleRep = () => {
    setIsRepOpen(!isRepOpen);
  };

  // 사용자 정보 불러오기
  // 댓글 불러오기
  useEffect(() => {
    fetch(`${API_URL}/board/show/` + id, {
      method: 'GET',
    }).then(async (res) => {
      const jsonRes = await res.json();
      setComments(jsonRes.comment);
    });
  }, []);

  const onClickRepBtn = (writer: string) => {
    // 대댓글 등록
    if (currentUser !== null) {
    }
  };

  // 댓글 값 변경
  const onChangeNewComment = (value: string) => {
    setNewComment(value);
  };

  // 새 댓글 등록
  const onClickNewComment = () => {
    const postData: INewComment = {
      comment: newComment,
      boardId: id,
      userId: currentUser,
    };
    if (currentUser !== null) {
      fetch(`${API_URL}/comment/addComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      }).then(async (res) => {
        const jsonRes = await res.json();
        console.log(jsonRes.comment);
        // 서버에서 수정된 결과 넘겨 받아야함
        setComments(jsonRes.comment);
      });
    } else {
      setModalMessge('로그인이 필요합니다.')
      setModalShow(!modalShow);
    }
  };

  const onClickDelBtn = (commentId: string, userId: string) => {
    // 로컬 스토리지의 사용자와 댓글 작성자가 일치하면 댓글 삭제
    // local storage 오류 발생
    const currentUser = '62309fdd61e3bfc788d62c8d';
    console.log(currentUser)
    if (userId === currentUser) {
      const delData = { commentId, userId}
      fetch(`${API_URL}/comment/deleteComment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(delData),
      })
      // 삭제 반영된 댓글 데이터 다시 가져와서 렌더링
      fetch(`${API_URL}/board/show/` + id, {
        method: 'GET',
      }).then(async (res) => {
        const jsonRes = await res.json();
        setComments(jsonRes.comment);
      });
    } else {
      setModalMessge('자신이 쓴 댓글만 삭제할 수 있습니다.')
      setModalShow(!modalShow)
    }
  };

  return (
    <CommentContainer>
      <h2>댓글</h2>
      {comments?.map((comment: IComment) => {
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
                  <Btn onClick={() => onClickDelBtn(comment?._id, comment?.userId._id)}>
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
          value={newComment}
          onChange={(value) => onChangeNewComment(value)}
          rows={2}
          style={{
            marginBottom: '10px',
            width: '100%',
            height: '70px',
            resize: 'none',
          }}
        />
        <ButtonContainer>
          <SaveBtn onClick={onClickNewComment}>등록</SaveBtn>
        </ButtonContainer>
      </Comment>
    </CommentContainer>
  );
};

export default Comments;
