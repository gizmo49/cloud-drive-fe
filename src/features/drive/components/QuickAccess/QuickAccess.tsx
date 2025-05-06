import {
    FaFileWord,
    FaFileExcel,
    FaFilePdf,
    FaFilePowerpoint,
    FaFile,
    FaFileImage
} from 'react-icons/fa';
import styles from './QuickAccess.module.scss';
import { IFileData } from '../../types/file';

interface QuickAccessProps {
    files?: IFileData[];
    onPreview?: (file: IFileData) => void;
}

const getIconComponent = (iconType: string) => {
    const iconMap = {
        word: <FaFileWord className="text-blue-600 text-4xl" />,
        excel: <FaFileExcel className="text-green-600 text-4xl" />,
        pdf: <FaFilePdf className="text-red-600 text-4xl" />,
        powerpoint: <FaFilePowerpoint className="text-orange-600 text-4xl" />,
        image: <FaFileImage className="text-purple-600 text-4xl" />,
        file: <FaFile className="text-gray-600 text-4xl" />
    };
    return iconMap[iconType as keyof typeof iconMap] || iconMap.file;
};

const QuickAccess = ({ files = [], onPreview }: QuickAccessProps) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Quick Access</h2>
            <div className={styles.quickAccessGrid}>
                {files.slice(0, 4).map((file, index) => (
                    <div key={index} className={styles.card}
                        onClick={() => onPreview?.(file)}
                    >
                        <div className={styles.iconContainer}>
                            {getIconComponent(file.icon)}
                        </div>
                        <div className={styles.fileName}>{file.name}</div>
                        <div className={styles.timeStamp}>Edited {file.modified}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickAccess;