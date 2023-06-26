import styled from '@emotion/styled';
import { MdContacts, MdOutlineContacts } from 'react-icons/md';

export const HomeWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-top: 20px;
`;

export const AppLogo = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
`;

export const ContactsLogo1 = styled(MdContacts)`
  position: absolute;
  top: 0;
  left: 0;
  animation: slideIcon 6s infinite;
  fill: #1976d2;

  @keyframes slideIcon {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    50% {
      transform: translateY(0%);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`;

export const ContactsLogo2 = styled(MdOutlineContacts)`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  animation: slideIcon 6s infinite 3s;
  fill: #1976d2;
`;
