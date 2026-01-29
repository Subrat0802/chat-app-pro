import { ChevronDown } from "lucide-react"

const HeroSection = () => {
  return (
    <div className="w-full min-h-screen flex pt-16 relative max-w-7xl mx-auto ">
      <div className="inset-0">
        <div className="absolute top-20 left-30 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-90 h-90 bg-sky-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size-[100px_100px]"></div>
      </div>
      
      <div className="w-[50%]  border-white  flex  flex-col justify-center pr-14">
        <div className="inline-flex items-center border-2 gap-2 mb-6 p-3 px-4 border-white/30 rounded-full w-fit">
          <span className="animate-pulse p-1 rounded-full bg-sky-600"></span>
          <span>Live Now</span>
        </div>
        <p className="text-7xl font-extrabold bg-linear-to-r ">Chat at the </p>
        <p className="bg-linear-to-r from-sky-600 pb-4 via-blue-200 to-purple-200 bg-clip-text text-transparent animate-gradient text-7xl font-extrabold ">Speed of light</p>
        <p className="text-gray-200/50 mt-2 text-xl">Experience ultra-fast messaging with military-grade encryption. Connect instantly, share freely, communicate securely.</p>
        <div className="flex gap-10 mt-7 ml-1">
          <button className="text-xl font-semibold p-4 border">Explore</button> 
          <button className="text-xl font-semibold p-4 border">Watch Demo</button> 
        </div>
        
      </div>
      <div className="w-[50%] flex justify-center items-center pl-14">
        <div className="border border-white/20 shadow-2xl p-7 w-full rounded-2xl">
          <div className="flex justify-between items-center">
            {/* top bar  */}
            <div className="flex flex-col w-full">

              <div className="w-full pb-4 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="bg-linear-to-r from-sky-500 via-cyan-600 to-purple-900  rounded-full p-5"></span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg ml-3 text-white/80">Joe</span>
                    <div className="inline-flex gap-2 items-center ml-3">
                      <span className="p-1 rounded-full animate-pulse bg-sky-600 "></span>
                      <span className="text-xs text-white/60">Online</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                  <span className="bg-red-500 rounded-full p-2"></span>
                  <span className="bg-green-500 rounded-full p-2"></span>
                  <span className="bg-yellow-500 rounded-full p-2"></span>
                </div>
                </div>
                
              </div>

              
              
              
            </div>

            
          </div>
          {/* chat  */}
            <div className="w-full min-h-20 flex flex-col gap-2  mt-2 overflow-hidden">
              <div className="flex justify-start animate-slide-in">
                  <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl rounded-tl-xs p-4 max-w-xs border border-cyan-500/20">
                    <p className="text-gray-300">Hey! Ready to try the new chat?</p>
                  </div>
                </div>
                <div className="flex justify-end animate-slide-in">
                  <div className="bg-linear-to-br from-sky-800 to-sky-900 rounded-2xl rounded-br-xs p-4 max-w-xs border border-cyan-500/20">
                    <p className="text-gray-300">Hey! Ready to try the new chat?</p>
                  </div>
                </div>
                <div className="flex justify-start animate-slide-in">
                  <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl rounded-tl-xs p-4 max-w-xs border border-cyan-500/20">
                    <p className="text-gray-300">Hey! Ready to try the new chat?</p>
                  </div>
                </div>
                <div className="flex justify-end animate-slide-in">
                  <div className="bg-linear-to-br from-sky-800 to-sky-900 rounded-2xl rounded-br-xs p-4 max-w-xs border border-cyan-500/20">
                    <p className="text-gray-300">Hey! Ready to try the new chat?</p>
                  </div>
                </div>
                <div className="flex justify-start animate-slide-in" style={{animationDelay: '1.2s'}}>
                  <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl rounded-tl-sm p-4 border border-cyan-500/20">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
      <div className="bottom-0 absolute left-1/2 -translate-x-[50%] animate-bounce ">
        <ChevronDown />
      </div>
    </div>
  )
}

export default HeroSection