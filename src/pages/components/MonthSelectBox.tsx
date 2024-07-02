import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export enum Month {
    JANUARY = 'JANUARY',
    FEBRUARY = 'FEBRUARY',
    MARCH = 'MARCH',
    APRIL = 'APRIL',
    MAY = 'MAY',
    JUNE = 'JUNE',
    JULY = 'JULY',
    AUGUST = 'AUGUST',
    SEPTEMBER = 'SEPTEMBER',
    OCTOBER = 'OCTOBER',
    NOVEMBER = 'NOVEMBER',
    DECEMBER = 'DECEMBER',
}

interface MonthSelectProps {
    value: Month;
    onChange: (selectedMonth: Month) => void;
    className?: string;
}

const MonthSelect: React.FC<MonthSelectProps> = ({ value, onChange, className }) => {
    return (
        <Select value={value} onValueChange={(value) => onChange(value as Month)}>
            <SelectTrigger className={`min-w-[180px] ${className} `}>
                <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
                {Object.values(Month).map((month) => (
                    <SelectItem key={month} value={month}>
                        {month.charAt(0) + month.slice(1).toLowerCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default MonthSelect;