'use client';

import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import Breadcrumb from "../../components/utils/Breadcrumb/Breadcrumb";
import ActionsBar from "../../components/ActionsBar/ActionsBar";
import QuickAccess from "../../components/QuickAccess/QuickAccess";
import FilesTable from "../../components/FilesTable/FilesTable";
import FilePreview from "../../components/FilePreview/FilePreview";
import { useState } from "react";
import { IFileData } from "../../components/FilesTable/types";
import Folders from "../../components/Folders/Folders";

const mockFiles = [
    {
        id: '1',
        name: 'Project Proposal',
        size: '2.5 MB',
        type: 'Document',
        modified: '2024-02-20',
        icon: 'word'
    },
    {
        id: '2',
        name: 'Budget Report',
        size: '1.8 MB',
        type: 'Spreadsheet',
        modified: '2024-02-19',
        icon: 'excel'
    },
    {
        id: '3',
        name: 'Presentation Deck',
        size: '5.2 MB',
        type: 'Presentation',
        modified: '2024-02-18',
        icon: 'powerpoint'
    },
    {
        id: '4',
        name: 'Contract Document',
        size: '3.1 MB',
        type: 'PDF',
        modified: '2024-02-17',
        icon: 'pdf'
    }
];

const HomePage = () => {
    const [files, setFiles] = useState(mockFiles);
    const [selectedFile, setSelectedFile] = useState<IFileData | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const breadcrumbItems = [
        {
            label: "My Drive",
            onClick: () => console.log("Navigate to My Drive")
        },
        {
            label: "Documents"
        }
    ];

    const handleSort = (field: string) => {
        const sortedFiles = [...files].sort((a, b) => {
            if (field === 'modified') {
                return new Date(b.modified).getTime() - new Date(a.modified).getTime();
            }
            return a[field as keyof typeof a].localeCompare(b[field as keyof typeof b]);
        });
        setFiles(sortedFiles);
    };

    const handleSelect = (selectedIds: string[]) => {
        console.log('Selected files:', selectedIds);
    };

    const handlePreview = (file: IFileData) => {
        setSelectedFile(file);
        setIsPreviewOpen(true);
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <Breadcrumb items={breadcrumbItems} />
                <ActionsBar />
                <QuickAccess />
                <Folders />
                <FilesTable
                    files={files as IFileData[]}
                    onSort={handleSort}
                    onSelect={handleSelect}
                    onPreview={handlePreview}
                />
                {selectedFile && (
                    <FilePreview
                        isOpen={isPreviewOpen}
                        onClose={() => setIsPreviewOpen(false)}
                        file={{
                            name: selectedFile.name,
                            type: selectedFile.type,
                            size: selectedFile.size,
                            url: `https://your-api-endpoint/files/${selectedFile.id}`, // Replace with your actual file URL
                            pages: selectedFile.type === 'PDF' ? 1 : undefined // Add page count if available
                        }}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default HomePage;