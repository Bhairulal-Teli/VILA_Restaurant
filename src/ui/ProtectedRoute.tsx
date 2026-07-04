import Spinner from "../ui/Spinner";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

const FullPage = styled.div`
  height: 100vh; background-color: var(--color-grey-50);
  display: flex; align-items: center; justify-content: center;
`;

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(function () {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <FullPage><Spinner /></FullPage>;
  if (isAuthenticated) return <>{children}</>;
  return null;
}

export default ProtectedRoute;