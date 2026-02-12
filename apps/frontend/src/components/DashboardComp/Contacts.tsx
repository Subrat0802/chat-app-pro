import { EllipsisVertical} from "lucide-react";
import ShowAllContacts from "./ShowAllContacts";
import { useSelector } from "react-redux";
import type { RootState } from "../../main";
import Profile from "./Profile";
import Requests from "./Requests";
import Setting from "./Setting";

const Contacts = () => {
  const uiState = useSelector((state: RootState) => state.uiState.activeView);

  return (
    <div className="p-3 bg-black h-screen flex flex-col">
      <div className="w-full flex justify-between items-center py-3">
        <p className="test-font text-xl text-sky-600">Whatsup</p>
        <EllipsisVertical className="text-white/70" />
      </div>

      {uiState === "message" && <ShowAllContacts />}
      {uiState === "profile" && <Profile />}
      {uiState === "requests" && <Requests />}
      {uiState === "setting" && <Setting />}
    </div>
  );
};

export default Contacts;
