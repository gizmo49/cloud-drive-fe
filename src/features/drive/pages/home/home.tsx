'use client'
import { useEffect } from "react";
import QuickAccess from "../../components/QuickAccess/QuickAccess";
import FilesTable from "../../components/FilesTable/FilesTable";
import Folders from "../../components/Folders/Folders";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import CreateFolderModal from "../../components/CreateFolderModal/CreateFolderModal";
import UploadModal from "../../components/UploadModal/UploadModal";
import { Error } from "../../components/ui/error";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import { useFileSystem } from "../../hooks/useFileSystem";
import DriveLayout from "../../components/DriveLayout/DriveLayout";


const HomePage = () => {
    const {
        status,
        files,
        folders,
        error,
        selectedFile,
        isPreviewOpen,
        isUploadModalOpen,
        isCreateFolderModalOpen,
        handlePreview,
        setIsPreviewOpen,
        setIsUploadModalOpen,
        setIsCreateFolderModalOpen,
        fetchData
    } = useFileSystem();
    const breadcrumbItems = [
        {
            label: "My Drive",
            onClick: () => console.log("Navigate to My Drive")
        },
        // {
        //     label: "Documents"
        // }
    ];



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
                        {files.length > 0 && <QuickAccess files={files} onPreview={handlePreview} />}
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
        <>
            <DriveLayout
                breadcrumbItems={breadcrumbItems}
                selectedFile={selectedFile}
                isPreviewOpen={isPreviewOpen}
                onPreviewClose={() => setIsPreviewOpen(false)}
                onRefresh={fetchData}
            >
                {renderContent()}
            </DriveLayout>
            {isCreateFolderModalOpen && (
                <CreateFolderModal
                    isOpen={isCreateFolderModalOpen}
                    onClose={() => setIsCreateFolderModalOpen(false)}
                    onSubmit={(folderData) => {
                        setIsCreateFolderModalOpen(false);
                        fetchData(true);
                    }}
                />
            )}
            {isUploadModalOpen && (
                <UploadModal
                    isOpen={isUploadModalOpen}
                    onClose={() => {
                        setIsUploadModalOpen(false);
                        fetchData(true);
                    }}
                />
            )}
        </>
    );
};


export default HomePage;