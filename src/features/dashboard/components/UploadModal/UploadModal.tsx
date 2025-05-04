'use client';

import { useState } from 'react';
import Modal from '../utils/Modal/Modal';
import DropZone from './components/DropZone';
import UploadList from './components/UploadList';
import UploadActions from './components/UploadActions';
import styles from './UploadModal.module.scss';


export interface FileUpload {
    id: string;
    file: File;
    progress: number;
    status: 'uploading' | 'complete' | 'error';
}

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
    const [files, setFiles] = useState<FileUpload[]>([]);

    const handleFilesAdded = (newFiles: File[]) => {
        const newUploads = newFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            progress: 0,
            status: 'uploading' as const
        }));
        setFiles(prev => [...prev, ...newUploads]);
    };

    const handleRemoveFile = (id: string) => {
        setFiles(prev => prev.filter(file => file.id !== id));
    };

    const handleRetryUpload = (id: string) => {
        setFiles(prev => prev.map(file => 
            file.id === id ? { ...file, status: 'uploading', progress: 0 } : file
        ));
    };

    const handleUpload = () => {
        // Implement your upload logic here
        console.log('Uploading files:', files);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Upload Files" size="lg">
            <div className={styles.container}>
                <DropZone onFilesAdded={handleFilesAdded} />
                <UploadList 
                    files={files}
                    onRemove={handleRemoveFile}
                    onRetry={handleRetryUpload}
                />
                <UploadActions 
                    fileCount={files.length}
                    onCancel={onClose}
                    onUpload={handleUpload}
                />
            </div>
        </Modal>
    );
};

export default UploadModal;