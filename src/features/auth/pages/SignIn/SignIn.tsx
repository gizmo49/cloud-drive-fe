'use client';

import { FormEvent, useState } from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthForm, AuthFormData } from '../../components/AuthForm/AuthForm';
import { AuthLink } from '../../components/AuthLink/AuthLink';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function SignIn() {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign in logic
    console.log('Sign in:', formData);
  };

  const handleChange = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AuthLayout title="Sign in to your account"
      description={
        <>
          Don't have an account?{' '}
          <Link href={ROUTES.AUTH.SIGN_UP} className="text-primary-600 hover:text-primary-700 font-medium">
            Create one now
          </Link>
        </>
      }>

      <AuthForm
        formData={formData}
        onSubmit={handleSubmit}
        onChange={handleChange}
        submitButtonText="Sign in"
      />
      <AuthLink />
    </AuthLayout>
  );
}