'use client';

import { useState } from 'react';
import { folder, Folder, File } from '../../../api/folder';
import { getFileIcon, IFileData } from '../types/file';
import { formatBytes, timeAgo } from '@/utils';

type Status = 'loading' | 'error' | 'empty' | 'success';

export interface UseFileSystemProps {
    folderId?: string;
}

export interface UseFileSystemReturn {
    status: Status;
    files: IFileData[];
    folders: { id: string; name: string; stats: string }[];
    error: string | null;
    selectedFile: IFileData | null;
    isPreviewOpen: boolean;
    isUploadModalOpen: boolean;
    isCreateFolderModalOpen: boolean;
    currentFolder: Folder | null;
    handlePreview: (file: IFileData) => void;
    setIsPreviewOpen: (isOpen: boolean) => void;
    setIsUploadModalOpen: (isOpen: boolean) => void;
    setIsCreateFolderModalOpen: (isOpen: boolean) => void;
    fetchData: (skipLoadingState?: boolean) => Promise<void>;
}

export const useFileSystem = ({ folderId }: UseFileSystemProps = {}): UseFileSystemReturn => {
    const [status, setStatus] = useState<Status>('loading');
    const [files, setFiles] = useState<IFileData[]>([]);
    const [folders, setFolders] = useState<{ id: string; name: string; stats: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);

    const [selectedFile, setSelectedFile] = useState<IFileData | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

    const handlePreview = (file: IFileData) => {
        setSelectedFile(file);
        setIsPreviewOpen(true);
    };

    const processFolders = (folders: Folder[]): { id: string; name: string; stats: string }[] => {
        return folders.map((folder) => ({
            id: folder._id,
            name: folder.name,
            stats: `${folder.fileCount > 0 ? `${folder.fileCount} files · ${formatBytes(folder.totalFileSize)}` : 'Empty Folder'}`,
        }));
    };

    const processFiles = (files: File[]): IFileData[] => {
        return files.map((file) => ({
            id: file._id,
            name: file.name,
            size: `${formatBytes(file.size)}`,
            type: getFileIcon(file.mimetype),
            mimetype: file.mimetype,
            modified: timeAgo(file.updatedAt),
            url: file.url,
            createdAt: file.createdAt,
            icon: getFileIcon(file.mimetype),
        }));
    };

    const fetchData = async (skipLoadingState?: boolean) => {
        try {
            !skipLoadingState && setStatus('loading');
            setError(null);

            if (folderId) {
                const response = await folder.getFolder(folderId);
                if (!response) {
                    setStatus('error');
                    setError('Failed to fetch folder data');
                    return;
                }
                setCurrentFolder(response);
                const processedFolders = processFolders(response.subFolders || []);
                const processedFiles = processFiles(response.files || []);
                setFolders(processedFolders);
                setFiles(processedFiles);
                setStatus((!processedFiles.length && !processedFolders.length) ? 'empty' : 'success');
            } else {
                const response = await folder.getAllFolders();
                if (!response) {
                    setStatus('error');
                    setError('Failed to fetch data');
                    return;
                }
                const processedFolders = processFolders(response.folders || []);
                const processedFiles = processFiles(response.files || []);
                setFolders(processedFolders);
                setFiles(processedFiles);
                setStatus((!processedFiles.length && !processedFolders.length) ? 'empty' : 'success');
            }
        } catch (err: any) {
            const errorMessage = 'An unexpected error occurred';
            setError(errorMessage);
            setStatus('error');
        }
    };

    return {
        status,
        files,
        folders,
        error,
        selectedFile,
        isPreviewOpen,
        isUploadModalOpen,
        isCreateFolderModalOpen,
        currentFolder,
        handlePreview,
        setIsPreviewOpen,
        setIsUploadModalOpen,
        setIsCreateFolderModalOpen,
        fetchData,
    };
};