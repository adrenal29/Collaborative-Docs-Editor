import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileGrid from "../components/FileGrid";
import FolderList from "../components/FolderList";
import Item from "../components/Item";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import OperationGrid from "../components/OperationGrid";
import Section from "../components/Section";
import { fetchCurrentFolder } from "../redux/actions";
import { RootState } from "../redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const rootFolderId = useSelector(
    (state: RootState) => state.path.rootFolder.id
  );
  const subfolders = useSelector((state: RootState) => state.path.subfolders);
  const subfiles = useSelector((state: RootState) => state.path.subfiles);

  useEffect(() => {
    if (!rootFolderId) return;

    dispatch(fetchCurrentFolder(rootFolderId));
  }, [dispatch, rootFolderId]);

  return (
    <Layout>
      {loggedIn ? (
        <Loading>
          <Section>
            <h1 style={{ marginBottom: "5rem" }}>Your drive</h1>
            <h5 style={{ marginBottom: "1.5rem" }}>Quick actions</h5>
            <OperationGrid compact={false} />
          </Section>
          <Section>
            <h5 style={{ marginBottom: "1.5rem" }}>Folders</h5>
            <FolderList items={subfolders} />
          </Section>
          <Section>
            <h5 style={{ marginBottom: "1.5rem" }}>Files</h5>
            <FileGrid items={subfiles} />
          </Section>
        </Loading>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "1.5rem" }}>
            Create, write, edit, export{" "}
          </h1>
          <p style={{ marginBottom: "4rem" }}>
            Use Docs Drive directly in your browser and save it in cloud
            database with no need to save it manually!
          </p>
          <Item to="/sign-in" primary>
            Sign in
          </Item>
        </div>
      )}
    </Layout>
  );
};

export default Home;
