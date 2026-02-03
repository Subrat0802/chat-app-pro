const Messages = () => {
  return (
    <div className="relative w-full h-full bg-sky-700/10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_2px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_2px,transparent_2px)] bg-size-[100px_100px]"></div>

      <div className="absolute bottom-0 w-full text-lg p-4 grid grid-cols-11 items-center gap-2">
        <input
          className="col-span-10 border border-white/20 px-3 py-4 rounded focus:outline-none focus:ring-0 focus:border-sky-600  transition-all duration-200"
          placeholder="Type a message..."
        />
        <button className="col-span-1 bg-sky-600/80 text-white py-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
