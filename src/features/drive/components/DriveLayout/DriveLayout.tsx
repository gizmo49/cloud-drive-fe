'use client';

import { ReactNode } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import Breadcrumb, { BreadcrumbItem } from '../utils/Breadcrumb/Breadcrumb';
import ActionsBar from '../ActionsBar/ActionsBar';
import FilePreview from '../FilePreview/FilePreview';
import { IFileData } from '../../types/file';

interface DriveLayoutProps {
    children: ReactNode;
    breadcrumbItems: BreadcrumbItem[];
    folder?: {
        id: string;
        name: string;
    };
    selectedFile: IFileData | null;
    isPreviewOpen: boolean;
    onPreviewClose: () => void;
    onRefresh: (skipLoadingState?: boolean) => void;
}

const DriveLayout = ({
    children,
    breadcrumbItems,
    folder,
    selectedFile,
    isPreviewOpen,
    onPreviewClose,
    onRefresh
}: DriveLayoutProps) => {
    return (
        <DashboardLayout>
            <div className="p-6">
                <Breadcrumb items={breadcrumbItems} />
                <ActionsBar
                    folder={folder}
                    handleRefresh={() => onRefresh(true)}
                />
                {children}
                {selectedFile && (
                    <FilePreview
                        isOpen={isPreviewOpen}
                        onClose={onPreviewClose}
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
            </div>
        </DashboardLayout>
    );
};

export default DriveLayout;