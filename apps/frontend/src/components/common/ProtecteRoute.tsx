import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../main";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../../services/apis/auth/auth";
import { setUser } from "../../services/redux/slices/authSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userState.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await getMe();

        if (response?.response) {
          dispatch(setUser(response.response));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getResponse();
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen min-w-screen bg-transparent flex justify-center items-center">Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
