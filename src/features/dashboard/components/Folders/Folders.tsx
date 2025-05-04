import { FaFolder, FaEllipsisV } from 'react-icons/fa';
import styles from './Folders.module.scss';

const folders = [
    {
        name: "Work Documents",
        stats: "8 files · 24 MB"
    },
    {
        name: "Personal",
        stats: "15 files · 128 MB"
    }
];

const Folders = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Folders</h2>
            <div className={styles.folderGrid}>
                {folders.map((folder, index) => (
                    <div key={index} className={styles.folderCard}>
                        <div className={styles.folderContent}>
                            <FaFolder className={styles.folderIcon} />
                            <div className={styles.folderInfo}>
                                <div className={styles.folderName}>{folder.name}</div>
                                <div className={styles.folderStats}>{folder.stats}</div>
                            </div>
                            <button className={styles.menuButton}>
                                <FaEllipsisV />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Folders;