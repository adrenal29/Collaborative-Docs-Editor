import { FC } from "react";
import { FaFolder, FaFolderPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { folderModalOpen } from "../redux/actions";
import Item from "./Item";

interface Props {
  items: { id: string; name: string }[];
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FolderList: FC<Props> = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      {items.length ? (
        items.map(({ id, name }) => (
          <Item
            key={id}
            to={`/folder/${id}`}
            icon={FaFolder}
            style={{ minWidth: "180px", maxWidth: "320px" }}
          >
            {name}
          </Item>
        ))
      ) : (
        <Item
          onClick={() => dispatch(folderModalOpen())}
          icon={FaFolderPlus}
          style={{ minWidth: "180px", maxWidth: "320px" }}
          primary
        >
          Create first folder
        </Item>
      )}
    </Container>
  );
};

export default FolderList;
