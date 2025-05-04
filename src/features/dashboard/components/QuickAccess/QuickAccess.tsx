import { 
    FaFileWord, 
    FaFileExcel, 
    FaFilePdf, 
    FaFilePowerpoint 
} from 'react-icons/fa';
import styles from './QuickAccess.module.scss';

const quickAccessItems = [
    {
        icon: <FaFileWord className="text-blue-600 text-4xl" />,
        name: "Project Proposal.docx",
        editedTime: "Edited 2 hours ago"
    },
    {
        icon: <FaFileExcel className="text-green-600 text-4xl" />,
        name: "Budget 2025.xlsx",
        editedTime: "Edited yesterday"
    },
    {
        icon: <FaFilePdf className="text-red-600 text-4xl" />,
        name: "Contract.pdf",
        editedTime: "Edited 3 days ago"
    },
    {
        icon: <FaFilePowerpoint className="text-orange-600 text-4xl" />,
        name: "Presentation.pptx",
        editedTime: "Edited 5 days ago"
    }
];

const QuickAccess = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Quick Access</h2>
            <div className={styles.quickAccessGrid}>
                {quickAccessItems.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.iconContainer}>
                            {item.icon}
                        </div>
                        <div className={styles.fileName}>{item.name}</div>
                        <div className={styles.timeStamp}>{item.editedTime}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickAccess;