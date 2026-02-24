import { useSelector } from "react-redux"
import type { RootState } from "../../main"



const Profile = () => {
  const userProfile = useSelector((state: RootState) => state.userState.user);
  const firstChar = userProfile?.name.charAt(0).toUpperCase();
  return (
    <div className="flex justify-center items-center w-full">
      <div className="min-h-[40dvh] w-full  flex flex-col justify-center items-center">
        <div
            className="avatar-glow w-24 h-24 mb-4 rounded-full flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(2,132,199,0.4) 0%, rgba(56,189,248,0.2) 100%)",
            }}
          >
            <span
              className="msg-mono font-bold text-2xl"
              style={{ color: "rgba(56,189,248,0.95)" }}
            >
              {firstChar}
            </span>
          </div>
        <div className="flex justify-cente flex-col items-center">
          <p className="text-white/80">{userProfile?.name}</p>
          <p className="text-white/50">{userProfile?.username}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile