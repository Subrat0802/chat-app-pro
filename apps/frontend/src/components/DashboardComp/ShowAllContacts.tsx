import { User as UserIcon } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { findPeople, getAllFriends, openConvo, sendRequest } from "../../services/apis/auth/sendRequest";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMsg, startLoading } from "../../services/redux/slices/currentMessage";
import type { RootState } from "../../main";

type ContactUser = {
  id: string,
  name: string;
  username: string;
};

const ShowAllContacts = () => {

  const debounceRef = useRef<number | null>(null);

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchUsers, setSearchUsers] = useState<ContactUser[]>([]);
  const [allFriends, setAllFrineds] = useState<ContactUser[]>([]);
  console.log("allfriends", allFriends);
  const currentConvoFriend = useSelector((state: RootState) => state.msgState.currentConversation?.user1Id);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (value == null) {
        setSearchText("");
      }
      if (!value.trim()) {
        setSearchUsers([]);
        return;
      }

      try {
        const response = await findPeople(value);
        if (!response) return;

        setSearchUsers(response.data.response);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500);
  };


  const handleSendRequest = (id: string) => {
    try{
      sendRequest(id);
    }catch(e){
      toast.error("Error while sending request")
      console.log(e);
    }
  }


  useEffect(() => {
    async function getAllFriend() {
        const response = await getAllFriends();
        console.log(response);
        setAllFrineds(response);
    }
    getAllFriend();
  }, []);

  const handleOpenConvo = async (friendId: string) => {
    dispatch(startLoading())
    // console.log("Frinednid", friendId);
    const response = await openConvo(friendId);
    // console.log("FROENDSIDE CONVO", response.conversation);
    dispatch(setCurrentMsg(response.conversation));
  }

  return (
    <>
      <div className="relative w-full py-2">
        <input
          value={searchText}
          onChange={handleChange}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setTimeout(() => setIsSearching(false), 200)}
          className="bg-neutral-secondary-medium text-md border border-white/20 
                     rounded block w-full px-3 py-2.5 text-white 
                     focus:border-sky-600 focus:outline-none transition-all"
          placeholder="Search friends"
        />

        {isSearching && searchUsers.length > 0 && (
          <div className="absolute w-full mt-1 bg-gray-900 rounded-md shadow-lg z-50">
            {searchUsers.map((user) => (
              <div
                key={user.username}
                className="px-3 py-2 flex justify-start gap-2 items-center hover:bg-gray-800 cursor-pointer transition"
              >
                <div className="flex gap-3 justify-start w-[70%] items-center">
                  <div className=" p-4 bg-gray-700 rounded-full ">
                  <UserIcon className="text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-white font-medium">{user.username}</p>
                  <p className="text-sm text-white/60">{user.name}</p>
                </div>
                </div>
                
                <div onClick={() => handleSendRequest(user.id)} className="flex-4  flex justify-center items-center p-1 py-2 cursor-pointer text-xs rounded-full bg-gray-950/50 hover:bg-sky-600 transition-all duration-200 ">
                  <button className="flex justify-end cursor-pointer">Send Request</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isSearching && searchText && searchUsers.length === 0 && (
          <div className="absolute w-full mt-1 bg-gray-900 rounded-md px-3 py-2 text-sm text-white/50">
            No users found
          </div>
        )}
      </div>

      <div className="pt-2 flex-1 overflow-y-auto scroll-smooth bg-gray-800/10">
      {
        allFriends.length == 0 ? <p>No frineds</p> : allFriends.map((el) => (
            <div key={el.id} onClick={() => handleOpenConvo(el.id)} className={`flex items-center gap-4 py-2 px-3 rounded-md cursor-pointer hover:bg-gray-900 transition-all duration-300 ${currentConvoFriend === el.id && "bg-gray-900"}`}>
          <div className="p-4 bg-gray-700 rounded-full">
            <UserIcon className="text-white" />
          </div>
          <div className="text-white/70 font-semibold flex flex-col">
            <p className="text-lg">{el.username}</p>
            <p className="text-sm">Hi</p>
          </div>
        </div>
        )) 
      }
        
      </div>
    </>
  )
}

export default ShowAllContacts