import styled from 'styled-components';
import Modal from 'styled-react-modal';

const StyledModal = Modal.styled`
  width: 20rem;
  height: 10rem;
  background-color: white;
  border-radius: 20px;
`;

const MessageContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled(MessageContainer)``;
const CloseBtn = styled.button`
  width: 120px;
  height: 30px;
  background: #2152f4;
  border-radius: 20px;
  border-style: none;
  border-color: #fff;
  color: #fff;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
`;

interface IModal {
  show: boolean;
  message: string;
  setModalShow: any;
}

const WarnModal = (props: IModal) => {
  const toggleModal = () => {
    props.setModalShow(!props.show);
    window.location.href="/login";
  };

  return (
    <StyledModal
      isOpen={props.show}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <MessageContainer>
        <h4>{props.message}</h4>
      </MessageContainer>
      <BtnContainer>
        <CloseBtn onClick={toggleModal}>로그인 하러가기</CloseBtn>
      </BtnContainer>
    </StyledModal>
  );
};

export default WarnModal;
