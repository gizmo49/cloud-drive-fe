'use client';

import { FaUpload, FaFolderPlus } from 'react-icons/fa6';
import { FaFolderOpen } from 'react-icons/fa';

interface EmptyFolderProps {
    onUpload: () => void;
    onCreateFolder: () => void;
}

export const EmptyFolder = ({ onUpload, onCreateFolder }: EmptyFolderProps) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 py-16 px-4">
            <div className="text-center max-w-md">
                <FaFolderOpen className="text-gray-300 text-6xl mb-4 mx-auto" />
                <h2 className="text-xl font-medium text-gray-700 mb-2">This folder is empty</h2>
                <p className="text-sm text-gray-500 mb-6">Upload files or create folders to get started</p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={onUpload}
                        className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        <FaUpload className="mr-2" />
                        <span>Upload files</span>
                    </button>
                    <button
                        onClick={onCreateFolder}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <FaFolderPlus className="mr-2" />
                        <span>Create folder</span>
                    </button>
                </div>

                <div className="mt-8 text-sm text-gray-500">
                    <p>You can also drag and drop files here</p>
                </div>
            </div>
        </div>
    );
};