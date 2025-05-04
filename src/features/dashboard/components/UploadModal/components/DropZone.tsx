'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import styles from './DropZone.module.scss';

interface DropZoneProps {
    onFilesAdded: (files: File[]) => void;
}

const DropZone = ({ onFilesAdded }: DropZoneProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onFilesAdded(acceptedFiles);
    }, [onFilesAdded]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div 
            {...getRootProps()} 
            className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
        >
            <input {...getInputProps()} />
            <FaCloudUploadAlt className={styles.icon} />
            <div className={styles.text}>
                <p className={styles.mainText}>Drag and drop files here</p>
                <p className={styles.orText}>or</p>
                <button type="button" className={styles.browseButton}>
                    Browse Files
                </button>
            </div>
        </div>
    );
};

export default DropZone;