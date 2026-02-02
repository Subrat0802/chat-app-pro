import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

export const PublicLayout = () => {
//   const { user, loading } = useSelector((state: RootState) => state.userState);

//   if (loading) {
//     return null; 
//   }

//   if (user) {
//     return <Navigate to="/dashboard" replace />;
//   }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
