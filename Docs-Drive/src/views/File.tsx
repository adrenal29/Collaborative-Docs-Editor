import { doc, updateDoc } from "@firebase/firestore";
import { Delta, Sources } from "quill";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import Breadcrumbs from "../components/Breadcrumbs";
import Dropdown from "../components/Dropdown";
import Element from "../components/Element";
import Input from "../components/Input";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { firestore } from "../firebase";
import useDebounce from "../hooks/useDebounce";
import { currentFileUpdate, fetchCurrentFile } from "../redux/actions";
import { RootState } from "../redux/store";
import { exportToHtml, exportToRtf, exportToTxt } from "../utils/exportToFiles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledEditor = styled(Element)`
  > * {
    border: none !important;
  }

  .ql-toolbar {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey} !important;
  }
`;

const File = () => {
  const { id } = useParams<{ id: string }>();
  // const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();
  const { name, content } = useSelector(
    (state: RootState) => state.path.currentFile
  );

  const exportOptions = [
    {
      text: "Rich Text File (.rtf)",
      onClick: () => exportToRtf(name, content),
    },
    {
      text: "Text File (.txt)",
      onClick: () => exportToTxt(name, content),
    },
    {
      text: "HTML File (.html)",
      onClick: () => exportToHtml(name, content),
    },
  ];

  useDebounce(
    () => {
      updateDoc(doc(firestore, "files", id), { name, content }).then(() => {
        setUpdating(false);
      });
    },
    500,
    []
  );

  useEffect(() => {
    setUpdating(true);
  }, [name, content]);

  useEffect(() => {
    dispatch(fetchCurrentFile(id));
  }, [id, dispatch]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(currentFileUpdate({ name: e.target.value }));
  }

  function handleContentChange(
    content: string,
    delta: Delta,
    sources: Sources,
    editor: any
  ) {
    // const contents = editor.getContents();
    dispatch(currentFileUpdate({ content }));
  }

  return (
    <Layout>
      <Loading>
        <Container>
          <Breadcrumbs />
          <p style={{ marginTop: "2rem" }}>
            {updating ? "Saving changes..." : "Changes saved"}
          </p>
          <Toolbar>
            <Input
              placeholder="Enter file name..."
              value={name || ""}
              onChange={handleNameChange}
            />
            <Dropdown text="Export as" options={exportOptions} />
          </Toolbar>
          <StyledEditor
            as={ReactQuill}
            value={content || ""}
            onChange={handleContentChange}
          />
        </Container>
      </Loading>
    </Layout>
  );
};

export default File;
