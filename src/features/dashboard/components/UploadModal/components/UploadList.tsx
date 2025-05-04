'use client';

import { FaFile, FaTimes, FaCheck, FaRedo } from 'react-icons/fa';
import { FileUpload } from '../UploadModal';
import styles from './UploadList.module.scss';

interface UploadListProps {
    files: FileUpload[];
    onRemove: (id: string) => void;
    onRetry: (id: string) => void;
}

const UploadItem = ({ file, onRemove, onRetry }: {
    file: FileUpload;
    onRemove: (id: string) => void;
    onRetry: (id: string) => void;
}) => {
    return (
        <div className={`${styles.item} ${styles[file.status]}`}>
            <div className={styles.itemContent}>
                <FaFile className={styles.fileIcon} />
                <div className={styles.fileInfo}>
                    <div className={styles.fileName}>{file.file.name}</div>
                    {file.status === 'uploading' && (
                        <div className={styles.progress}>
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressFill} 
                                    style={{ width: `${file.progress}%` }} 
                                />
                            </div>
                            <span className={styles.progressText}>{file.progress}%</span>
                        </div>
                    )}
                    {file.status === 'complete' && (
                        <div className={styles.statusText}>Upload complete</div>
                    )}
                    {file.status === 'error' && (
                        <div className={styles.statusText}>Upload failed</div>
                    )}
                </div>
            </div>
            {file.status === 'uploading' && (
                <button 
                    onClick={() => onRemove(file.id)}
                    className={styles.actionButton}
                >
                    <FaTimes />
                </button>
            )}
            {file.status === 'complete' && <FaCheck className={styles.checkIcon} />}
            {file.status === 'error' && (
                <button 
                    onClick={() => onRetry(file.id)}
                    className={styles.actionButton}
                >
                    <FaRedo />
                </button>
            )}
        </div>
    );
};

const UploadList = ({ files, onRemove, onRetry }: UploadListProps) => {
    return (
        <div className={styles.list}>
            {files.map(file => (
                <UploadItem
                    key={file.id}
                    file={file}
                    onRemove={onRemove}
                    onRetry={onRetry}
                />
            ))}
        </div>
    );
};

export default UploadList;