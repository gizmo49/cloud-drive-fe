'use client';

import { ChangeEvent } from 'react';
import styles from './FormInput.module.scss';

interface FormInputProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password';
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
}

export function FormInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = false,
  className = ''
}: FormInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`${styles.input} ${className}`}
      />
    </div>
  );
}