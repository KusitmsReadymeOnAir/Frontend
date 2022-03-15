import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { BiBold, BiImage, BiItalic, BiStrikethrough } from 'react-icons/bi';
import Editor from '../Components/Editor';

const options = [
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
const SelectCategory = styled.select`
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
const SubmitContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;
const SubmitBtn = styled.button`
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

const Write = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('design');
  const [content, setContent] = useState('');
  const [imageId, setImgeId] = useState('첨부파일');

  const postData = { title, content, category, imageId };
  const onSubmit = () => {
    fetch('http://localhost:8080/boards/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    console.log('success');
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
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </SelectCategory>
      </InfoForm>
      <ContentContainer>
        <Editor onChangeContent={onChangeContent} />
        <SubmitContainer>
          <SubmitBtn onSubmit={onSubmit}>업로드</SubmitBtn>
        </SubmitContainer>
      </ContentContainer>
    </Container>
  );
};

export default Write;
