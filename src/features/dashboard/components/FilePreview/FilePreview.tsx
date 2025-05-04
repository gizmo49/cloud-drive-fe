'use client';

import { useState } from 'react';
import { 
    FaArrowLeft, 
    FaDownload, 
    FaShare, 
    FaEllipsisVertical,
    FaMinus,
    FaPlus,
    FaChevronLeft,
    FaChevronRight,
    FaRotateRight,
    FaExpand
} from 'react-icons/fa6';
import Modal from '../utils/Modal/Modal';
import styles from './FilePreview.module.scss';

interface FilePreviewProps {
    isOpen: boolean;
    onClose: () => void;
    file: {
        name: string;
        type: string;
        size: string;
        pages?: number;
        url: string;
    };
}

const FilePreview = ({ isOpen, onClose, file }: FilePreviewProps) => {
    const [zoom, setZoom] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
    
    const handleNextPage = () => {
        if (file.pages && currentPage < file.pages) {
            setCurrentPage(prev => prev + 1);
        }
    };
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            size="lg" 
            // className={styles.previewModal}
        >
            <div className={styles.previewContainer}>
                {/* Preview Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.fileInfo}>
                            <button onClick={onClose} className={styles.backButton}>
                                <FaArrowLeft />
                            </button>
                            <div>
                                <h1 className={styles.fileName}>{file.name}</h1>
                                <div className={styles.fileDetails}>
                                    <span>{file.type}</span>
                                    <span className={styles.separator}>·</span>
                                    <span>{file.size}</span>
                                    {file.pages && (
                                        <>
                                            <span className={styles.separator}>·</span>
                                            <span>{file.pages} pages</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.actionButton}>
                                <FaDownload />
                            </button>
                            <button className={styles.actionButton}>
                                <FaShare />
                            </button>
                            <button className={styles.actionButton}>
                                <FaEllipsisVertical />
                            </button>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className={styles.toolbar}>
                        <div className={styles.toolbarGroup}>
                            <div className={styles.zoomControls}>
                                <button onClick={handleZoomOut}>
                                    <FaMinus />
                                </button>
                                <span>{zoom}%</span>
                                <button onClick={handleZoomIn}>
                                    <FaPlus />
                                </button>
                            </div>
                            {file.pages && (
                                <div className={styles.pageControls}>
                                    <button onClick={handlePrevPage}>
                                        <FaChevronLeft />
                                    </button>
                                    <span>Page {currentPage} of {file.pages}</span>
                                    <button onClick={handleNextPage}>
                                        <FaChevronRight />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={styles.toolbarActions}>
                            <button className={styles.toolbarButton}>
                                <FaRotateRight />
                            </button>
                            <button className={styles.toolbarButton}>
                                <FaExpand />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Content */}
                <div className={styles.content}>
                    <div className={styles.previewWrapper}>
                        <div className={styles.previewFrame}>
                            <iframe 
                                src={`https://docs.google.com/viewer?url=${encodeURIComponent(file.url)}&embedded=true`}
                                className={styles.googleViewer}
                                style={{ transform: `scale(${zoom / 100})` }}
                            />
                        </div>
                        {file.pages && (
                            <div className={styles.pageNumber}>
                                Page {currentPage} of {file.pages}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default FilePreview;