import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../../services/apis/auth/auth";
import { setUser } from "../../services/redux/slices/authSlice";

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getMe();
        if (res?.response) {
          dispatch(setUser(res.response));
        }
      } catch {
        // user not logged in
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (checking) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGate;
