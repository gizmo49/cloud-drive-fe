'use client';

import { FaFileWord, FaFileExcel, FaFilePdf, FaFilePowerpoint, FaFileImage, FaEye } from 'react-icons/fa';
import { Table } from '../utils/Table/Table';
import styles from './FilesTable.module.scss';
import { IFileData } from './types';


interface FilesTableProps {
    files: IFileData[];
    onSort?: (field: string) => void;
    onSelect?: (ids: string[]) => void;
    onPreview?: (file: IFileData) => void;
}


const getFileIcon = (type: string) => {
    const icons = {
        word: <FaFileWord className={styles.wordIcon} />,
        excel: <FaFileExcel className={styles.excelIcon} />,
        pdf: <FaFilePdf className={styles.pdfIcon} />,
        powerpoint: <FaFilePowerpoint className={styles.powerpointIcon} />,
        image: <FaFileImage className={styles.imageIcon} />
    };
    return icons[type as keyof typeof icons] || null;
};

const FilesTable = ({ files, onSort, onSelect, onPreview }: FilesTableProps) => {
    const columns = [
        {
            key: 'name',
            header: 'Name',
            colSpan: 5,
            render: (file: IFileData) => (
                <div className={styles.fileInfo}>
                    {getFileIcon(file.icon)}
                    <div>
                        <div className={styles.fileName}>{file.name}</div>
                        <div className={styles.fileMeta}>
                            {file.size} · {file.modified}
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'size',
            header: 'Size',
            colSpan: 2,
            mobileHidden: true
        },
        {
            key: 'type',
            header: 'Type',
            colSpan: 2,
            mobileHidden: true
        },
        {
            key: 'modified',
            header: 'Modified',
            colSpan: 2,
            mobileHidden: true
        },
        {
            key: 'actions',
            header: '',
            colSpan: 1,
            render: (file: IFileData) => (
                <button
                    onClick={() => onPreview?.(file)}
                    className={styles.previewButton}
                >
                    <FaEye className={styles.icon} />
                </button>
            )
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Files</h2>
                <div className={styles.actions}>
                    <button
                        className={styles.sortButton}
                        onClick={() => onSort?.('modified')}
                    >
                        Sort by: Last modified
                    </button>
                </div>
            </div>
            <Table<IFileData>
                columns={columns}
                data={files}
                selectable={false}
                onSelect={onSelect}
                onSort={onSort}
                title="Files"
            />
        </div>
    );
};

export default FilesTable;