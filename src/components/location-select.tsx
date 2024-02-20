import { Button } from "./ui/button";
import { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";

export function LocationSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const locations = [
    { value: "tropical", label: "Tropical Nomad Coworking Space" },
    { value: "noble", label: "Noble Boxing Club" },
    { value: "revolber", label: "Revolver Canggu" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? locations.find((loc) => loc.value === value)?.label
            : "Select location..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search location..." className="h-9" />
          <CommandEmpty>No location found.</CommandEmpty>
          <CommandGroup>
            {locations.map((location) => (
              <CommandItem
                key={location.value}
                value={location.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {location.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === location.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
