import { FC } from "react";
import styled from "styled-components";
import Input from "./Input";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  inputProps?: React.HTMLProps<HTMLInputElement>;
}

const Label = styled.label`
  display: block;
  margin-bottom: 0.15rem;
`;

const Field: FC<Props> = ({ label, inputProps, ...props }) => {
  return (
    <div {...props}>
      <Label>{label}</Label>
      <Input {...inputProps} />
    </div>
  );
};

export default Field;
