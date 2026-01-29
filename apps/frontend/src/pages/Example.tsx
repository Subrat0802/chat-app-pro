import  { useState, useEffect } from 'react';

// Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl">⚡</span>
          </div>
          <span className="text-2xl font-black tracking-tighter bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            VOLTCHAT
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors font-semibold uppercase text-sm tracking-wider">
            Features
          </a>
          <a href="#pricing" className="text-gray-400 hover:text-cyan-400 transition-colors font-semibold uppercase text-sm tracking-wider">
            Pricing
          </a>
          <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors font-semibold uppercase text-sm tracking-wider">
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-400/10 transition-all font-bold uppercase text-sm tracking-wide">
            Sign In
          </button>
          <button className="px-5 py-2 bg-linear-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-bold uppercase text-sm tracking-wide">
            Start Free
          </button>
        </div>
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size-[100px_100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">Now Live</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight">
            <span className="text-white">Chat at the</span>
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Speed of Light
            </span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
            Experience ultra-fast messaging with military-grade encryption. 
            Connect instantly, share freely, communicate securely.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="group px-8 py-4 bg-linear-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-bold text-lg uppercase tracking-wide hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-1">
              Launch App
              <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </button>
            <button className="px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-cyan-500/10 transition-all flex items-center gap-2">
              <span className="w-0 h-0 border-l-8 border-l-cyan-400 border-y-6 border-y-transparent"></span>
              Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-black bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">5M+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Active Users</div>
            </div>
            <div className="w-px h-12 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <div className="text-center">
              <div className="text-3xl font-black bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">100M+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Messages/Day</div>
            </div>
            <div className="w-px h-12 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <div className="text-center">
              <div className="text-3xl font-black bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">99.99%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Uptime</div>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative">
          <div className="relative w-full max-w-md mx-auto">
            {/* Chat Window */}
            <div className="bg-linear-to-r from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
              {/* Chat Header */}
              <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-cyan-400 to-purple-600"></div>
                  <div>
                    <div className="font-bold text-white">Alex Rivera</div>
                    <div className="text-xs text-cyan-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                      Online
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-4 h-80 overflow-hidden">
                <div className="flex justify-start animate-slide-in">
                  <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl rounded-tl-sm p-4 max-w-xs border border-cyan-500/20">
                    <p className="text-gray-300">Hey! Ready to try the new chat?</p>
                  </div>
                </div>
                
                <div className="flex justify-end animate-slide-in" style={{animationDelay: '0.3s'}}>
                  <div className="bg-linear-to-r from-cyan-500 to-purple-600 rounded-2xl rounded-tr-sm p-4 max-w-xs shadow-lg shadow-cyan-500/30">
                    <p className="text-white font-medium">Absolutely! The speed is incredible ⚡</p>
                  </div>
                </div>

                <div className="flex justify-start animate-slide-in" style={{animationDelay: '0.6s'}}>
                  <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl rounded-tl-sm p-4 max-w-xs border border-cyan-500/20">
                    <p className="text-gray-300">And the encryption is top-notch 🔒</p>
                  </div>
                </div>

                <div className="flex justify-end animate-slide-in" style={{animationDelay: '0.9s'}}>
                  <div className="bg-linear-to-r from-cyan-500 to-purple-600 rounded-2xl rounded-tr-sm p-4 max-w-xs shadow-lg shadow-cyan-500/30">
                    <p className="text-white font-medium">Best chat experience ever! 🚀</p>
                  </div>
                </div>

                {/* Typing Indicator */}
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

            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-linear-to-r from-cyan-400/20 to-purple-600/20 rounded-2xl backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center animate-float">
              <span className="text-4xl">⚡</span>
            </div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-linear-to-r from-purple-600/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-500/30 flex items-center justify-center animate-float" style={{animationDelay: '1s'}}>
              <span className="text-4xl">🔒</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Messages delivered in microseconds with our edge network spanning 150+ locations globally.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: '🔒',
      title: 'Military-Grade Security',
      description: 'End-to-end encryption with zero-knowledge architecture. Your data, your privacy.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: '🎨',
      title: 'Rich Media',
      description: 'Share 4K images, videos, documents, and voice notes with instant preview and playback.',
      gradient: 'from-pink-500 to-red-600'
    },
    {
      icon: '🌐',
      title: 'Universal Platform',
      description: 'Seamless sync across web, iOS, Android, Windows, Mac, and Linux. One account, all devices.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Smart compose, real-time translation, message summarization, and intelligent search.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: '👥',
      title: 'Team Spaces',
      description: 'Unlimited channels, screen sharing, voice/video calls, and collaborative workspaces.',
      gradient: 'from-orange-500 to-yellow-600'
    }
  ];

  return (
    <section id="features" className="relative py-32 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full mb-6">
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">Features</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Everything you need to</span>
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              communicate better
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powerful features designed for modern teams and individuals who demand the best.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-linear-to-r from-gray-900/50 to-black/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
              style={{
                animation: 'fade-in-up 0.6s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {/* Gradient glow effect */}
              <div className={`absolute inset-0 bg-linear-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative">
                <div className={`w-16 h-16 bg-linear-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CTA = () => {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(6,182,212,0.05)_2px,transparent_2px)] bg-size-[50px_50px]"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full bg-linear-to-r from-cyan-500/20 via-transparent to-purple-500/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="bg-linear-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <div className="text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-black leading-tight">
              <span className="text-white">Ready to experience the</span>
              <br />
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                future of messaging?
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join millions of users worldwide. Start chatting in seconds with no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button className="group px-10 py-5 bg-linear-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-bold text-lg uppercase tracking-wide hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-1">
                Get Started Free
                <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </button>
              <button className="px-10 py-5 border-2 border-cyan-500/50 text-cyan-400 rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-cyan-500/10 transition-all">
                Schedule Demo
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Free Forever Plan</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-cyan-500/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">⚡</span>
            </div>
            <span className="text-2xl font-black tracking-tighter bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              VOLTCHAT
            </span>
          </div>
          <p className="text-gray-500">
            © 2024 VoltChat. Redefining communication at lightspeed.
          </p>
        </div>
      </div>
    </section>
  );
};

// Main App Component
export default function Example() {
  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Exo 2', sans-serif;
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbar but keep functionality */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #000;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #06b6d4, #9333ea);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #0891b2, #7e22ce);
        }
      `}</style>

      <Header />
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}