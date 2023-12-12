import * as actions from "../actionTypes";

const initialState = {
  fileModalOpen: false,
  folderModalOpen: false,
  loading: true,
  currentFile: {},
  currentFolder: {},
  rootFolder: {},
  subfolders: [],
  subfiles: [],
  beforeFolders: [],
};

function pathReducer(state = initialState, { type, payload }: any) {
  switch (type) {
    case actions.OPEN_FILE_MODAL:
      return { ...state, fileModalOpen: true, folderModalOpen: false };
    case actions.CLOSE_FILE_MODAL:
      return { ...state, fileModalOpen: false, folderModalOpen: false };
    case actions.OPEN_FOLDER_MODAL:
      return { ...state, folderModalOpen: true, fileModalOpen: false };
    case actions.CLOSE_FOLDER_MODAL:
      return { ...state, folderModalOpen: false, fileModalOpen: false };
    case actions.SET_PATH_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };
    case actions.SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: payload.file,
      };
    case actions.RESET_CURRENT_FILE:
      return {
        ...state,
        currentFile: {},
      };
    case actions.UPDATE_CURRENT_FILE:
      return {
        ...state,
        currentFile: { ...state.currentFile, ...payload.fileChanges },
      };
    case actions.SET_CURRENT_FOLDER:
      return {
        ...state,
        currentFolder: payload.folder,
      };
    case actions.SET_SUBFILES:
      return {
        ...state,
        subfiles: payload.subfiles,
      };
    case actions.SET_SUBFOLDERS:
      return {
        ...state,
        subfolders: payload.subfolders,
      };
    case actions.SET_BEFORE_FOLDERS:
      return {
        ...state,
        beforeFolders: payload.beforeFolders,
      };
    case actions.SET_ROOT_FOLDER:
      return {
        ...state,
        rootFolder: payload.rootFolder,
      };
    default:
      return state;
  }
}

export default pathReducer;
