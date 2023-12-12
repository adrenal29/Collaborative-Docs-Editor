import { FC } from "react";
import styled from "styled-components";
import Item, { ItemProps } from "./Item";

const StyledLargeItem = styled(Item)`
  flex-direction: column;
  text-align: center;
  padding: 1em;

  .icon {
    margin-right: 0;
    margin-bottom: 1rem;
    width: 64px;
    height: 64px;
  }
`;

const LargeItem: FC<ItemProps> = ({ children, ...props }) => {
  return <StyledLargeItem {...props}>{children}</StyledLargeItem>;
};

export default LargeItem;
