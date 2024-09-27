import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <div className="h-[80vh] flex flex-col justify-center items-center bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                    Appointment Created Successfully!
                </h1>
                <p className="text-[17px] text-gray-700 mb-6">
                    Your appointment has been scheduled. Please stay tuned for the next step.
                </p>
                <h2 className="text-xl my-5 font-medium text-green-700">
                    Payment interaction coming soon...
                </h2>
                <Link href="/" className="bg-blue-600 text-white inline-block px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default page;