import React, { useMemo } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface YearSelectProps {
    value: string;
    onChange: (selectedYear: string) => void;
    className?: string;
}

const YearSelect: React.FC<YearSelectProps> = ({ value, onChange, className }) => {
    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 40;
        return Array.from({ length: 41 }, (_, index) => (startYear + index).toString());
    }, []);

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={`min-w-[180px] ${className}`}>
                <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
                {years.map((year) => (
                    <SelectItem key={year} value={year}>
                        {year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default YearSelect;