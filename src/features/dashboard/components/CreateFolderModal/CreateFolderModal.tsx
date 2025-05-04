'use client';

import { useState } from 'react';
import { FaFolder, FaFolderPlus } from 'react-icons/fa';
import Modal from '../utils/Modal/Modal';
import styles from './CreateFolderModal.module.scss';

interface CreateFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (folderData: {
        name: string;
        color: string;
        isStarred: boolean;
    }) => void;
}

const CreateFolderModal = ({ isOpen, onClose, onSubmit }: CreateFolderModalProps) => {
    const [folderName, setFolderName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isStarred, setIsStarred] = useState(false);

    const colorOptions = [
        { color: 'gray', class: 'bg-gray-200' },
        { color: 'red', class: 'bg-red-500' },
        { color: 'yellow', class: 'bg-yellow-500' },
        { color: 'green', class: 'bg-green-500' },
        { color: 'blue', class: 'bg-blue-500' },
        { color: 'purple', class: 'bg-purple-500' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name: folderName || 'Untitled folder',
            color: selectedColor || 'gray',
            isStarred
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create new folder">
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

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Color tag</label>
                    <div className={styles.colorGrid}>
                        {colorOptions.map((option) => (
                            <button
                                key={option.color}
                                type="button"
                                className={`${styles.colorButton} ${option.class} ${
                                    selectedColor === option.color ? styles.selected : ''
                                }`}
                                onClick={() => setSelectedColor(option.color)}
                            />
                        ))}
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
                    <button type="submit" className={styles.submitButton}>
                        <FaFolderPlus className={styles.buttonIcon} />
                        Create folder
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateFolderModal;