import {forwardRef, type SelectHTMLAttributes, type ReactNode} from 'react';
import styles from './styles.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({label, error, children, className = '', id, ...props}, ref) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className={styles.wrapper}>
                {label && (
                    <label htmlFor={selectId} className={styles.label}>
                        {label}
                    </label>
                )}
                <select
                    id={selectId}
                    ref={ref}
                    className={`${styles.select} ${error ? styles.errorSelect : ''} ${className}`}
                    {...props}
                >
                    {children}
                </select>
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        );
    }
);

Select.displayName = 'Select';
