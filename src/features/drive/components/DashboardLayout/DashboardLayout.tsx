import { Toaster } from "react-hot-toast";
import { DashboardHeader } from "./components/DashboardHeader/DashboardHeader";
import { DashboardSideNav } from "./components/DashboardSideNav/DashboardSideNav";
import styles from './DashboardLayout.module.scss';

interface DashboardLayoutProps {
    children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className={styles.container}>
            <DashboardHeader />
            <Toaster />
            <div className={styles.content}>
                <DashboardSideNav />
                <main id="main-content" className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}