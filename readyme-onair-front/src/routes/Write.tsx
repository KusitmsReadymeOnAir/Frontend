import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { BiBold, BiImage, BiItalic, BiStrikethrough } from 'react-icons/bi';
import { theme } from '../theme';
const DB_URL = '';

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
  max-width: 780px; ;
`;
// 제목 입력 폼
const TitleForm = styled.form`
  width: 420px;
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
`;
const SelectCategory = styled.select`
  width: 120px;
  font-size: 18px;
  border: 0px;
`;
// 작성자, 비밀번호 입력 폼
const UserInfoForm = styled.form`
  position: relative;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100vw;
  font-size: 18px;
`;

const ToolContainer = styled.div`
  margin-bottom: 20px;
`;
const ContentContainer = styled.div`
  height: 50vh;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const SubmitBtn = styled.button`
  position: relative;
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
`;
const Write = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('design');
  const [writer, setWriter] = useState('');
  const [pw, setPw] = useState('');
  const [content, setContent] = useState('');
  const [imageId, setImgeId] = useState('첨부파일');
  const [isSubmit, setSubmit] = useState(false);

  const postData = { title, content, category, writer, pw, imageId };
  const onSubmit = () => {
    fetch(DB_URL + '/board/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  };

  const onChangeTitle = (value: string) => {
    setTitle(value);
  };
  useEffect(() => {
    setCategory(title);
  }, [title]);

  const onChangeCategory = (e: any) => {
    setCategory(e.currentTarget.value);
  };
  useEffect(() => {
    setCategory(category);
  }, [category]);

  const onChangeWriter = (value: string) => {
    setWriter(value);
  };
  useEffect(() => {
    setWriter(writer);
  }, [writer]);

  const onChangePw = (value: string) => {
    setPw(value);
  };
  useEffect(() => {
    setPw(pw);
  }, [pw]);

  const onChangeContent = (value: string) => {
    setContent(value);
  };
  useEffect(() => {
    setContent(content);
  }, [content]);

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
        <UserInfoForm>
          <table>
            <td>
              <EditText
                placeholder="작성자 닉네임"
                id="writer"
                type="text"
                value={writer}
                onChange={(value) => onChangeWriter(value)}
                style={{
                  width: '180px',
                  textDecoration: 'underline',
                }}
              ></EditText>
            </td>
            <td>
              <EditText
                placeholder="비밀번호"
                id="pw"
                type="password"
                value={pw}
                onChange={(value) => onChangePw(value)}
                style={{
                  width: '180px',
                  textDecoration: 'underline',
                }}
              ></EditText>
            </td>
          </table>
        </UserInfoForm>
      </InfoForm>
      <ContentContainer>
        <ToolContainer>
          <table>
            <td>
              <BiImage size={25} />
            </td>
            <td>
              <BiBold size={25} />
            </td>
            <td>
              <BiItalic size={25} />
            </td>
            <td>
              <BiStrikethrough size={25} />
            </td>
          </table>
        </ToolContainer>
        <EditTextarea
          id="content"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(value) => onChangeContent(value)}
          style={{
            height: '50vh',
            resize: 'none',
            fontSize: '18px',
          }}
        />
      </ContentContainer>
      <SubmitContainer>
        <SubmitBtn onSubmit={onSubmit}>업로드</SubmitBtn>
      </SubmitContainer>
    </Container>
  );
};

export default Write;
