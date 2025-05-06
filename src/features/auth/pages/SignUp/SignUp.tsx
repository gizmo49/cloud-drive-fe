'use client';

import { FormEvent, useState } from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthForm, AuthFormData } from '../../components/AuthForm/AuthForm';
import { AuthLink } from '../../components/AuthLink/AuthLink';
import { auth } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { ROUTES } from '@/constants/routes';

export default function SignUp() {
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

            await auth.register(formData.email, formData.password);
            toast.success('Account created successfully!');
            router.push(ROUTES.DASHBOARD.HOME);
        } catch (error:any) {
            toast.error(error?.response?.data.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: keyof AuthFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AuthLayout
            title="Create your account"
            description={`Create an account to access cloud drive`}>
            <AuthForm
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
                submitButtonText="Sign up"
                isLoading={isLoading}
            />
            <AuthLink />
        </AuthLayout>
    );
}