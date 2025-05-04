'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AuthLink.module.scss';
import { ROUTES } from '@/constants/routes';

export function AuthLink() {
  const pathname = usePathname();
  const isSignInPage = pathname === ROUTES.AUTH.SIGN_IN;

  return (
    <p className={styles.text}>
      {isSignInPage ? (
        <>
          Don't have an account?{' '}
          <Link href={ROUTES.AUTH.SIGN_UP} className={styles.link}>
            Sign up
          </Link>
        </>
      ) : (
        <>
          Already have an account?{' '}
          <Link href={ROUTES.AUTH.SIGN_IN} className={styles.link}>
            Sign in
          </Link>
        </>
      )}
    </p>
  );
}