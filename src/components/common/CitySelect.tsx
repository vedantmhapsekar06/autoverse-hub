import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { cities } from '@/data/cars';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface CitySelectProps {
  value: string;
  onChange: (city: string) => void;
}

export const CitySelect = ({ value, onChange }: CitySelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent" />
          <span>{value || 'Select City'}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-64 w-48 overflow-y-auto bg-popover">
        {cities.map((city) => (
          <DropdownMenuItem
            key={city}
            onClick={() => onChange(city)}
            className={value === city ? 'bg-secondary' : ''}
          >
            {city}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
