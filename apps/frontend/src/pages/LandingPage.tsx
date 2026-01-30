import CTAComponent from "../components/LandingPageComp/CTAComponent"
import FeatureSection from "../components/LandingPageComp/FeatureSection"
import HeroSection from "../components/LandingPageComp/HeroSection"

const LandingPage = () => {
  return (
    <div className="bg-black text-white/80 w-full min-h-screen max-w-screen overflow-x-hidden">
      <HeroSection />
      <FeatureSection />
      <CTAComponent />
    </div>
  )
}

export default LandingPage