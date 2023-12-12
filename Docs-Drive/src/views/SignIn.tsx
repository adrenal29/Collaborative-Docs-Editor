import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import styled from "styled-components";
import Item from "../components/Item";
import Layout from "../components/Layout";
import { auth } from "../firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
  function handleSignInWithGoogle() {
    signInWithRedirect(auth, googleProvider);
  }

  return (
    <Layout>
      <Container>
        <h1 style={{ marginBottom: "5rem" }}>Sign in</h1>
        <Item icon={FaGoogle} primary onClick={handleSignInWithGoogle}>
          Sign in with Google
        </Item>
      </Container>
    </Layout>
  );
};

export default SignIn;
