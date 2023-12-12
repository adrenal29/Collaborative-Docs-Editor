import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import Breadcrumbs from "../components/Breadcrumbs";
import FileGrid from "../components/FileGrid";
import FolderList from "../components/FolderList";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import OperationGrid from "../components/OperationGrid";
import Section from "../components/Section";
import { fetchCurrentFolder } from "../redux/actions";
import { RootState } from "../redux/store";

const TopSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Folder = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const subfolders = useSelector((state: RootState) => state.path.subfolders);
  const subfiles = useSelector((state: RootState) => state.path.subfiles);

  useEffect(() => {
    dispatch(fetchCurrentFolder(id));
  }, [id, dispatch]);

  return (
    <Layout>
      <Loading>
        <TopSection>
          <Breadcrumbs />
          <OperationGrid compact={true} />
        </TopSection>
        <Section>
          <h3 style={{ marginBottom: "1.5rem" }}>Folders</h3>
          <FolderList items={subfolders} />
        </Section>
        <Section>
          <h3 style={{ marginBottom: "1.5rem" }}>Files</h3>
          <FileGrid items={subfiles} />
        </Section>
      </Loading>
    </Layout>
  );
};

export default Folder;
