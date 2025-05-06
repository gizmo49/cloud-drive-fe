'use client';

import React from 'react';
import styles from './LoadingSkeleton.module.scss';

const repeat = (count: number, callback: (i: number) => React.ReactNode) =>
  Array.from({ length: count }, (_, i) => callback(i));

export default function LoadingSkeleton() {
  return (
    <div className={styles.skeletonRoot}>


      <div className="flex flex-1 overflow-hidden">
        {/* <aside className={styles.sidebar}>
          <div className="p-4">
            <div className={styles.buttonLarge} />
          </div>
          <nav className="mt-2 flex-1">
            <div className="px-4 space-y-2">
              {repeat(4, i => (
                <div key={i} className={styles.buttonMedium} />
              ))}
            </div>
            <div className="mt-6 px-4">
              <div className={styles.labelSmall} />
              <div className="space-y-2">
                {repeat(3, i => (
                  <div key={i} className={styles.buttonSmall} />
                ))}
              </div>
            </div>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className={styles.lineFull} />
            <div className={styles.lineThin} />
            <div className="mt-4">
              <div className={styles.labelMedium} />
            </div>
          </div>
        </aside> */}

        {/* Main Content */}
        <main className={styles.main}>
          <div className="p-4 md:p-6">
            {/* Breadcrumb */}
            <div className="flex items-center mb-4">
              <div className={styles.breadcrumbItem} />
              <div className={styles.breadcrumbDivider} />
              <div className={styles.breadcrumbItemWide} />
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className={styles.labelLarge} />
              <div className="flex items-center space-x-2">
                {repeat(3, i => (
                  <div key={i} className={styles.buttonMedium} />
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div className="mb-8">
              <div className={styles.sectionTitle} />
              <div className={styles.quickGrid}>
                {repeat(4, i => (
                  <div key={i} className={styles.quickCard}>
                    <div className={styles.thumbnail} />
                    <div className={styles.lineShort} />
                    <div className={styles.lineThin} />
                  </div>
                ))}
              </div>
            </div>

            {/* Files Table */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className={styles.labelSmall} />
                <div className={styles.lineMedium} />
              </div>
              <div className={styles.table}>
                {/* Header */}
                <div className={styles.tableHeader}>
                  <div className={styles.iconTiny} />
                  {repeat(4, i => (
                    <div key={i} className={styles.tableCol} />
                  ))}
                </div>
                {/* Rows */}
                {repeat(2, i => (
                  <div key={i} className={styles.tableRow}>
                    <div className={styles.iconTiny} />
                    <div className="col-span-11 md:col-span-5 flex items-center">
                      <div className={styles.iconMedium} />
                      <div className="flex-1">
                        <div className={styles.lineShort} />
                        <div className={`${styles.lineThin} md:hidden`} />
                      </div>
                    </div>
                    {repeat(3, j => (
                      <div key={j} className={`${styles.tableCol} hidden md:block`} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

