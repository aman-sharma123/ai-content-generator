import Link from "next/link";
import { LucideBrain, LucideFileText, LucideYoutube } from "lucide-react";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-indigo-700">AI Guru</div>
        <div className="flex space-x-4">
          <Link
            href="/sign-in"
            className="px-4 py-2 border border-indigo-700 text-indigo-700 rounded hover:bg-indigo-50"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <h1 className="text-4xl font-extrabold sm:text-3xl">
          AI Content Made Simple
        </h1>
        <p className="mt-4 text-lg sm:text-base">
          Generate YouTube video descriptions, tags, and SEO-friendly content in seconds with AI Guru.
        </p>
        <Link
          href="/sign-up?redirectUrl=/dashboard"
          className="mt-8 inline-block px-6 py-3 bg-white text-indigo-700 font-bold rounded shadow-md hover:bg-gray-100"
        >
          Get Started for Free
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center sm:text-2xl">
          What Makes AI Guru Unique?
        </h2>
        <p className="text-gray-600 text-center mt-2 sm:text-sm">
          Simplify your content creation process with cutting-edge AI tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <LucideYoutube className="mx-auto text-indigo-700 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 text-center sm:text-lg">
              YouTube Optimization
            </h3>
            <p className="text-gray-600 mt-2 text-center sm:text-sm">
              Generate video titles, descriptions, and tags optimized for higher engagement.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <LucideFileText className="mx-auto text-indigo-700 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 text-center sm:text-lg">
              SEO-Friendly Content
            </h3>
            <p className="text-gray-600 mt-2 text-center sm:text-sm">
              Create content tailored for search engines, boosting visibility.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <LucideBrain className="mx-auto text-indigo-700 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 text-center sm:text-lg">
              AI-Powered Precision
            </h3>
            <p className="text-gray-600 mt-2 text-center sm:text-sm">
              Powered by the latest Gemini API for fast and accurate results.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-indigo-700 text-white text-center px-4">
        <h2 className="text-3xl font-bold sm:text-2xl">
          Create Content Effortlessly with AI
        </h2>
        <p className="mt-4 text-lg sm:text-base">
          Join thousands of creators who trust AI Guru to simplify their workflow.
        </p>
        <Link
          href="/sign-up?redirectUrl=/dashboard"
          className="mt-6 inline-block px-6 py-3 bg-white text-indigo-700 font-bold rounded hover:bg-gray-100"
        >
          Get Started Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-4">
        <div className="container mx-auto flex flex-col items-center">
          <p className="text-gray-400 text-sm text-center sm:text-xs">
            © {new Date().getFullYear()} AI Guru. All rights reserved.
          </p>
          <nav className="mt-4 flex space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-white sm:text-xs">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white sm:text-xs">
              Privacy
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white sm:text-xs">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
