import { Link } from "react-router-dom";
import {
  Sparkles,
  Brain,
  Zap,
  ArrowRight,
  Github,
  Twitter,
  Origami,
} from "lucide-react";
import Navbar from "../components/Navbar";
function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif italic mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
            Learn & Teach Without Limits
          </h1>
          <p className="text-xl text-stone-800 mb-8 max-w-2xl mx-auto">
            Empower your learning journey or share your expertise with ease.
            Edify connects students and instructors through an intuitive
            platform designed to simplify online education. Create, explore, and
            grow—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={"/login"}>
              <button className="px-8 py-3 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
                Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <button className="px-8 py-3 bg-black/80 rounded-lg hover:bg-slate-200 hover:text-black/80 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Key Features of Edify
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <Sparkles className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Role-Based Access
              </h3>
              <p className="text-gray-400">
                Separate dashboards and features for Students and Instructors to
                ensure a focused experience for each role.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <Brain className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Course Creation & Management
              </h3>
              <p className="text-gray-400">
                Instructors can easily create courses with YouTube videos, rich
                text session descriptions, and manage them all in one place.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <Zap className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Interactive Student Dashboard
              </h3>
              <p className="text-gray-400">
                Students can enroll, track session progress, and complete
                lessons seamlessly using our simplified learning tools.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-gray-400 mb-8">
              Join a growing community of students and instructors making online
              education simpler, smarter, and more accessible with Edify.
            </p>
            <button className="px-8 py-3 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors">
              Get Started Now
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Origami className="h-6 w-6 text-orange-500" />
                <span className="text-lg font-bold text-white">Edify</span>
              </div>
              <p className="text-gray-400 mb-4">
                A simplified online learning platform empowering students and
                instructors to teach, learn, and grow—all in one place.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/HarshForreal"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-top items-left md:items-start">
              <p className="text-white text-lg font-medium mb-2">
                Join the Edify Community
              </p>
              <p className="text-gray-400">
                Empower your knowledge journey with simplified learning tools
                and experiences.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>© 2025 Edify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
