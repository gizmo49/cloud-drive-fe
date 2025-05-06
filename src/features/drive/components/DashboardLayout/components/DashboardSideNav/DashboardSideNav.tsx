'use client';

import { useState } from 'react';
import { FaPlus, FaGoogleDrive } from 'react-icons/fa';
import { FaFolderPlus, FaUpload, FaFileCirclePlus } from 'react-icons/fa6';
import { FaRegUser, FaRegClock, FaRegStar, FaRegTrashCan, FaBars } from 'react-icons/fa6';
import styles from './DashboardSideNav.module.scss';
import CreateFolderModal from '../../../CreateFolderModal/CreateFolderModal';
import UploadModal from '../../../UploadModal/UploadModal';

const navigationItems = [
    { icon: FaGoogleDrive, label: 'My Drive', active: true },
    { icon: FaRegUser, label: 'Shared with me' },
    { icon: FaRegClock, label: 'Recent' },
    { icon: FaRegStar, label: 'Starred' },
    { icon: FaRegTrashCan, label: 'Trash' }
];

const tags = [
    { color: 'bg-red-500', label: 'Important' },
    { color: 'bg-yellow-500', label: 'Work' },
    { color: 'bg-green-500', label: 'Personal' }
];

export const DashboardSideNav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            {/* Mobile Navigation */}
            <div className={styles.mobileNav}>
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileMenuContent}>
                        {navigationItems.map((item, index) => (
                            <button
                                key={index}
                                className={`${styles.mobileNavItem} ${item.active ? styles.active : ''}`}
                            >
                                <item.icon className={styles.icon} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.uploadSection}>
                    <button onClick={toggleDropdown} className={styles.uploadButton}>
                        <FaPlus className={styles.icon} />
                        <span>New</span>
                    </button>

                    {isDropdownOpen && (
                        <div className={styles.uploadDropdown}>
                            <div className={styles.dropdownContent}>
                                <button 
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                        setIsCreateFolderModalOpen(true);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <FaFolderPlus className={styles.icon} />
                                    New Folder
                                </button>
                                <button 
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                        setIsUploadModalOpen(true);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <FaUpload className={styles.icon} />
                                    Upload File
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <nav className={styles.navigation}>
                    <ul>
                        {navigationItems.map((item, index) => (
                            <li key={index}>
                                <button
                                    className={`${styles.navItem} ${item.active ? styles.active : ''}`}
                                >
                                    <item.icon className={styles.icon} />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.tagsSection}>
                        <div className={styles.tagsTitle}>Tags</div>
                        <ul>
                            {tags.map((tag, index) => (
                                <li key={index}>
                                    <button className={styles.tagItem}>
                                        <span className={`${styles.tagDot} ${tag.color}`} />
                                        <span>{tag.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <div className={styles.storageSection}>
                    <div className={styles.storageInfo}>
                        <div className={styles.storageText}>Storage</div>
                        <div className={styles.storageSize}>7.5 GB / 15 GB</div>
                    </div>
                    <div className={styles.storageBar}>
                        <div className={styles.storageProgress} style={{ width: '50%' }} />
                    </div>
                    <button className={styles.upgradeButton}>
                        Upgrade Storage
                    </button>
                </div>
            </aside>

            <CreateFolderModal
                isOpen={isCreateFolderModalOpen}
                onClose={() => setIsCreateFolderModalOpen(false)}
                onSubmit={(folderData) => {
                    console.log('Creating folder:', folderData);
                    // Implement folder creation logic here
                }}
            />
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </>
    );
};