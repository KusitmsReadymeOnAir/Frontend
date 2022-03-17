import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import Editor from '../Components/Editor';
const API_URL = 'http://localhost:8080';
const currentUser = localStorage.getItem('userId')

export const categories = [
  {
    value: 'design',
    name: '디자인',
  },
  {
    value: 'develop',
    name: '개발',
  },
  {
    value: 'pd',
    name: '기획',
  },
  {
    value: 'teambuild',
    name: '팀빌딩',
  },
  {
    value: 'daily',
    name: '일상',
  },
];

const Container = styled.div`
  padding: 0px 20px;
  width: 90%;
  margin-left: 20px;
`;
// 제목 입력 폼
const TitleForm = styled.form`
  width: 90%;
  font-size: 48px;
  margin-bottom: 20px;
`;
// 카테고리, 작성자닉네임, 비밀번호 포함
const InfoForm = styled.div`
  padding: 0px;
  display: flex;
  align-items: center;
  height: 18px;
  margin-bottom: 20px;
  text-align: right;
`;
export const SelectCategory = styled.select`
  width: 120px;
  font-size: 18px;
  border: 0px;
`;
// 작성자, 비밀번호 입력 폼
export const UserInfoForm = styled.form`
  position: relative;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100vw;
  font-size: 18px;
`;
const ContentContainer = styled.div`
  height: 400px;
`;
export const SubmitContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;
export const SubmitBtn = styled.button`
  width: 120px;
  height: 43px;
  background: #2152f4;
  border-radius: 25px;
  border-style: none;
  border-color: #fff;
  color: #fff;
  font-style: normal;
  font-size: 20px;
  cursor: pointer;
  margin-top: 30px;
`;

interface IPost {
  title: string;
  content: string;
  category: string;
  userId: string;
  imageId: string;
}

const Write = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('design');
  const [content, setContent] = useState('');
  const [imageId, setImgId] = useState('');
  const navigate = useNavigate();

  // 서버로 데이터 전송
  const userId :any= currentUser;
  const postData: IPost = { title, content, category, userId, imageId };

  const onUpload = (e: any) => {
    console.log(postData);
    console.log(imageId);
    e.preventDefault();
    fetch(`${API_URL}/board/write`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    }).then(async (res) => {
      const jsonRes = await res.json();
      console.log('응답 : ', jsonRes);
      setId(jsonRes.data._id)
    })
    fetch(`${API_URL}/board/show/` + id, {
      method:'GET'
    }).then(async(res) => {
      const jsonRes = await res.json();
      navigate(`/post/${id}`)
    })
  };

  const onChangeTitle = (value: string) => {
    setTitle(value);
  };
  const onChangeCategory = (e: any) => {
    setCategory(e.currentTarget.value);
  };
  const onChangeContent = (value: string) => {
    setContent(value);
  };
  const onChangeImg = (e: any) => {
    const file = e.target.files[0];
    // const jsonData = JSON.stringify(file);
    const formData = new FormData();
    formData.append('imgs', file);
    //이미지 POST
    fetch(`${API_URL}/board/imageUpload`, {
      method: 'POST',
      body: formData,
    }).then(async (res) => {
      const jsonRes = await res.json();
      setImgId(jsonRes.data);
    });
    // setImgId(file);
  };

  return (
    <Container>
      <TitleForm>
        <EditText
          id="title"
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={onChangeTitle}
          style={{
            width: '90%',
            height: '60px',
            fontSize: '48px',
            borderRadius: '10px',
          }}
        />
      </TitleForm>
      <InfoForm>
        <SelectCategory value={category} onChange={onChangeCategory}>
          {categories.map((category) => {
            return (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            );
          })}
        </SelectCategory>
      </InfoForm>
      <ContentContainer>
        <Editor onChangeContent={onChangeContent} />
        <form method="post" encType="multipart/form-data">
          <input type="file" id="imgs" accept="img/*" onChange={onChangeImg} />
        </form>
        <img src={imageId} alt="" />
        <SubmitContainer>
          <Link to={`/post/${id}`}>
            <SubmitBtn onClick={onUpload}>업로드</SubmitBtn>
          </Link>
        </SubmitContainer>
      </ContentContainer>
    </Container>
  );
};

export default Write;
