'use client';

import { FaFolderPlus, FaUpload, FaList, FaThLarge } from 'react-icons/fa';
import styles from './ActionsBar.module.scss';
import { useState } from 'react';
import CreateFolderModal from '../CreateFolderModal/CreateFolderModal';
import UploadModal from '../UploadModal/UploadModal';

const ActionsBar = () => {
    const [showViewOptions, setShowViewOptions] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleCreateFolderSuccess = (folderData: {
        name: string;
        color: string;
        isStarred: boolean;
    }) => {
        // Handle the successful folder creation
        console.log('Folder created:', folderData);
        // You can perform any necessary actions here, such as updating the folder list
    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Documents</h1>
                <div className={styles.actions}>
                    <button className={styles.actionButton} onClick={() => setIsCreateFolderModalOpen(true)}>
                        <FaFolderPlus className={styles.icon} />
                        <span>New folder</span>
                    </button>
                    <button className={styles.actionButton} onClick={() => setIsUploadModalOpen(true)}>
                        <FaUpload className={styles.icon} />
                        <span>Upload</span>
                    </button>
                    <div className={styles.viewOptionsContainer}>
                        <button
                            className={styles.viewOptionsButton}
                            onClick={() => setShowViewOptions(!showViewOptions)}
                        >
                            <FaList />
                        </button>
                        {showViewOptions && (
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownItem}>
                                    <FaList className={styles.icon} />
                                    List view
                                </div>
                                <div className={styles.dropdownItem}>
                                    <FaThLarge className={styles.icon} />
                                    Grid view
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <CreateFolderModal
                isOpen={isCreateFolderModalOpen}
                onClose={() => setIsCreateFolderModalOpen(false)}
                onSubmit={handleCreateFolderSuccess}
            />
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </>
    );
};

export default ActionsBar;