import { Check } from "lucide-react"


const CTAComponent = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-center">

            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size-[100px_100px]"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full bg-linear-to-r from-sky-500/20 via-transparent to-purple-800/20 blur-2xl"></div>
            <div className=" p-20 text-center flex justify-center items-center flex-col bg-black shadow-2xl border-t border-white/10 shadow-sky-600 rounded-xl ">
                <p className="text-6xl font-bold mb-2">Ready to experience the</p>
                <p className="text-6xl font-bold mb-5">future of messaging?</p>
                <p className="text-white/50 mb-10">Join millions of users worldwide. Start chatting in seconds with no credit card required.</p>
                <div className="flex gap-3 md:gap-10 mt-7 ml-1">
                    <button className="md:text-xl hover:-translate-y-1 cursor-pointer hover:border-transparent hover:shadow-xs transition-all duration-300 hover:shadow-sky-600 font-semibold p-2 md:p-4 border relative group">GET STARTED FREE
                            <div className="z-10  absolute w-full  opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 bg-sky-600 border-sky-600 bottom-0 left-0">

                            </div>
                        </button> 
                    <button className="md:text-xl cursor-pointer hover:-translate-y-1 hover:border-transparent hover:shadow-xs transition-all duration-300 hover:shadow-sky-600 font-semibold p-2 md:p-4 border relative group">SCHEDULE DEMO
                            <div className="z-10  absolute w-full  opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 bg-sky-600 border-sky-600 bottom-0 left-0">

                            </div>
                        </button> 
                </div>

                <div className="flex justify-around text-sky-600 items-center gap-10 mt-14">
                    <div className="flex gap-2">
                        <Check />
                        <p>Free Forever Plan
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Check />
                        <p>
                            No Credit Card
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Check />
                        <p>
                            Cancel Anytime
                        </p>
                    </div>
                    
                </div>
            </div>
    </div>
  )
}

export default CTAComponent