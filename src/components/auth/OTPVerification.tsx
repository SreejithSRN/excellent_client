import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPVerification: React.FC<{
  onSubmit: (otp: string) => void;
  resendOTP: () => void;
}> = ({ onSubmit, resendOTP }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(30); // Timer starts at 30 seconds
  const [isResendActive, setIsResendActive] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendActive(true); // Enable the "Resend OTP" button
    }
  }, [timeLeft]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    } else if (value === "" && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      onSubmit(otpValue);
    } else {
      toast.info("Please enter a valid 6-digit OTP.");
    }
  };

  const handleResend = () => {
    setTimeLeft(30); // Reset the timer to 30 seconds
    setIsResendActive(false); // Disable "Resend OTP" button
    setOtp(Array(6).fill("")); // Clear OTP fields
    resendOTP(); // Call the resend OTP function
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter OTP</h2>
        <p className="text-sm text-gray-500 mb-4">
          Please enter the 6-digit OTP sent to your email.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-10 h-10 border rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={timeLeft === 0} // Disable the button if timer ends
            className={`w-full py-2 rounded font-medium ${
              timeLeft === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            Verify OTP
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          {isResendActive ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-500 hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <p>Resend OTP in {timeLeft}s</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default OTPVerification;
