'use client';

import { FaExclamationCircle, FaRedoAlt } from 'react-icons/fa';

interface ErrorProps {
    message?: string;
    onRetry?: () => void;
}

export const Error = ({ message = 'An error occurred. Please try again.', onRetry }: ErrorProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
            <FaExclamationCircle className="w-12 h-12 text-red-500" />
            <p className="text-lg font-medium text-gray-900">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <FaRedoAlt className="w-4 h-4" />
                    <span>Try Again</span>
                </button>
            )}
        </div>
    );
};