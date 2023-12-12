import { User } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import * as actions from "./actionTypes";

export function signedIn(user?: User) {
  return { type: actions.SIGN_IN, payload: { user } };
}

export function signedOut() {
  return { type: actions.SIGN_OUT };
}

export function loadingFinished() {
  return { type: actions.FINISH_LOADING };
}

export function fileModalOpen() {
  return { type: actions.OPEN_FILE_MODAL };
}

export function fileModalClosed() {
  return { type: actions.CLOSE_FILE_MODAL };
}

export function folderModalOpen() {
  return { type: actions.OPEN_FOLDER_MODAL };
}

export function folderModalClosed() {
  return { type: actions.CLOSE_FOLDER_MODAL };
}

export function pathLoadingSet(loading: boolean) {
  return { type: actions.SET_PATH_LOADING, payload: { loading } };
}

export function currentFileSet(file: any) {
  return { type: actions.SET_CURRENT_FILE, payload: { file } };
}

export function currentFileReset() {
  return { type: actions.RESET_CURRENT_FILE };
}

export function currentFileUpdate(fileChanges: any) {
  return { type: actions.UPDATE_CURRENT_FILE, payload: { fileChanges } };
}

export function currentFolderSet(folder: any) {
  return { type: actions.SET_CURRENT_FOLDER, payload: { folder } };
}

export function subfilesSet(subfiles: any[]) {
  return { type: actions.SET_SUBFILES, payload: { subfiles } };
}

export function subfoldersSet(subfolders: any[]) {
  return { type: actions.SET_SUBFOLDERS, payload: { subfolders } };
}

export function beforeFoldersSet(beforeFolders: any[]) {
  return {
    type: actions.SET_BEFORE_FOLDERS,
    payload: { beforeFolders },
  };
}

export function rootFolderSet(rootFolder: any) {
  return { type: actions.SET_ROOT_FOLDER, payload: { rootFolder } };
}

export function fetchCurrentFolder(id: string) {
  return async function (dispatch: any, getState: any) {
    dispatch(pathLoadingSet(true));

    // FETCH CURRENT FOLDER
    const folder = await getDoc(doc(firestore, "folders", id));
    dispatch(currentFolderSet({ id: folder.id, ...folder.data() }));

    const state = getState();

    // FETCH BEFORE FOLDERS
    let currF = state.path.currentFolder;
    const bFolders = [currF];
    while (currF.parentId) {
      const newF = await getDoc(doc(firestore, "folders", currF.parentId));
      const f = { id: newF.id, ...newF.data() };
      bFolders.push(f);
      currF = f;
    }
    dispatch(beforeFoldersSet(bFolders.reverse()));

    // FETCH SUBFILES
    const filesQuery = query(
      collection(firestore, "files"),
      where("ownerId", "==", state.auth.user.uid),
      where("folderId", "==", state.path.currentFolder.id)
    );
    const files = await getDocs(filesQuery);
    dispatch(
      subfilesSet(
        files.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
      )
    );

    // FETCH SUBFOLDERS
    const foldersQuery = query(
      collection(firestore, "folders"),
      where("ownerId", "==", state.auth.user.uid),
      where("parentId", "==", id)
    );
    const folders = await getDocs(foldersQuery);
    dispatch(
      subfoldersSet(
        folders.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );

    dispatch(pathLoadingSet(false));
  };
}

export function fetchCurrentFile(id: string) {
  return async function (dispatch: any, getState: any) {
    dispatch(pathLoadingSet(true));

    // FETCH CURRENT FILE
    const file = await getDoc(doc(firestore, "files", id));
    const fileData = file.data();
    if (!fileData) return;

    dispatch(currentFileSet({ id: file.id, ...fileData }));

    dispatch(fetchCurrentFolder(fileData.folderId));
    // dispatch(pathLoadingSet(false));
  };
}
