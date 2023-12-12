import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../redux/store";
import Element from "./Element";
import Item from "./Item";

const StyledNavbar = styled(Element)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: ${({ theme }) => `1.25rem ${theme.horizontalPadding}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledList = styled.div({
  display: "none",
  fontWeight: "bold",

  "@media (min-width: 768px)": {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
});

const Navbar = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <StyledNavbar>
      <Link to="/">
        <h5>Docs Drive</h5>
      </Link>
      <StyledList>
        {loggedIn ? (
          <Link to="/profile">{user.displayName}</Link>
        ) : (
          <>
            <Item to="/sign-in" primary>
              Sign in
            </Item>
          </>
        )}
      </StyledList>
    </StyledNavbar>
  );
};

export default Navbar;
