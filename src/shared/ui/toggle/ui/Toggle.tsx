import {forwardRef, type InputHTMLAttributes} from 'react';
import styles from './styles.module.css';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
    ({label, className = '', id, ...props}, ref) => {
        const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <label htmlFor={toggleId} className={`${styles.wrapper} ${className}`}>
                {label && <span className={styles.label}>{label}</span>}
                <div className={styles.toggleContainer}>
                    <input
                        id={toggleId}
                        type="checkbox"
                        ref={ref}
                        className={styles.input}
                        {...props}
                    />
                    <span className={styles.slider} />
                </div>
            </label>
        );
    }
);

Toggle.displayName = 'Toggle';
