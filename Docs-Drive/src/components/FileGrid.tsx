import { FC } from "react";
import { FaFile, FaFileMedical } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fileModalOpen } from "../redux/actions";
import LargeItem from "./LargeItem";

interface Props {
  items: { id: string; name: string }[];
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FileGrid: FC<Props> = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      {items.length ? (
        items.map(({ id, name }) => (
          <LargeItem
            key={id}
            to={`/file/${id}`}
            icon={FaFile}
            style={{ minWidth: "160px" }}
          >
            {name}
          </LargeItem>
        ))
      ) : (
        <LargeItem
          onClick={() => dispatch(fileModalOpen())}
          icon={FaFileMedical}
          primary
        >
          Create first file
        </LargeItem>
      )}
    </Container>
  );
};

export default FileGrid;
