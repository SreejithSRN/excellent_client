import { useState, useEffect } from "react";
import { commonRequest, URL } from "../../common/api"; // Import API helper
import { config } from "../../common/config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const PaymentHistory = () => {
  interface Payment {
    id: string;
    courseTitle: string;
    amount: number;
    dateOfPurchase: string;
    instructorName:string;
    studentName:string;
  }

  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const details = {
          studentId: data?._id,
        };

        const response = await commonRequest(
          "GET",
          `${URL}/api/payment/getpayment`,
          details,
          config
        );
        console.log(response, "my data");

        if (response?.success && Array.isArray(response.data)) {
          setPaymentData(response.data);
        } else {
          throw new Error(
            response?.message || "Failed to fetch payment history."
          );
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      }
       finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Calculate summary
  const totalPayments = paymentData.reduce(
    (acc, item) => acc + (item.amount || 0),
    0
  );
  const totalCourses = paymentData.length;

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading payment history...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : paymentData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">
          No purchases done yet
        </p>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-gray-600 text-lg">Total Payments</h2>
              <p className="text-2xl font-bold">
                ₹{totalPayments.toLocaleString()}
              </p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-gray-600 text-lg">Courses Purchased</h2>
              <p className="text-2xl font-bold">{totalCourses}</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-gray-600 text-lg">Last Purchase</h2>
              <p className="text-2xl font-bold">
                {paymentData[0]?.dateOfPurchase
                  ? new Intl.DateTimeFormat("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(paymentData[0].dateOfPurchase))
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Payment History Table */}
          <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2">Course Title</th>
                  <th className="p-2">{data?.role==="instructor"?"Student Name":"Instructor Name"}</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-2">{payment.courseTitle || "N/A"}</td>


                    <td className="p-2">{data?.role==="instructor"?payment.studentName:payment.instructorName}</td>
                    <td className="p-2">
                      ₹{(payment.amount || 0).toLocaleString()}
                    </td>
                    <td className="p-2">
                      {payment.dateOfPurchase
                        ? new Intl.DateTimeFormat("en-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(payment.dateOfPurchase))
                        : "N/A"}
                    </td>

                    <td className="p-2">
                      <button className="text-blue-500 hover:underline">
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
