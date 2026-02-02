import featureData from "../../data/featureData.json";
import { Zap, ShieldCheck, Image, Globe, Bot, Users } from "lucide-react";


const iconMap = { Zap, ShieldCheck, Image, Globe, Bot, Users };


const FeatureSection = () => {
  return (
    <div className="min-h-20 py-20">
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center">
            <div className="text-center">
                <p className="text-3xl font-bold text-sky-600 mb-10">Features</p>
                <p className="text-6xl font-bold">Everything you need to</p>
                <p className="text-6xl font-bold bg-linear-to-r from-sky-700 pb-4 via-sky-400 to-sky-300 bg-clip-text text-transparent ">communicate better</p>
                <p className="text-lg w-fit pb-14 text-white/50">Powerful features designed for modern teams and individuals who demand the best.</p>
            </div>

            <div className="w-full grid grid-cols-3 gap-8 mt-10">
                {
                    featureData.features.map((el) => {
                        const Icon = iconMap[el.icon as keyof typeof iconMap];

                        return <div key={el.id}  className="border bg-gray-400/10 border-white/10  rounded-xl text-center p-6 px-5 hover:-translate-y-2 transition-all hover:border-sky-600 duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                            <div className="text-start mb-5 bg-gray-400/20 w-fit p-5 rounded-2xl">
                                <Icon />
                            </div>
                            <p className="text-2xl font-bold mb-6 ">{el.title}</p>
                            <p className="text-lg text-white/60">{el.description}</p>
                        </div>
                    }
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default FeatureSection