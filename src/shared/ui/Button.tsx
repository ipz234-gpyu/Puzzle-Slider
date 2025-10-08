import "../styles/Button.css";

interface ButtonProps {
    label: string;
    onClick?: () => void;
}

export const Button = ({label, onClick}: ButtonProps) => {
    return (
        <button className="ui-button" onClick={onClick}>
            {label}
        </button>
    );
};