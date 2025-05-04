'use client';

import { FaChevronRight } from 'react-icons/fa6';
import styles from './Breadcrumb.module.scss';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className={styles.breadcrumb}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {index > 0 && <FaChevronRight className={styles.separator} />}
          <span 
            className={item.onClick ? styles.clickable : ''}
            onClick={item.onClick}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;