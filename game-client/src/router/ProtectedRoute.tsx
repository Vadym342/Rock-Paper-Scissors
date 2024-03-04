import { FC } from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div>
          <h3>You should login to see this page</h3>
        </div>
      )}
    </>
  );
};
