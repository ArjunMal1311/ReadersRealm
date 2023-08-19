import React from 'react';
import { IconType } from 'react-icons';

interface CategoryItemProps {
    icon: IconType,
    label: string;
    selected?: boolean;
    description: string;
    onClick: (value: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ icon: Icon, label, selected, onClick, description }) => {
    return (
        <div onClick={() => onClick(label)} className={`rounded-xl border-2 p-4 flex flex-col gap-3 cursor-pointer hover:bg-black hover:text-white transition duration-300 ease-in-out transform ${selected ? 'bg-black text-white' : 'border-neutral-200'}`}>
            <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <Icon size={30} />
                </div>
            </div>
            <div className="text-lg font-semibold">{label}</div>
            <div className="">{description}</div>
        </div>
    );
};

export default CategoryItem;
