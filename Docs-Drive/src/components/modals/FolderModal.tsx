import { addDoc, collection } from "@firebase/firestore";
import { FC, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { firestore } from "../../firebase";
import { folderModalClosed } from "../../redux/actions";
import { RootState } from "../../redux/store";
import Field from "../Field";
import Form from "../Form";
import Item from "../Item";

const FolderModal: FC = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const folderModalOpen = useSelector(
    (state: RootState) => state.path.folderModalOpen
  );
  const currentFolder = useSelector(
    (state: RootState) => state.path.currentFolder
  );
  const userId = useSelector((state: RootState) => state.auth.user.uid);
  const history = useHistory();

  function handleClose() {
    setName("");
    dispatch(folderModalClosed());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentFolder.id) return;

    const { id } = await addDoc(collection(firestore, "folders"), {
      name,
      ownerId: userId,
      parentId: currentFolder.id,
      isRoot: false,
    });
    history.push(`/folder/${id}`);
    // const doc = await getDoc(docRef);
    // dispatch(fetchCurrentFolder(docRef.id));

    handleClose();
  }

  return (
    <Modal isOpen={folderModalOpen} onRequestClose={handleClose}>
      <Form onSubmit={handleSubmit}>
        <h5>New Folder</h5>
        <Field
          label="Folder name"
          inputProps={{
            value: name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value),
          }}
        />
        <Item onClick={() => {}} primary>
          Create folder
        </Item>
      </Form>
    </Modal>
  );
};

export default FolderModal;
