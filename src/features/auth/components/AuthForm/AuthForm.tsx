'use client';

import { FormEvent } from 'react';
import { Input } from '../Input/Input';
import styles from './AuthForm.module.scss';
import { Button } from '../Button/Button';

export interface AuthFormData {
  email: string;
  password: string;
}

interface AuthFormProps {
  formData: AuthFormData;
  onSubmit: (e: FormEvent) => void;
  onChange: (field: keyof AuthFormData, value: string) => void;
  submitButtonText: string;
}

export function AuthForm({ formData, onSubmit, onChange, submitButtonText }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input
        placeholder="Email address"
        type="email"
        value={formData.email}
        onChange={(e) => onChange('email', e.target.value)}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={(e) => onChange('password', e.target.value)}
        required
      />
      <Button type="submit" className={styles.submitButton}>
        {submitButtonText}
      </Button>
    </form>
  );
}
