'use client';

import { ReactNode } from 'react';
import styles from './Table.module.scss';

interface Column<T> {
    key: string;
    header: string;
    colSpan?: number;
    render?: (item: T) => ReactNode;
    mobileHidden?: boolean;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    selectable?: boolean;
    onSelect?: (selectedIds: string[]) => void;
    onSort?: (field: string) => void;
    title?: string;
    className?: string;
}

export function Table<T extends { id: string }>({ 
    columns, 
    data, 
    selectable = false,
    onSelect,
    onSort,
    title,
    className 
}: TableProps<T>) {
    return (
        <div className={styles.container}>
    
            
            <div className={`${styles.table} ${className || ''}`}>
                <div className={styles.tableHeader}>
                    {selectable && (
                        <div className={`${styles.headerCell} ${styles.checkboxCell}`}>
                            <input type="checkbox" className={styles.checkbox} />
                        </div>
                    )}
                    {columns.map((column) => (
                        <div 
                            key={column.key}
                            className={styles.headerCell}
                            style={{ gridColumn: `span ${column.colSpan || 1}` }}
                        >
                            {column.header}
                        </div>
                    ))}
                </div>
                
                <div className={styles.tableBody}>
                    {data.map((item) => (
                        <div key={item.id} className={styles.tableRow}>
                            {selectable && (
                                <div className={`${styles.cell} ${styles.checkboxCell}`}>
                                    <input type="checkbox" className={styles.checkbox} />
                                </div>
                            )}
                            {columns.map((column) => (
                                <div 
                                    key={column.key}
                                    className={`${styles.cell} ${column.mobileHidden ? styles.hiddenMobile : ''}`}
                                    style={{ gridColumn: `span ${column.colSpan || 1}` }}
                                >
                                    {column.render ? column.render(item) : String(item[column.key as keyof T] ?? '')}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}