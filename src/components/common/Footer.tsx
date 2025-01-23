import logo from "../../assets/EXCELLENT LOGO.png";

function Footer() {
  return (
    <footer className="bg-white text-black border-t-4 border-gray-200 dark:bg-black dark:text-white dark:border-gray-700 py-1">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:px-20 md:py-2">
        <div className="flex flex-col items-center md:items-start mb-2 md:mb-0 md:w-1/3">
          <img src={logo} alt="EduStream Logo" className="h-24" />
        </div>

        <div className="flex flex-col items-center md:items-center md:w-1/3">
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 mb-2 md:mb-0">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-100 border border-gray-300 text-black placeholder-gray-600 focus:outline-none rounded py-1 px-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 text-sm"
            />
            <button className="bg-customPink hover:bg-green-800 text-white font-bold py-1 px-3 rounded text-sm">
              Subscribe
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 text-xs md:mt-3">
            <p className="hover:underline cursor-pointer">Careers</p>
            <p className="hover:underline cursor-pointer">Privacy Policy</p>
            <p className="hover:underline cursor-pointer">Terms & Conditions</p>
          </div>
          <div className="text-xs mt-2 md:mt-3">
            © 2024 Excellent Learning Solutions
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


