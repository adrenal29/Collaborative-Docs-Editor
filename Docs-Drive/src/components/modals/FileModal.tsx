import { addDoc, collection } from "@firebase/firestore";
import { FC, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { firestore } from "../../firebase";
import { fileModalClosed } from "../../redux/actions";
import { RootState } from "../../redux/store";
import Field from "../Field";
import Form from "../Form";
import Item from "../Item";

const FileModal: FC = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const fileModalOpen = useSelector(
    (state: RootState) => state.path.fileModalOpen
  );
  const currentFolder = useSelector(
    (state: RootState) => state.path.currentFolder
  );
  const userId = useSelector((state: RootState) => state.auth.user.uid);
  const history = useHistory();

  function handleClose() {
    setName("");
    dispatch(fileModalClosed());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentFolder.id) return;

    const { id } = await addDoc(collection(firestore, "files"), {
      name,
      ownerId: userId,
      folderId: currentFolder.id,
      content: "Welcome to new file",
    });
    history.push(`/file/${id}`);

    handleClose();
  }

  return (
    <Modal isOpen={fileModalOpen} onRequestClose={handleClose}>
      <Form onSubmit={handleSubmit}>
        <h5>New file</h5>
        <Field
          label="File name"
          inputProps={{
            value: name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value),
          }}
        />
        <Item onClick={() => {}} primary>
          Create file
        </Item>
      </Form>
    </Modal>
  );
};

export default FileModal;
