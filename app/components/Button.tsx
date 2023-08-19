"use client"

import React from 'react'
import { IconType } from 'react-icons';

interface InputProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<InputProps> = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`mt-2  mr-2 w-full ${outline ? 'border border-gray-900 text-black hover:bg-gray-900 hover:text-white'
                : 'bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black'
                } ${small ? 'py-1 px-2 text-sm' : 'py-2 px-4'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } flex items-center justify-center rounded-md focus:outline-none`}
        >
            {Icon && <Icon className={`mr-2 ${small ? 'text-sm' : 'text-base'}`} />}
            {label}
        </button>
    )
}

export default Button;
