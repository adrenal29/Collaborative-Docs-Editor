import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Item from "../components/Item";
import Layout from "../components/Layout";
import { auth } from "../firebase";
import { signedOut } from "../redux/actions";
import { RootState } from "../redux/store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  function signOut() {
    dispatch(signedOut());
    auth.signOut();
  }

  return (
    <Layout>
      <Container>
        <img
          src={user.photoURL}
          alt="Avatar"
          width="48"
          height="48"
          style={{ borderRadius: "50%" }}
        />
        <p>
          Name: <strong>{user.displayName}</strong>
        </p>
        <p>
          E-mail: <strong>{user.email}</strong>
        </p>
        <Item onClick={signOut} primary>
          Sign out
        </Item>
      </Container>
    </Layout>
  );
};

export default Profile;
