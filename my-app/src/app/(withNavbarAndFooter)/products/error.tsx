"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-red-500 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 sm:mx-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mx-auto mt-4">
          <svg
            className="h-6 w-6 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="text-center mt-4 px-4">
          <h3 className="text-lg font-medium text-gray-900">Error</h3>
          <p className="text-sm text-gray-500 mt-2">
            There was an error processing your request.
          </p>
        </div>
        <div className="mt-4 px-4 pb-4">
          <button
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
