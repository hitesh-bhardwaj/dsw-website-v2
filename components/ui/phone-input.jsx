import React from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import PhoneNumberInput, { getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const PhoneInput = React.forwardRef(({ className, onChange, value, ...props }, ref) => {
  return (
    <PhoneNumberInput
      ref={ref}
      className={cn("flex", className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      smartCaret={false}
      value={value || undefined}
      onChange={(val) => onChange?.(val || "")}
      {...props}
    />
  );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef(({ className, ...props }, ref) => (
  <>
    <div className="relative w-full h-full">
      <input
        ref={ref}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground  !text-[1.1vw] max-md:!text-[2.7vw] max-sm:!text-[3.5vw] max-md:px-[4vw] selection:text-primary-foreground flex h-15 max-md:h-18 max-sm:h-13 w-full min-w-0 px-[2vw] max-sm:px-[4vw]  text-base shadow-xs  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border border-black/10 rounded-full bg-white/50 text-[#111] placeholder:text-[#111] inputBlock",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      />
    </div>
  </>
));
InputComponent.displayName = "InputComponent";

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }) => {
  const scrollAreaRef = React.useRef(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCountrySelect = React.useCallback((country) => {
    try {
      // Use setTimeout to defer the onChange call to avoid focus issues
      setTimeout(() => {
        if (onChange && typeof onChange === 'function') {
          onChange(country);
        }
      }, 0);
      setIsOpen(false);
    } catch (error) {
      console.error('Error selecting country:', error);
      setIsOpen(false);
    }
  }, [onChange]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal className="!z-[1001]">
      <PopoverTrigger asChild >
        <Button
          type="button"
          variant="outline"
          className="flex justify-center gap-[1.5vw] max-md:h-18! border border-black/10 shadow-none px-[2vw] pb-2 focus:z-900 h-15! max-sm:h-13! max-sm:w-[35%] max-sm:gap-[4vw]  w-[20%] mr-[0.8vw] max-sm:mr-[2.5vw] bg-white/50 flagblock  rounded-full cursor-pointer hover:bg-white/50"
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <ChevronDown
            className={cn(
              "-mr-2 size-4 opacity-50 max-md:size-[3vw]",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] max-md:ml-[10vw] max-sm:ml-[10vw] p-0 bg-white backdrop-blur-md border border-[#111]/10 rounded-[1.2vw] overflow-hidden">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(val) => {
              setSearchValue(val);
              setTimeout(() => {
                const viewport = scrollAreaRef.current?.querySelector(
                  "[data-radix-scroll-area-viewport]"
                );
                if (viewport) viewport.scrollTop = 0;
              }, 0);
            }}
            placeholder="Search country..."
            
          />
          <CommandList>
            <ScrollArea data-lenis-prevent ref={scrollAreaRef} className="h-72 bg-white pl-[1vw]  backdrop-blur-md">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList?.map((entry) => {
                  const { value: country, label: countryName } = entry || {};
                  if (!country) return null;
                  return (
                    <CommandItem
                      key={country}
                      className="gap-2"
                      onSelect={() => handleCountrySelect(country)}
                    >
                      <FlagComponent country={country} countryName={countryName} />
                      <span className="flex-1 text-sm ">{countryName}</span>
                      <span className="text-sm ">
                        +{getCountryCallingCode(country)}
                      </span>
                      <CheckIcon
                        className={`ml-auto size-4 ${
                          country === selectedCountry ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country];
  return (
    <span className="flex h-6 w-8 overflow-hidden [&_svg:not([class*='size-'])]:size-full ">
      {Flag ? <Flag title={countryName} /> : null}
    </span>
  );
};

export { PhoneInput };