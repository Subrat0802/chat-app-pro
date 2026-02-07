import { EllipsisVertical, User as UserIcon } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { findPeople } from "../../services/apis/auth/sendRequest";

type ContactUser = {
  name: string;
  username: string;
};

const Contacts = () => {
  const debounceRef = useRef<number | null>(null);

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchUsers, setSearchUsers] = useState<ContactUser[]>([]);

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

  return (
    <div className="p-3 bg-black h-screen flex flex-col">
      <div className="w-full flex justify-between items-center py-3">
        <p className="test-font text-xl text-sky-600">Whatsup</p>
        <EllipsisVertical className="text-white/70" />
      </div>

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
                className="px-3 py-2 hover:bg-gray-800 cursor-pointer transition"
              >
                <p className="text-white font-medium">{user.username}</p>
                <p className="text-sm text-white/60">{user.name}</p>
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
        <div className="flex items-center gap-4 py-2 px-3 rounded-md cursor-pointer hover:bg-gray-900 transition">
          <div className="p-4 bg-gray-700 rounded-full">
            <UserIcon className="text-white" />
          </div>
          <div className="text-white/70 font-semibold flex flex-col">
            <p className="text-lg">Subrat Mishra</p>
            <p className="text-sm">Hi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
