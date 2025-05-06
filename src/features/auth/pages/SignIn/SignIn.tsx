'use client';

import { FormEvent, useState } from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthForm, AuthFormData } from '../../components/AuthForm/AuthForm';
import { AuthLink } from '../../components/AuthLink/AuthLink';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { auth } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();

  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      
      await auth.login(formData.email, formData.password);
      router.push(ROUTES.DASHBOARD.HOME);
    } catch (error:any) {
      toast.error(error.response?.data?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
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
        isLoading={isLoading}
      />
      <AuthLink />
    </AuthLayout>
  );
}