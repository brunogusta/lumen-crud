import styled, { keyframes } from 'styled-components';
import Select from 'react-select';

import BaseAnimation from '../../../../utils/Animations/baseAnimation';
import { SendButton } from '../../../../utils/Animations/button';

const FadeInAnimation = keyframes`
from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Container = styled(BaseAnimation)`
  display: grid;
  height: 100%;
  position: relative;

  grid-template-columns: repeat(2, minmax(440px, 1fr));
  grid-template-rows: 1fr;
  grid-template-areas: 'formik result';
  column-gap: 15px;

  animation-name: ${FadeInAnimation};
`;

export const FormContainer = styled.div`
  display: flex;
  grid-area: formik;
  flex-direction: column;
  height: 100%;
  max-height: 57vh;

  padding: 10px 0px 0px 0px;

  h3 {
    color: #464646;
  }

  overflow-y: auto;
`;

export const SearchTitle = styled.div`
  border-bottom: 2px solid #b1b1b1;
  padding-bottom: 3px;
  color: #464646;
`;

export const Form = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const EmailInput = styled.input`
  margin-top: 5vh;
  width: 100%;
  border: none;
  border-bottom: 2px solid #f38bd1;
  font-size: 17px;
`;

export const NameInput = styled.input`
  margin-top: 5vh;
  width: 100%;
  border: none;
  border-bottom: 2px solid #f38bd1;
  font-size: 17px;
`;

export const PassInput = styled.input`
  margin-top: 5vh;
  width: 100%;
  border: none;
  border-bottom: 2px solid #f38bd1;
  font-size: 17px;
`;

export const DropDawnInput = styled(Select)`
  margin-top: 20px;

  div {
    border: none;
    cursor: pointer;
  }
  .css-yk16xz-control {
    border-bottom: 2px solid #f38bd1;
  }
  .css-1hwfws3 {
    padding: 0;
  }
`;

export const GetPerfilsButton = styled(SendButton)`
  background-color: #ccc;
  margin-top: 30px;
  font-size: 20px;

  &:active {
    background-color: #444;
  }
`;
export const NewUserButton = styled(SendButton)`
  margin-top: 10px;
  font-size: 20px;

  &:active {
    background-color: ${props => (props.disabled ? '' : '#d741a6')};
  }
`;

export const ResultsContainer = styled.div`
  grid-area: result;
  display: flex;
  flex-direction: column;
  padding: 10px 0px 0px 0px;

  div:first-child {
    border-bottom: 2px solid #b1b1b1;
    padding-bottom: 3px;

    h3 {
      color: #464646;
    }
  }
`;

export const TextError = styled.p`
  font-weight: 100;
  color: #ea003f;
`;

export const UserDataBox = styled.div`
  border: 1px solid #ccc;
  width: 40vw;
  padding: 15px;

  margin: 20px auto;
`;

export const RequestTextError = styled.div`
  display: flex;
  margin-top: 10px;
  background-color: #ea003f;
  padding: 10px;
  justify-content: center;
  align-items: center;

  p {
    font-weight: bold;
    color: #fff;
  }
`;

export const PerfilBox = styled.div`
  margin-top: 3px;
  padding: 3px;
  border: 1px solid #f38bd1;
`;
