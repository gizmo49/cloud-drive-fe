import { FaFolder, FaEllipsisV } from 'react-icons/fa';
import styles from './Folders.module.scss';
import Link from 'next/link';

export interface IFolderItem {
    id: string;
    name: string;
    stats: string;
}

interface FoldersProps {
    folders: IFolderItem[];
}

const Folders = ({ folders }: FoldersProps) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Folders</h2>
            <div className={styles.folderGrid}>
                {folders.map((folder, index) => (
                    <div key={index} className={styles.folderCard}>
                        <Link href={`/drive/${folder.id}`} className={styles.folderContent}>
                            <FaFolder className={styles.folderIcon} />
                            <div className={styles.folderInfo}>
                                <div className={styles.folderName}>{folder.name}</div>
                                <div className={styles.folderStats}>{folder.stats}</div>
                            </div>
                            <button className={styles.menuButton} onClick={(e) => e.preventDefault()}>
                                <FaEllipsisV />
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Folders;