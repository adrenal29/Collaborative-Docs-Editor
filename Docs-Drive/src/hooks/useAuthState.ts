import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signedIn } from "../redux/actions";

function useAuthState() {
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch(signedIn(user));

      if (!done) setDone(true);
    });

    return () => unsubscribe();
  }, [dispatch, done]);

  return done;
}

export default useAuthState;
