import { FC, useState } from "react";
import styled from "styled-components";
import Item from "./Item";

interface OptionProps {
  text: string;
  onClick?: Function;
}

interface Props {
  text: string;
  options: OptionProps[];
}

const Container = styled.div`
  position: relative;
`;

const Button = styled(Item)`
  color: ${({ theme }) => theme.colors.black};
`;

// 0.5em 1.25em
const Content = styled(Item)`
  position: absolute;
  top: calc(100% + 0.3rem);
  left: 0;
  min-width: 200px;
  padding: 0;
  z-index: 1;
  overflow: hidden;
`;

const Option = styled.div`
  padding: 0.5rem 1.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const Dropdown: FC<Props> = ({ text, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Button onClick={() => setOpen(!open)}>{text}</Button>
      {open && (
        <Content>
          {options.map(({ text, onClick }, i) => (
            <Option
              key={i}
              onClick={() => {
                setOpen(false);
                if (onClick) onClick();
              }}
            >
              {text}
            </Option>
          ))}
        </Content>
      )}
    </Container>
  );
};

export default Dropdown;
