'use client'
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import Breadcrumb from "../../components/utils/Breadcrumb/Breadcrumb";
import ActionsBar from "../../components/ActionsBar/ActionsBar";
import QuickAccess from "../../components/QuickAccess/QuickAccess";
import FilesTable from "../../components/FilesTable/FilesTable";
import FilePreview from "../../components/FilePreview/FilePreview";
import Folders from "../../components/Folders/Folders";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import CreateFolderModal from "../../components/CreateFolderModal/CreateFolderModal";
import UploadModal from "../../components/UploadModal/UploadModal";
import { folder, Folder, File } from "../../../../api/folder";
import { Error } from "../../components/ui/error";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import { formatBytes } from "@/utils";
import { getFileIcon, IFileData } from "../../types/file";


const HomePage = () => {
    type Status = 'loading' | 'error' | 'empty' | 'success';
    const [status, setStatus] = useState<Status>('loading');
    const [files, setFiles] = useState<IFileData[]>([]);
    const [folders, setFolders] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);


    const [selectedFile, setSelectedFile] = useState<IFileData | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const breadcrumbItems = [
        {
            label: "My Drive",
            onClick: () => console.log("Navigate to My Drive")
        },
        // {
        //     label: "Documents"
        // }
    ];

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
            modified: new Date(file.updatedAt).toLocaleDateString(),
            url: file.url,
            createdAt: file.createdAt,
            icon: getFileIcon(file.mimetype),
        }));
    };

    const fetchData = async (skipSkeleton?:boolean) => {
        try {
            !skipSkeleton && setStatus('loading');
            setError(null);

            const response = await folder.getAllFolders();
            if (!response) {
                setStatus('error');
                setError('Failed to fetch data');
                return;
            }
            console.log("response", response)
            const processedFolders = processFolders(response?.folders || []);
            const processedFiles = processFiles(response?.files || []);

            setFolders(processedFolders);
            setFiles(processedFiles);
            setStatus((!processedFiles.length && !processedFolders.length) ? 'empty' : 'success');
        } catch (err) {
            console.error('Error fetching data:', err);
            const errorMessage = 'An unexpected error occurred';
            setError(errorMessage);
            setStatus('error');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderContent = () => {
        switch (status) {
            case 'loading':
                return <LoadingSkeleton />; 
            case 'error':
                return (
                    <Error
                        message={error || "An error occurred while fetching your files and folders."}
                        onRetry={fetchData}
                    />
                );
            case 'empty':
                return (
                    <EmptyState
                        onUpload={() => setIsUploadModalOpen(true)}
                        onCreateFolder={() => setIsCreateFolderModalOpen(true)}
                    />
                );
            case 'success':
                return (
                    <>
                        {files.length > 0 && <QuickAccess files={files} onPreview={handlePreview}  />}
                        {folders.length > 0 && <Folders folders={folders} />}
                        {files.length > 0 && <FilesTable
                            files={files}
                            onPreview={handlePreview}
                        />}
                    </>
                );
        }
    }


    return (
        <DashboardLayout>
            <div className="p-6">
                <Breadcrumb items={breadcrumbItems} />
                <ActionsBar />
                {renderContent()}


                {selectedFile && (
                    <FilePreview
                        isOpen={isPreviewOpen}
                        onClose={() => setIsPreviewOpen(false)}
                        file={{
                            name: selectedFile.name,
                            type: selectedFile.type,
                            size: selectedFile.size,
                            mimetype: selectedFile.mimetype,
                            url: selectedFile.url || '',
                            pages: selectedFile.type === 'PDF' ? 1 : undefined
                        }}
                    />
                )}
                <CreateFolderModal
                    isOpen={isCreateFolderModalOpen}
                    onClose={() => setIsCreateFolderModalOpen(false)}
                    onSubmit={(folderData) => {
                        setIsCreateFolderModalOpen(false);
                    }}
                />
                <UploadModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                />
            </div>
        </DashboardLayout>
    );
};


export default HomePage;