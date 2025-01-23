
import { Target, Users, Award, BookOpen } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="pt-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Excellent</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to transform online education and make quality learning accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Founded in 2020, Excellentbegan with a simple idea: education should be accessible, engaging, and effective. 
              We've grown from a small startup to a global learning platform, helping millions of students achieve their goals.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Our platform combines cutting-edge technology with expert instruction to create an unparalleled learning experience. 
              We partner with leading institutions and industry experts to bring you the highest quality educational content.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
              alt="Team collaboration"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-6">
            <Target className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">To make quality education accessible to everyone, everywhere.</p>
          </div>
          <div className="text-center p-6">
            <Users className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Community</h3>
            <p className="text-gray-600 dark:text-gray-300">A global network of learners and educators supporting each other.</p>
          </div>
          <div className="text-center p-6">
            <Award className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Quality</h3>
            <p className="text-gray-600 dark:text-gray-300">Industry-leading standards in online education and content.</p>
          </div>
          <div className="text-center p-6">
            <BookOpen className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Method</h3>
            <p className="text-gray-600 dark:text-gray-300">Interactive learning experiences that drive real results.</p>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join Our Journey</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Be part of our mission to revolutionize online education. Whether you're a student, instructor, or institution, 
            there's a place for you in our community.
          </p>
          <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;