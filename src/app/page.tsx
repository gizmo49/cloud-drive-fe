'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function Home() {
  useEffect(() => {
    redirect(ROUTES.AUTH.SIGN_IN);
  }, []);

}
