import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comments, { IComment } from '../Components/Comments';
import WarnModal from '../Components/WarnModal';
import {
  BsBookmark,
  BsBookmarkFill,
  BsHeart,
  BsHeartFill,
} from 'react-icons/bs';
import { BiFemaleSign } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { EditText, EditTextarea } from 'react-edit-text';
import {
  categories,
  SelectCategory,
  SubmitBtn,
  SubmitContainer,
} from './Write';
import e from 'cors';
import Editor from '../Components/Editor';
import axios from 'axios';
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
const Img=styled.img`
width:500px;
height: 500px;
`
const PostBox = styled.div`
  background: #ffffff;
  border-radius: 12px;
  height: auto;
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
const EditContainer = styled(PostBox)`
  width: 80%;
  height: 350px;
  margin-top: 20px;
`;
export const DateTxt = styled.p`
  opacity: 0.3;
  font-size: 12px;
  margin-left: 10px;
`;

interface IPost {
  _id: string;
  title: string;
  content: string;
  category: string;
  userId: { _id: string; name: string };
  date: Date;
  imageId?: string;
  views: number;
  numId: number;
}

const Post = () => {
  const currentUser = localStorage.getItem('userId');
  const id = useLocation().pathname.toString().substring(6);
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComment[]>();
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessge] = useState('모달창 안내 메시지');
  const [scrap, setScrap] = useState(false);
  const [like, setLike] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(post?.title);
  const [editCategory, setEditCategory] = useState(post?.category);
  const [editContent, setEditContent] = useState(post?.content);

  const [contentArr, setContentArr]: any[] = useState([])

  // 게시물 불러오기
  useEffect(() => {
    axios.get(`${API_URL}/board/show/${id}`)
      .then((res)=>{
        setPost(res.data.board);
        setComments(res.data.comment)
        console.log(res.data.board)
    });
  }, []);

  useEffect(() => {
    const newArr = []
    newArr[0] = post?.content
    setContentArr(newArr)
  }, [post])

  // 게시물 수정
  const onClickEditBtn = () => {
    setEditTitle(post?.title);
    setEditContent(post?.content);
    setEditCategory(post?.category);
    // 게시물 작성자와 현재 사용자가 다른 경우
    if (post?.userId._id !== currentUser) {
      setModalMessge('자신이 작성한 글만 수정할 수 있습니다.');
      setModalShow(!modalShow);
    } else {
      // 게시물 수정 창으로 이동
      setIsEdit(true);
      window.scrollTo({
        top: 800,
        behavior: 'smooth',
      });
    }
  };
  const onClickUpdate = () => {
    const editData = {
      boardId: id,
      userId: currentUser,
      title: editTitle,
      content: editContent,
      category: editCategory,
    };
    fetch(`${API_URL}/board/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    }).then(async (res) => {
      const jsonRes = await res.json();
      console.log(jsonRes);
      setIsEdit(false);
    });
    // 게시물 다시 가져와서 렌더링
    fetch(`${API_URL}/board/show/` + id, {
      method: 'GET',
    }).then(async (res) => {
      const jsonRes = await res.json();
      setPost(jsonRes.board[0]);
    });
  };

  // 게시물 삭제
  const onClickDelBtn = () => {
    const user = post?.userId._id;
    if (user !== currentUser) {
      setModalMessge('자신이 작성한 글만 삭제할 수 있습니다.');
      setModalShow(!modalShow);
    } else {
      const delData = { boardId: id, userId: user };
      fetch(`${API_URL}/board/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(delData),
      }).then(async (res) => {
        const successMsg = await res.json();
        if (successMsg) {
          setModalMessge('게시글이 삭제되었습니다.');
          setModalShow(!modalShow);
        }
      });
    }
  };

  const onChangeEditCategory = (e: any) => {
    setEditCategory(e.currentTarget.value);
  };
  const onChangeEditContent = (value: string) => {
    setEditContent(value);
  };
  const onChangeEditTitle = (e: any) => {
    setEditTitle(e.currentTarget.value);
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
        <CategoryName>{post?.category}</CategoryName>
        <h1>{post?.title}</h1>
        <PostBox>
          <PostBtns>
            <DateTxt>
              작성날짜: {post?.date.toString().substring(0, 10)}&nbsp;
              글번호: {post?.numId}&nbsp;
              조회수: {post?.views}&nbsp;
            </DateTxt>
            <EditBtn onClick={onClickEditBtn}>수정</EditBtn>
            <DelBtn onClick={onClickDelBtn}>삭제</DelBtn>
          </PostBtns>
          <ImageContainer>
            {
              post?.imageId !== '' ?(
              <Img src={post?.imageId} alt="" />) : (
                <></>
              )
            }
          </ImageContainer>
          <ContentContainer>{
              contentArr?.map((arr: any) => {
                return arr
              })
            }</ContentContainer>
        </PostBox>
      </PostContainer>

      {isEdit ? (
        <EditContainer>
          <h3>✍️ 수정할 사항 입력</h3>
          <EditText
            type="text"
            placeholder={post?.title}
            value={editTitle}
            onChange={onChangeEditTitle}
            style={{
              width: '50%',
              height: '20px',
              fontSize: '30px',
              marginBottom: '20px',
            }}
          />
          <form>
            <SelectCategory
              value={editCategory}
              onChange={onChangeEditCategory}
              style={{
                marginBottom: '20px',
              }}
            >
              {categories.map((category) => {
                return (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                );
              })}
            </SelectCategory>
          </form>
          <Editor onChangeContent={onChangeEditContent} />
          <SubmitContainer>
            <SubmitBtn onClick={onClickUpdate}>수정하기</SubmitBtn>
          </SubmitContainer>
        </EditContainer>
      ) : (
        <></>
      )}
      <Comments
        id={id}
        comments={comments}
        setComments={setComments}
        modalShow={modalShow}
        setModalShow={setModalShow}
        setModalMessge={setModalMessge}
      />
      <WarnModal
        show={modalShow}
        message={modalMessage}
        setModalShow={setModalShow}
      />
    </Container>
  );
};
export default Post;
