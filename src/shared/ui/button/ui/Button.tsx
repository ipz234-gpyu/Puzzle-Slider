import { forwardRef } from "react";
import styles from './styles.module.css';
import type { ButtonProps } from "../index";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
         className = '',
         variant = 'primary',
         size = 'md',
         isLoading = false,
         children,
         disabled,
         ...props
     }, ref) => {

        const rootClasses = [
            styles.button,
            styles[variant],
            styles[size],
            className
        ].join(' ');

        return (
            <button
                ref={ref}
                className={rootClasses}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? '...' : children}
            </button>
        );
    }
);

Button.displayName = 'Button';