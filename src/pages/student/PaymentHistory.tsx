import { useState, useEffect } from "react";
import { commonRequest, URL } from "../../common/api";
import { config } from "../../common/config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const PaymentHistory = () => {
  interface Payment {
    id: string;
    courseTitle: string;
    amount: number;
    dateOfPurchase: string;
    instructorName: string;
    studentName: string;
    receipt?: string;
  }
  interface PaymentResponse {
    payments: Payment[];
    totalCount: number;
    totalAmount: number;
    totalCourses: number;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const itemsPerPage = 3;

  const { data } = useSelector((state: RootState) => state.user);

  const fetchPayments = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const details = {
        studentId: data?._id,
      };

      const response = await commonRequest<PaymentResponse>(
        "GET",
        `${URL}/api/payment/getpayment?page=${page}&limit=${itemsPerPage}&search=${search}`,
        details,
        config
      );

      if (
        response?.success &&
        response.data &&
        Array.isArray(response.data.payments)
      ) {
        setPaymentData(response.data.payments);
        setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
        setTotalAmount(response.data.totalAmount);
        setTotalCourses(response.data.totalCount);
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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!data?._id) return;

    const delayDebounce = setTimeout(() => {
      fetchPayments(currentPage, searchTerm);
    }, 500); // wait 500ms before calling API

    return () => clearTimeout(delayDebounce); // clear timeout on new input
  }, [searchTerm, currentPage, data?._id]);

  // const totalPayments = paymentData.reduce(
  //   (acc, item) => acc + (item.amount || 0),
  //   0
  // );
  // const totalCourses = paymentData.length;

  return (
    <div className="p-1">
      {/* Search Input - Always visible */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by course title"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
          className="border border-gray-300 rounded px-3 py-2 w-64"
        />
      </div>
  
      {loading ? (
        <p className="text-center text-gray-500">Loading payment history...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : paymentData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">
          No purchases found
        </p>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-gray-600 text-lg">Total Payments</h2>
              <p className="text-2xl font-bold">
                ₹{totalAmount.toLocaleString()}
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
                  <th className="p-2">
                    {data?.role === "instructor"
                      ? "Student Name"
                      : "Instructor Name"}
                  </th>
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
                    <td className="p-2">
                      {data?.role === "instructor"
                        ? payment.studentName
                        : payment.instructorName}
                    </td>
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
                      {payment.receipt ? (
                        <a
                          href={payment.receipt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View Receipt
                        </a>
                      ) : (
                        <span className="text-gray-400">No Receipt</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
  
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
  
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
};

export default PaymentHistory;
