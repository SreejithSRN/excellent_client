import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaCreditCard, FaArrowLeft } from 'react-icons/fa';
// import Navbar from '../../components/landPage/Navbar';
import { Player } from '@lottiefiles/react-lottie-player';

const StudentSuccessPage: React.FC = () => {
    const location = useLocation();
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');
        const amount = query.get('amount');
        const currency = query.get('currency');
        const courseId = query.get('courseId');
        const userId = query.get('userId');

        if (sessionId && amount && currency && courseId && userId) {
            setSession({
                id: sessionId,
                amount_total: parseFloat(amount) * 100,
                currency: currency,
                metadata: {
                    courseId: courseId,
                    userId: userId
                }
            });
            setLoading(false);
        } else {
            setError('Missing session details.');
            setLoading(false);
        }
    }, [location.search]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-2xl font-semibold text-gray-700">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-2xl font-semibold text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
                                <Player
                                    autoplay
                                    loop
                                    src="https://lottie.host/06652e51-a70d-4f4e-b6ac-b44e0d279966/3yKB12GGrH.json"
                                    style={{ height: '300px', width: '300px' }}
                                />
                            </div>
                            <div className="w-full md:w-1/2 p-4 md:p-8">
                                <div className="flex items-center justify-center">
                                    <FaCheckCircle className="text-4xl md:text-6xl text-green-500 mb-4" />
                                </div>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-6">Payment Successful!</h1>
                                {session && (
                                    <div className="space-y-4 md:space-y-6">
                                        <p className="text-lg md:text-xl text-gray-700 text-center">Thank you for your purchase. You're all set to start learning!</p>
                                        <div className="bg-gray-50 px-4 py-3 md:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
                                            <div className="flex items-center">
                                                <FaCreditCard className="text-gray-500 mr-2" />
                                                <dt className="text-sm font-medium text-gray-500">Amount Paid:</dt>
                                            </div>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}
                                            </dd>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-6 md:mt-8 flex justify-center">
                                    <Link
                                        to="/"
                                        className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <FaArrowLeft className="mr-2" />
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentSuccessPage
;

