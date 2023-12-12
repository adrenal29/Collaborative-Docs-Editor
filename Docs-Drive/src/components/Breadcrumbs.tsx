import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../redux/store";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const StyledLink = styled(Link)`
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: underline;
`;

const Breadcrumbs: FC = () => {
  const beforeFolders = useSelector(
    (state: RootState) => state.path.beforeFolders
  );

  return (
    <Container>
      {beforeFolders.map((folder: any, i: number) => (
        <>
          <StyledLink to={folder.isRoot ? "/" : `/folder/${folder.id}`}>
            {folder.name}
          </StyledLink>
          {i < beforeFolders.length - 1 && <span>/</span>}
        </>
      ))}
    </Container>
  );
};

export default Breadcrumbs;
