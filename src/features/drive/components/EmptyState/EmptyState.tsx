'use client';

import { FaCloudversify as FaCloudUploadAlt, FaCloud, FaShareNodes, FaLock, FaFolderPlus } from 'react-icons/fa6';

interface EmptyStateProps {
    onUpload: () => void;
    onCreateFolder: () => void;
}

export const EmptyState = ({ onUpload, onCreateFolder }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="mb-8">
                <FaCloudUploadAlt className="text-gray-300 text-7xl" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2 text-center">Your drive is empty</h2>
            <p className="text-gray-500 text-center mb-8 max-w-md">
                Drag and drop files here or use the upload button to add files to your drive
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onUpload}
                    className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <FaCloudUploadAlt className="mr-2" />
                    <span>Upload files</span>
                </button>
                <button
                    onClick={onCreateFolder}
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <FaFolderPlus className="mr-2" />
                    <span>Create folder</span>
                </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4">
                        <FaCloud />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">Cloud Storage</h3>
                        <p className="text-sm text-gray-500">Access your files from anywhere, anytime</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500 mr-4">
                        <FaShareNodes />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">Easy Sharing</h3>
                        <p className="text-sm text-gray-500">Share files and folders with others</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mr-4">
                        <FaLock />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">Secure Storage</h3>
                        <p className="text-sm text-gray-500">Your files are safe and encrypted</p>
                    </div>
                </div>
            </div>
        </div>
    );
};