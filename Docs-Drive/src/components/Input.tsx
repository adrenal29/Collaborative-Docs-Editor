import { FC } from "react";
import styled from "styled-components";
import Element from "./Element";

const StyledInput = styled(Element)`
  font-family: ${({ theme }) => theme.fontFamilies.body};
  color: ${({ theme }) => theme.colors.black};
  font-size: 1rem;
  padding: 0.5em 1.25em;
`;

const Input: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return <StyledInput as="input" {...props} />;
};

export default Input;
