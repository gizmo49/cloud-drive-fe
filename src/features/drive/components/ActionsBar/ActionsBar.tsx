'use client';

import { FaFolderPlus, FaUpload, FaList, FaThLarge, FaFolder } from 'react-icons/fa';
import styles from './ActionsBar.module.scss';
import { useState } from 'react';
import CreateFolderModal from '../CreateFolderModal/CreateFolderModal';
import UploadModal from '../UploadModal/UploadModal';

interface ActionsBarProps {
    folder?: {
        name: string;
        id: string;
    };
    handleRefresh?: () => void;
}

const ActionsBar = ({ folder, handleRefresh }: ActionsBarProps) => {
    const [showViewOptions, setShowViewOptions] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleCreateFolderSuccess = () => {
        setIsCreateFolderModalOpen(false);
        handleRefresh?.();
    };

    const handleCreateFileSuccess = () => {
        setIsUploadModalOpen(false);
        handleRefresh?.();
    };

    return (
        <>
            <div className={styles.container}>
                {folder?.id ? (
                    <div className="flex items-center mb-4 md:mb-0">
                        <FaFolder className=" text-yellow-400 text-3xl mr-3"/>
                        <div>
                            <h1 className="text-xl font-medium">{folder.name}</h1>
                            {/* <p className="text-sm text-gray-500">Empty folder</p> */}
                        </div>
                    </div>
                ) : null}
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
                reference={{
                    parentFolderId: folder?.id || '',
                    parentFolderName: folder?.name || '',
                }}
            />
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => handleCreateFileSuccess()}
                reference={{
                    parentFolderId: folder?.id || '',
                    parentFolderName: folder?.name || '',
                }}
            />
        </>
    );
};

export default ActionsBar;