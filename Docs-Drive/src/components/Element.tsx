import styled from "styled-components";

const Element = styled.div<{ primary?: boolean; hoverable?: boolean }>`
  background-color: ${({ theme, primary = false }) =>
    primary ? theme.colors.primary : theme.colors.backgroundLight};
  color: ${({ theme, primary = false }) =>
    primary && theme.colors.backgroundLight};
  border-radius: 0.25rem;
  border: none;
  outline: none;
  cursor: ${({ hoverable = false }) => (hoverable ? "pointer" : "auto")};
`;

export default Element;
