'use client';

import { FormEvent, useState } from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthForm, AuthFormData } from '../../components/AuthForm/AuthForm';
import { AuthLink } from '../../components/AuthLink/AuthLink';

export default function SignUp() {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // TODO: Implement sign up logic
    console.log('Sign up:', formData);
  };

  const handleChange = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AuthLayout title="Create your account"
      description={`Create an account to access cloud drive`}
    >
      <AuthForm
        formData={formData}
        onSubmit={handleSubmit}
        onChange={handleChange}
        submitButtonText="Sign up"
      />
      <AuthLink />
    </AuthLayout>
  );
}