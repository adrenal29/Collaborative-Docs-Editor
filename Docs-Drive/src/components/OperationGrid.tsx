import { addDoc, collection } from "@firebase/firestore";
import { FC } from "react";
import { FaFileMedical, FaFileUpload, FaFolderPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { firestore } from "../firebase";
import { fileModalOpen, folderModalOpen } from "../redux/actions";
import { RootState } from "../redux/store";
import { uploadFile } from "../utils/uploadFile";
import Item from "./Item";

interface Props {
  compact: boolean;
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CompactContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const OperationGrid: FC<Props> = ({ compact }) => {
  const userId = useSelector((state: RootState) => state.auth.user.uid);
  const currentFolder = useSelector(
    (state: RootState) => state.path.currentFolder
  );
  const dispatch = useDispatch();
  const history = useHistory();

  async function addFile(name: string, content: string) {
    const { id } = await addDoc(collection(firestore, "files"), {
      name,
      ownerId: userId,
      folderId: currentFolder.id,
      content,
    });
    history.push(`/file/${id}`);
  }

  if (compact)
    return (
      <CompactContainer>
        <Item onClick={() => dispatch(fileModalOpen())} primary>
          <FaFileMedical size={24} />
        </Item>
        <Item onClick={() => dispatch(folderModalOpen())} primary>
          <FaFolderPlus size={24} />
        </Item>
        <Item onClick={() => uploadFile(addFile)} primary>
          <FaFileUpload size={24} />
        </Item>
      </CompactContainer>
    );

  return (
    <Container>
      <Item
        icon={FaFileMedical}
        onClick={() => dispatch(fileModalOpen())}
        primary
      >
        New file
      </Item>
      <Item
        icon={FaFolderPlus}
        onClick={() => dispatch(folderModalOpen())}
        primary
      >
        New folder
      </Item>
      <Item icon={FaFileUpload} onClick={() => uploadFile(addFile)} primary>
        Upload file
      </Item>
    </Container>
  );
};

export default OperationGrid;
