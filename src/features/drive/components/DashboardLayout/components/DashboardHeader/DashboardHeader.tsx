'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaCloud } from 'react-icons/fa';
import styles from './DashboardHeader.module.scss';
import { auth } from '@/api/auth';

export const DashboardHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <FaCloud className="text-xl" />
          </div>
          <div className={styles.logoText}>
            <div className={styles.title}>CloudDrive</div>
            <div className={styles.subtitle}>Your personal cloud storage</div>
          </div>
        </div>
        <div className={styles.actionsContainer}>
          <div className={styles.userMenuContainer}>
            <button
              onClick={toggleDropdown}
              className={styles.avatarButton}
            >
              <Image
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                alt="User avatar"
                width={36}
                height={36}
              />
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                {/* <div className={styles.userInfo}>
                  <div className={styles.userName}>John Doe</div>
                  <div className={styles.userEmail}>john.doe@example.com</div>
                </div> */}
                <div className={styles.menuItems}>
                  {/* <button className={styles.menuItem}>Profile</button>
                  <button className={styles.menuItem}>Settings</button> */}
                  <button 
                    className={`${styles.menuItem} ${styles.signOut}`}
                    onClick={() => auth.logout()}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};