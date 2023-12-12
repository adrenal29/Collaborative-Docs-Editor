import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../firebase";
import { rootFolderSet } from "../redux/actions";
import { RootState } from "../redux/store";

function useRedirectResult() {
  const [done, setDone] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const rootFolder = useSelector((state: RootState) => state.path.rootFolder);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user || rootFolder.id) return;

      const rootFoldersQuery = query(
        collection(firestore, "folders"),
        where("ownerId", "==", user.uid),
        where("isRoot", "==", true)
      );
      const rootFoldersSnapshot = await getDocs(rootFoldersQuery);
      let root;

      if (rootFoldersSnapshot.empty) {
        const docRef = await addDoc(collection(firestore, "folders"), {
          name: "ROOT",
          ownerId: user.uid,
          parentId: null,
          isRoot: true,
        });
        root = await getDoc(docRef);
      } else {
        root = rootFoldersSnapshot.docs[0];
      }
      dispatch(rootFolderSet({ id: root.id, ...root.data() }));
      // dispatch(fetchCurrentFolder(root.id));
    })();

    if (!done) setDone(true);
  }, [dispatch, user, rootFolder, done]);

  return done;
}

export default useRedirectResult;
