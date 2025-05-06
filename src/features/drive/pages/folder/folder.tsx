'use client'
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb/Breadcrumb";
import ActionsBar from "../../components/ActionsBar/ActionsBar";
import FilesTable from "../../components/FilesTable/FilesTable";
import FilePreview from "../../components/FilePreview/FilePreview";
import Folders from "../../components/Folders/Folders";
import CreateFolderModal from "../../components/CreateFolderModal/CreateFolderModal";
import UploadModal from "../../components/UploadModal/UploadModal";
import { folder, Folder, File } from "../../../../api/folder";
import { Error } from "../../components/ui/error";
import { formatBytes } from "@/utils";
import { getFileIcon, IFileData } from "../../types/file";
import { EmptyFolder } from "../../components/EmptyFolder/EmptyFolder";
import { ROUTES } from "@/constants/routes";

const FolderPage = () => {
    const { id: folderId } = useParams();
    const router = useRouter();

    type Status = 'loading' | 'error' | 'empty' | 'success';
    const [status, setStatus] = useState<Status>('loading');
    const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
    const [files, setFiles] = useState<IFileData[]>([]);
    const [folders, setFolders] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [selectedFile, setSelectedFile] = useState<IFileData | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

    const handlePreview = (file: IFileData) => {
        setSelectedFile(file);
        console.log('Selected file:', file);
        setIsPreviewOpen(true);
    };


    const processFolders = (folders: Folder[]): { id: string; name: string; stats: string }[] => {
        return folders.map((folder) => ({
            id: folder._id,
            name: folder.name,
            stats: `${folder.fileCount > 0 ? `${folder.fileCount} files ·` : ''} ${folder.totalFileSize > 0 ? formatBytes(folder.totalFileSize) : ''}`,
        }));
    };

    const processFiles = (files: File[]): IFileData[] => {
        return files.map((file) => ({
            id: file._id,
            name: file.name,
            size: `${formatBytes(file.size)}`,
            type: getFileIcon(file.mimetype),
            mimetype: (file.mimetype),
            modified: new Date(file.updatedAt).toLocaleDateString(),
            url: file.url,
            createdAt: file.createdAt,
            icon: getFileIcon(file.mimetype),
        }));
    };

    const fetchData = async (skipStatus?: boolean) => {
        if (!folderId) return;

        try {
            !skipStatus && setStatus('loading');
            setError(null);

            const response = await folder.getFolder(folderId as string);
            if (!response) {
                setStatus('error');
                setError('Failed to fetch folder data');
                return;
            }
            console.log('Folder response:', response); // Add this log statement t
            setCurrentFolder(response);
            const processedFolders = processFolders(response.subFolders || []);
            const processedFiles = processFiles(response.files || []);

            setFolders(processedFolders);
            setFiles(processedFiles);
            setStatus((!processedFiles.length && !processedFolders.length) ? 'empty' : 'success');
        } catch (err: any) {
            console.error('Error fetching folder data:', err);
            setError(err);
            setStatus('error');
        }
    };

    useEffect(() => {
        fetchData();
    }, [folderId]);

    const breadcrumbItems: BreadcrumbItem[] = [
        {
          label: "My Drive",
          onClick: () => router.push(ROUTES.DASHBOARD.HOME),
        },
        ...(currentFolder?.breadcrumb?.map((item) => ({
          label: item.name,
          onClick: () => router.push(`/drive/${item._id}`),
        })) ?? []),
        ...(currentFolder?.name
          ? [
              {
                label: currentFolder.name,
              },
            ]
          : []),
      ];

    const renderContent = () => {
        switch (status) {
            case 'error':
                return (
                    <Error
                        message={error || "An error occurred while fetching your folder content."}
                        onRetry={fetchData}
                    />
                );
            case 'empty':
                return (
                    <EmptyFolder
                        onUpload={() => setIsUploadModalOpen(true)}
                        onCreateFolder={() => setIsCreateFolderModalOpen(true)}
                    />
                );
            case 'success':
                return (
                    <>
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
                <Breadcrumb
                    items={breadcrumbItems}
                />
                <ActionsBar
                    folder={{
                        id: currentFolder?._id || '',
                        name: currentFolder?.name || ''
                    }}
                    handleRefresh={() => fetchData(true)}
                />

                {renderContent()}

                {selectedFile && (
                    <FilePreview
                        isOpen={isPreviewOpen}
                        onClose={() => setIsPreviewOpen(false)}
                        file={{
                            name: selectedFile.name,
                            type: selectedFile.type,
                            mimetype: selectedFile.mimetype,
                            size: selectedFile.size,
                            url: selectedFile.url || '',
                            pages: selectedFile.type === 'PDF' ? 1 : undefined
                        }}
                    />
                )}
                <CreateFolderModal
                    isOpen={isCreateFolderModalOpen}
                    onClose={() => setIsCreateFolderModalOpen(false)}
                    onSubmit={(folderData) => {
                        console.log('Creating folder:', folderData);
                        setIsCreateFolderModalOpen(false);
                        fetchData(true); // Refresh the folder content
                    }}
                    reference={{
                        parentFolderId: currentFolder?._id || '',
                        parentFolderName: currentFolder?.name || '',
                    }}
                />
                <UploadModal
                    isOpen={isUploadModalOpen}
                    onClose={() => {
                        setIsUploadModalOpen(false);
                        fetchData(true);
                    }}
                    reference={{
                        parentFolderId: currentFolder?._id || '',
                        parentFolderName: currentFolder?.name || '',
                    }}
                />
            </div>
        </DashboardLayout>
    );
};

export default FolderPage;
