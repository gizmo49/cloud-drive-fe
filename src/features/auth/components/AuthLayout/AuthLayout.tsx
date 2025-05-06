'use client';

import { ReactNode } from 'react';
import styles from './AuthLayout.module.scss';
import { Toaster } from 'react-hot-toast';

interface AuthLayoutProps {
    title: string;
    description?: React.ReactNode;
    children: ReactNode;
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-white flex">
            <Toaster />
            <div className="hidden lg:flex lg:w-1/2 bg-blue-50 items-center justify-center">
                <div className="max-w-md px-8">
                    <h1 className="mt-8 text-4xl font-bold text-gray-900">Welcome to CloudDrive</h1>
                    <p className="mt-4 text-lg text-gray-600">Store, share, and collaborate on files and folders from any mobile device, tablet, or computer</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 lg:flex-none">
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{title}</h2>
                        {description && <p className={styles.description}>{description}</p>}
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
}