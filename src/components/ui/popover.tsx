"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type PopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within Popover.");
  }

  return context;
}

type PopoverProps = {
  children: React.ReactNode;
};

export function Popover({ children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <PopoverContext.Provider value={value}>
      <div ref={containerRef} className="relative inline-flex">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

type PopoverTriggerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export function PopoverTrigger({ children, onClick, ...props }: PopoverTriggerProps) {
  const { open, setOpen } = usePopoverContext();

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(!open);
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

type PopoverContentProps = React.HTMLAttributes<HTMLDivElement>;

export function PopoverContent({ children, className = "", ...props }: PopoverContentProps) {
  const { open } = usePopoverContext();

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      className={`absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-xl border border-[#2a2420]/15 bg-white p-3 text-left text-xs leading-5 text-[#4a423b] shadow-[0_14px_30px_rgba(42,36,32,0.15)] ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
