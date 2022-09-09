import React from 'react';
import styled from 'styled-components';
import { color as cl } from '../constants/color';

type Props = {
  children?: React.ReactNode | string,
  style?: object,
  onClick: () => unknown
}

const StyledButton = styled.button`
    border-radius: 8px;
    color: ${cl.orange[1]};
    background-color: ${cl.background};
    padding: 5px 10px;
`;

export const ButtonStd: React.FunctionComponent<Props> = ({
  children,
  onClick
}) => {
  return (
    <StyledButton onClick={onClick}>{children}</StyledButton>
  );
};