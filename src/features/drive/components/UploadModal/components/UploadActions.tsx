'use client';

import styles from './UploadActions.module.scss';

interface UploadActionsProps {
    fileCount: number;
    onCancel: () => void;
}

const UploadActions = ({ fileCount, onCancel }: UploadActionsProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.count}>
                {fileCount} files selected
            </div>
            <div className={styles.buttons}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={onCancel}
                >
                    Cancel
                </button>

            </div>
        </div>
    );
};

export default UploadActions;