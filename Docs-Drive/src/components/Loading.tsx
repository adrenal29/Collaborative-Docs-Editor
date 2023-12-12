import { FC, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import { RootState } from "../redux/store";

const Container = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled(FaSpinner)`
  @keyframes spinning {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: spinning 4s infinite linear;
`;

const Loading: FC = ({ children }) => {
  const [delayDone, setDelayDone] = useState(false);
  const loading = useSelector((state: RootState) => state.path.loading);

  useDebounce(
    () => {
      setDelayDone(true);
    },
    100,
    []
  );

  return (
    <>
      {!delayDone || loading ? (
        <Container>
          <Spinner size={64} />
          <span>Loading</span>
        </Container>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
