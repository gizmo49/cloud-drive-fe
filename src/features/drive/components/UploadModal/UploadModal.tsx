'use client';

import { useState } from 'react';
import { API_BASE_URL } from '../../../../api/config';
import Modal from '../utils/Modal/Modal';
import DropZone from './components/DropZone';
import UploadList from './components/UploadList';
import UploadActions from './components/UploadActions';
import styles from './UploadModal.module.scss';
import { cookieService } from '@/services/cookie';


export interface FileUpload {
    id: string;
    file: File;
    progress: number;
    status: 'uploading' | 'complete' | 'error';
}

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    reference?: {
        parentFolderId: string;
        parentFolderName: string;
    }
}

const UploadModal = ({ isOpen, onClose, reference }: UploadModalProps) => {
    const [files, setFiles] = useState<FileUpload[]>([]);

    const uploadFile = async (fileUpload: FileUpload) => {
        try {
            const formData = new FormData();
            formData.append('file', fileUpload.file);
            if (reference?.parentFolderId) {
                formData.append('parentFolderId', reference?.parentFolderId);
            }

            const xhr = new XMLHttpRequest();
            let isMounted = true;

            const updateFileProgress = (progress: number) => {
                if (!isMounted) return;
                setFiles(prev => prev.map(file =>
                    file.id === fileUpload.id ? { ...file, progress } : file
                ));
            };

            const updateFileStatus = (status: 'complete' | 'error', progress?: number) => {
                if (!isMounted) return;
                setFiles(prev => prev.map(file =>
                    file.id === fileUpload.id ? { ...file, status, progress: progress ?? file.progress } : file
                ));
            };

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    requestAnimationFrame(() => updateFileProgress(progress));
                }
            };

            const uploadPromise = new Promise<void>((resolve, reject) => {
                xhr.onload = async () => {
                    if (xhr.status === 200) {
                        updateFileStatus('complete', 100);
                        resolve();
                    } else {
                        updateFileStatus('error');
                        reject(new Error('Upload failed'));
                    }
                };
                xhr.onerror = () => {
                    updateFileStatus('error');
                    reject(new Error('Network error'));
                };
            });

            xhr.open('POST', `${API_BASE_URL}/api/files`);
            const token = cookieService.getAuthToken();
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }
            xhr.send(formData);

            await uploadPromise;
        } catch (error) {
            console.error('Error uploading file:', error);
            setFiles(prev => prev.map(file =>
                file.id === fileUpload.id ? { ...file, status: 'error' } : file
            ));
        }
    };

    const handleFilesAdded = async (newFiles: File[]) => {
        const newUploads = newFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            progress: 0,
            status: 'uploading' as const
        }));
        setFiles(prev => [...prev, ...newUploads]);

        for (const fileUpload of newUploads) {
            await uploadFile(fileUpload);
        }
    };

    const handleRemoveFile = (id: string) => {
        setFiles(prev => prev.filter(file => file.id !== id));
    };

    const handleRetryUpload = async (id: string) => {
        const fileToRetry = files.find(file => file.id === id);
        if (!fileToRetry) return;

        setFiles(prev => prev.map(file =>
            file.id === id ? { ...file, status: 'uploading', progress: 0 } : file
        ));

        await uploadFile(fileToRetry);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={reference?.parentFolderName ? `Upload Files to ${reference.parentFolderName}` : `Upload Files`}
            size="lg">
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
                />
            </div>
        </Modal>
    );
}

export default UploadModal;