// components/ui/multi-select-filter.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

export function MultiSelectFilter({
  options,
  selected, // Array of currently selected values
  onSelectionChange, // Function to call when selection changes
  placeholder,
}) {
  const [open, setOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState(new Set(selected));

  useEffect(() => {
    setInternalSelected(new Set(selected));
  }, [selected]);

  const handleCheckboxChange = (value, checked) => {
    const newSelection = new Set(internalSelected);
    if (checked) {
      newSelection.add(value);
    } else {
      newSelection.delete(value);
    }
    setInternalSelected(newSelection);
    onSelectionChange(Array.from(newSelection)); // Pass back array
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setInternalSelected(new Set(options.map((opt) => opt.value)));
      onSelectionChange(options.map((opt) => opt.value));
    } else {
      setInternalSelected(new Set());
      onSelectionChange([]);
    }
  };

  const isAllSelected = internalSelected.size === options.length && options.length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 border-dashed flex items-center gap-1">
          <span>{placeholder}</span>
          {internalSelected.size > 0 && (
            <>
              <span className="ml-1 text-xs text-muted-foreground">
                ({internalSelected.size})
              </span>
              <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
          {internalSelected.size === 0 && (
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="flex flex-col gap-1 p-2">
          {options.length > 0 && (
            <div className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 rounded-md">
             
              <label
                htmlFor={`${placeholder}-all`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
              </label>
            </div>
          )}
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 rounded-md"
            >
              <Checkbox
                id={`${placeholder}-${option.value}`}
                checked={internalSelected.has(option.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.value, checked)
                }
              />
              <label
                htmlFor={`${placeholder}-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}