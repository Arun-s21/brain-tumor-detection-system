import Link from "next/link";
import { ShieldCheck, Activity, Target } from 'lucide-react';
import AnimatedStatistic from './Component/AnimatedStatistics';
import FadeInContainer from './Component/FadeInContainer';

export default function LandingPage() {
  return (
    <div className="relative w-full flex flex-col font-sans bg-black">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 h-screen w-full">
        {/* The image itself */}
        <div
          className="h-full w-full bg-[url('/background-landingpage.png')] bg-cover bg-center bg-fixed"
        ></div>
        {/* A lighter dark overlay to improve contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 h-screen flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-white"
            style={{ textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}
          >
            Brain Tumor
            <br />
            Classification
          </h1>
          <p 
            className="mt-6 text-xl sm:text-2xl text-white/90"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            Classifying Brain Tumors with AI Precision
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/upload-scans"
              className="w-full sm:w-auto px-8 py-4 bg-green-800 text-white font-semibold uppercase tracking-widest hover:bg-green-700 transition-colors rounded-md shadow-lg"
            >
              Start Analysis
            </Link>
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 border border-gray-500 text-white font-semibold uppercase tracking-widest hover:bg-gray-700 transition-colors rounded-md shadow-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>

      {/* --- NEW SECTIONS START HERE --- */}
      <div className="relative z-10 bg-black py-20">
        {/* Why it Matters Section */}
        <section id="about" className="py-20">
          <FadeInContainer>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">The Critical Danger of Brain Tumors</h2>
                <p className="mt-4 text-lg text-white/70 max-w-3xl mx-auto">Early and accurate diagnosis is paramount as it can dramatically improve patient outcomes and treatment effectiveness.</p>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-700">
                  <ShieldCheck className="h-12 w-12 mx-auto text-green-400" />
                  <h3 className="mt-6 text-xl font-semibold text-white">Improved Prognosis</h3>
                  <p className="mt-2 text-white/70">Detecting tumors early allows for more effective and less invasive treatment options, significantly increasing survival rates.</p>
                </div>
                <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-700">
                  <Activity className="h-12 w-12 mx-auto text-yellow-400" />
                  <h3 className="mt-6 text-xl font-semibold text-white">Reduces Complications</h3>
                  <p className="mt-2 text-white/70">Timely intervention is key to preserving quality of life by preventing irreversible damage to critical brain functions.</p>
                </div>
                <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-700">
                  <Target className="h-12 w-12 mx-auto text-red-400" />
                  <h3 className="mt-6 text-xl font-semibold text-white">Enables Precision Treatment</h3>
                  <p className="mt-2 text-white/70">Accurate classification helps oncologists tailor the most effective treatment plans, from surgery to targeted therapies.</p>
                </div>
              </div>
            </div>
          </FadeInContainer>
        </section>

        {/* Model Statistics Section */}
        <section id="results" className="py-20">
          <FadeInContainer>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Unparalleled Model Performance</h2>
                <p className="mt-4 text-lg text-white/70">Our AI is trained on vast, diverse datasets to achieve world-class accuracy.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl">
                <AnimatedStatistic value={98} label="Detection Accuracy" />
                <AnimatedStatistic value={96} label="Classification Precision" />
                <AnimatedStatistic value={94} label="Tumor Type Identification" />
              </div>
            </div>
          </FadeInContainer>
        </section>
      </div>
      {/* --- NEW SECTIONS END HERE --- */}

     
    </div>
  );
}
