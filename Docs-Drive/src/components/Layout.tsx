import { FC } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const Children = styled.div`
  padding: 4rem 0;
  flex: 1;
`;

const Layout: FC = ({ children }) => {
  return (
    <Main>
      <Navbar />
      <Children>{children}</Children>
      <footer>
        <p style={{ textAlign: "center", padding: "0 0 1.5rem" }}>
          &copy; {new Date().getFullYear()} {" "}
        </p>
      </footer>
    </Main>
  );
};

export default Layout;
