'use client'
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { BreadcrumbItem } from "../../components/utils/Breadcrumb/Breadcrumb";
import FilesTable from "../../components/FilesTable/FilesTable";
import Folders from "../../components/Folders/Folders";
import CreateFolderModal from "../../components/CreateFolderModal/CreateFolderModal";
import UploadModal from "../../components/UploadModal/UploadModal";
import { Error } from "../../components/ui/error";
import { EmptyFolder } from "../../components/EmptyFolder/EmptyFolder";
import { ROUTES } from "@/constants/routes";
import { useFileSystem } from "../../hooks/useFileSystem";
import DriveLayout from "../../components/DriveLayout/DriveLayout";

const FolderPage = () => {
    const { id } = useParams();
    const folderId = `${id}`;
    const router = useRouter();

    const {
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
        fetchData
    } = useFileSystem({ folderId });



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
        <>
            <DriveLayout
                breadcrumbItems={breadcrumbItems}
                folder={{
                    id: currentFolder?._id || '',
                    name: currentFolder?.name || ''
                }}
                selectedFile={selectedFile}
                isPreviewOpen={isPreviewOpen}
                onPreviewClose={() => setIsPreviewOpen(false)}
                onRefresh={fetchData}
            >
                {renderContent()}
            </DriveLayout>
            <CreateFolderModal
                isOpen={isCreateFolderModalOpen}
                onClose={() => setIsCreateFolderModalOpen(false)}
                onSubmit={(folderData) => {
                    setIsCreateFolderModalOpen(false);
                    fetchData(true);
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
        </>
    );
};

export default FolderPage;
