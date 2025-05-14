
import { Play, Users, BookOpen, Trophy } from 'lucide-react';
// import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { RootState } from '../../redux';

const Landing = () => {
  // const data = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const message = location.state?.message || "";  
  return (
   
    <div className="relative bg-gradient-to-b from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 pt-24">
      {message && (
      <div className="p-4 mb-4 text-white bg-green-500 rounded-md shadow-md">
        {message}
      </div>
    )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Unlock Your Potential with Expert-Led Online Learning
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Access world-class education from anywhere. Learn at your own pace with our comprehensive courses and expert instructors.
            </p>
            <div className="flex space-x-4">
              <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors flex items-center">
                Get Started
                <Play className="w-4 h-4 ml-2" />
              </button>
              <button className="border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors">
                Browse Courses
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-16">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">50K+</p>
                  <p className="text-gray-600 dark:text-gray-400">Active Students</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">300+</p>
                  <p className="text-gray-600 dark:text-gray-400">Courses</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">95%</p>
                  <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
              alt="Students learning"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium dark:text-white">2,500+ Students Online Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Landing