'use client';

import { useState } from 'react';
import { FaFolder, FaFolderPlus } from 'react-icons/fa';
import Modal from '../utils/Modal/Modal';
import styles from './CreateFolderModal.module.scss';
import { useToast } from '@/hooks/useToast';
import { folder as folderApi } from '@/api/folder';

interface CreateFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (folderData: {
        name: string;
        _id: string;
    }) => void;
    reference?: {
        parentFolderId: string;
        parentFolderName: string;
    }
}

const CreateFolderModal = ({ isOpen, onClose, onSubmit, reference }: CreateFolderModalProps) => {
    const [folderName, setFolderName] = useState('Untitled folder');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!folderName.trim()) {
            toast.error('Please enter a folder name');
            return;
        }

        setIsLoading(true);
        try {
            const parentFolderId = reference?.parentFolderId;
            const folder = await folderApi.createFolder({ name: folderName.trim(), parentFolderId });
            toast.success('Folder created successfully');
            onSubmit(folder);
        } catch (error) {
            toast.error('Failed to create folder. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={reference?.parentFolderName ? `Create folder in ${reference.parentFolderName}` : `Create new folder`}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="folder-name" className={styles.label}>
                        Folder name
                    </label>
                    <div className={styles.inputWrapper}>
                        <FaFolder className={styles.inputIcon} />
                        <input
                            type="text"
                            id="folder-name"
                            className={styles.input}
                            placeholder="Untitled folder"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />
                    </div>
                </div>


                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={onClose}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        <FaFolderPlus className={styles.buttonIcon} />
                        {isLoading ? 'Creating...' : 'Create folder'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateFolderModal;