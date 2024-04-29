import React from "react";

interface IButton {
  children: string;
  onClick?: () => void;
  className?: string;
}
const Button = ({ children, onClick, className }: IButton) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
