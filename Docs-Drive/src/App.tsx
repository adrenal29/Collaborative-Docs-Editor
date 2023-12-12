import React, { useEffect } from "react";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Loading from "./components/Loading";
import FileModal from "./components/modals/FileModal";
import FolderModal from "./components/modals/FolderModal";
import PrivateRoute from "./components/PrivateRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import useAuthState from "./hooks/useAuthState";
import useRedirectResult from "./hooks/useRedirectResult";
import { loadingFinished } from "./redux/actions";
import { RootState } from "./redux/store";
import GlobalStyle from "./styles/GlobalStyle";
import File from "./views/File";
import Folder from "./views/Folder";
import Home from "./views/Home";
import Profile from "./views/Profile";
import SignIn from "./views/SignIn";

Modal.setAppElement("#root");

function App() {
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const authDone = useAuthState();
  const redirectDone = useRedirectResult();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authDone || !redirectDone) return;

    dispatch(loadingFinished());
  }, [dispatch, authDone, redirectDone]);

  return (
    <>
      {!authLoading ? (
        <>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/folder/:id" component={Folder} />
              <PrivateRoute path="/file/:id" component={File} />
              <PrivateRoute path="/profile" component={Profile} />
              <PublicOnlyRoute path="/sign-in" component={SignIn} />
              <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>
            {loggedIn && (
              <>
                <FileModal />
                <FolderModal />
              </>
            )}
          </Router>
        </>
      ) : (
        <Loading />
      )}
      <GlobalStyle />
    </>
  );
}

export default App;
