"use client";

import { Search as SearchIcon, X } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  onClear,
  inputRef,
  totalResults,
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 border-b border-foreground/40 pb-4">
        <SearchIcon className="h-5 w-5 shrink-0 text-foreground/65" />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search for something..."
          className="w-full bg-transparent text-[1.4vw] font-light text-foreground outline-none placeholder:text-foreground/40 max-md:text-[1.3rem]"
        />

        
      </div>

      {!!value && (
        <div className="mt-3 text-sm text-foreground/45">
          {totalResults} result{totalResults === 1 ? "" : "s"}
        </div>
      )}
    </div>
  );
}