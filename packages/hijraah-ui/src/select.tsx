import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe select configurations
export type SelectVariant = "default" | "error" | "success" | "warning";
export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  group?: string;
}

// Context7 Pattern: Observability - Select interaction metrics
interface SelectObservabilityContext {
  variant: SelectVariant;
  size: SelectSize;
  optionsCount: number;
  isMultiple: boolean;
  isSearchable: boolean;
  selectedCount: number;
  isOpen: boolean;
  hasError: boolean;
  keyboardNavigationCount: number;
  timestamp: number;
}

// Context7 Pattern: Tracing - Select lifecycle events
const createSelectTrace = (context: SelectObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Select:Context7:Trace]", {
      component: "Select",
      interaction: {
        selectionRate:
          context.optionsCount > 0
            ? ((context.selectedCount / context.optionsCount) * 100).toFixed(
                1,
              ) + "%"
            : "0%",
        navigationEngagement: context.keyboardNavigationCount,
      },
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Select style system
class SelectStyleProvider {
  private static readonly VARIANT_STYLES = {
    default: "border-input bg-background focus:ring-ring",
    error: "border-destructive bg-background focus:ring-destructive",
    success: "border-green-500 bg-background focus:ring-green-500",
    warning: "border-orange-500 bg-background focus:ring-orange-500",
  } as const;

  private static readonly SIZE_STYLES = {
    sm: "h-9 px-3 py-2 text-sm",
    md: "h-10 px-3 py-2 text-sm",
    lg: "h-11 px-4 py-3 text-base",
  } as const;

  private static readonly BASE_STYLES =
    "flex w-full items-center justify-between rounded-md border bg-background text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  static getVariantStyle(variant: SelectVariant): string {
    return this.VARIANT_STYLES[variant];
  }

  static getSizeStyle(size: SelectSize): string {
    return this.SIZE_STYLES[size];
  }

  static get baseStyles(): string {
    return this.BASE_STYLES;
  }
}

// Context7 Pattern: Resource Pooling - Keyboard navigation manager
class SelectKeyboardManager {
  private static instance: SelectKeyboardManager;
  private navigationCounts = new Map<string, number>();

  static getInstance(): SelectKeyboardManager {
    if (!SelectKeyboardManager.instance) {
      SelectKeyboardManager.instance = new SelectKeyboardManager();
    }
    return SelectKeyboardManager.instance;
  }

  trackNavigation(selectId: string): number {
    const current = this.navigationCounts.get(selectId) || 0;
    const updated = current + 1;
    this.navigationCounts.set(selectId, updated);
    return updated;
  }

  resetNavigation(selectId: string): void {
    this.navigationCounts.delete(selectId);
  }

  getNavigationCount(selectId: string): number {
    return this.navigationCounts.get(selectId) || 0;
  }
}

// Context7 Pattern: Resumability - Select state management
interface SelectState {
  isOpen: boolean;
  selectedValues: string[];
  focusedIndex: number;
  searchQuery: string;
  filteredOptions: SelectOption[];
}

// Select component with Context7 patterns
interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  variant?: SelectVariant;
  size?: SelectSize;
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  error?: string | boolean;
  disabled?: boolean;
  clearable?: boolean;
  maxSelectedDisplay?: number;
  onChange?: (
    value: string | string[],
    context: SelectObservabilityContext,
  ) => void;
  onOpen?: (context: SelectObservabilityContext) => void;
  onClose?: (context: SelectObservabilityContext) => void;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      options = [],
      value,
      defaultValue,
      variant = "default",
      size = "md",
      multiple = false,
      searchable = false,
      placeholder = "Select option...",
      error = false,
      disabled = false,
      clearable = false,
      maxSelectedDisplay = 3,
      onChange,
      onOpen,
      onClose,
      ...props
    },
    ref,
  ) => {
    const selectRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const keyboardManagerRef = React.useRef(
      SelectKeyboardManager.getInstance(),
    );
    const componentId = React.useRef(
      `select-${Math.random().toString(36).substr(2, 9)}`,
    );

    // Context7 Pattern: Resumability - State management
    const [selectState, setSelectState] = React.useState<SelectState>(() => {
      const initialValues = Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : value
            ? [value]
            : defaultValue
              ? [defaultValue]
              : [];

      return {
        isOpen: false,
        selectedValues: initialValues,
        focusedIndex: -1,
        searchQuery: "",
        filteredOptions: options,
      };
    });

    const isControlled = value !== undefined;
    const currentValues = isControlled
      ? Array.isArray(value)
        ? value
        : value
          ? [value]
          : []
      : selectState.selectedValues;

    const effectiveVariant = error ? "error" : variant;

    // Context7 Pattern: Data-as-Code - Filter options based on search
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !selectState.searchQuery) return options;

      return options.filter(
        (option) =>
          option.label
            .toLowerCase()
            .includes(selectState.searchQuery.toLowerCase()) ||
          option.description
            ?.toLowerCase()
            .includes(selectState.searchQuery.toLowerCase()),
      );
    }, [options, searchable, selectState.searchQuery]);

    // Context7 Pattern: Observability - Create context for callbacks
    const createObservabilityContext = React.useCallback(
      (): SelectObservabilityContext => ({
        variant: effectiveVariant,
        size,
        optionsCount: options.length,
        isMultiple: multiple,
        isSearchable: searchable,
        selectedCount: currentValues.length,
        isOpen: selectState.isOpen,
        hasError: !!error,
        keyboardNavigationCount: keyboardManagerRef.current.getNavigationCount(
          componentId.current,
        ),
        timestamp: Date.now(),
      }),
      [
        effectiveVariant,
        size,
        options.length,
        multiple,
        searchable,
        currentValues.length,
        selectState.isOpen,
        error,
      ],
    );

    // Context7 Pattern: Event-driven Architecture - Toggle dropdown
    const toggleDropdown = React.useCallback(() => {
      const newIsOpen = !selectState.isOpen;
      setSelectState((prev) => ({
        ...prev,
        isOpen: newIsOpen,
        focusedIndex: -1,
      }));

      const context = createObservabilityContext();

      if (newIsOpen) {
        onOpen?.({ ...context, isOpen: true });
      } else {
        onClose?.({ ...context, isOpen: false });
        keyboardManagerRef.current.resetNavigation(componentId.current);
      }

      createSelectTrace({ ...context, isOpen: newIsOpen });
    }, [selectState.isOpen, createObservabilityContext, onOpen, onClose]);

    // Context7 Pattern: Resource Pooling - Keyboard navigation
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return;

        const navigationCount = keyboardManagerRef.current.trackNavigation(
          componentId.current,
        );

        switch (event.key) {
          case "Enter":
          case " ":
            if (!selectState.isOpen) {
              event.preventDefault();
              toggleDropdown();
            } else if (selectState.focusedIndex >= 0) {
              event.preventDefault();
              const option = filteredOptions[selectState.focusedIndex];
              if (option && !option.disabled) {
                handleOptionSelect(option.value);
              }
            }
            break;

          case "ArrowDown":
            event.preventDefault();
            if (!selectState.isOpen) {
              toggleDropdown();
            } else {
              setSelectState((prev) => ({
                ...prev,
                focusedIndex: Math.min(
                  prev.focusedIndex + 1,
                  filteredOptions.length - 1,
                ),
              }));
            }
            break;

          case "ArrowUp":
            event.preventDefault();
            if (selectState.isOpen) {
              setSelectState((prev) => ({
                ...prev,
                focusedIndex: Math.max(prev.focusedIndex - 1, 0),
              }));
            }
            break;

          case "Escape":
            if (selectState.isOpen) {
              event.preventDefault();
              toggleDropdown();
            }
            break;
        }

        createSelectTrace({
          ...createObservabilityContext(),
          keyboardNavigationCount: navigationCount,
        });
      },
      [
        disabled,
        selectState.isOpen,
        selectState.focusedIndex,
        filteredOptions,
        toggleDropdown,
        createObservabilityContext,
      ],
    );

    // Context7 Pattern: Event-driven Architecture - Option selection
    const handleOptionSelect = React.useCallback(
      (optionValue: string) => {
        let newValues: string[];

        if (multiple) {
          newValues = currentValues.includes(optionValue)
            ? currentValues.filter((v) => v !== optionValue)
            : [...currentValues, optionValue];
        } else {
          newValues = [optionValue];
          setSelectState((prev) => ({ ...prev, isOpen: false }));
        }

        if (!isControlled) {
          setSelectState((prev) => ({ ...prev, selectedValues: newValues }));
        }

        const context = createObservabilityContext();
        onChange?.(multiple ? newValues : newValues[0] || "", context);
        createSelectTrace(context);
      },
      [
        multiple,
        currentValues,
        isControlled,
        createObservabilityContext,
        onChange,
      ],
    );

    // Context7 Pattern: Provider Isolation - Style computation
    const selectStyles = React.useMemo(() => {
      return cn(
        SelectStyleProvider.baseStyles,
        SelectStyleProvider.getVariantStyle(effectiveVariant),
        SelectStyleProvider.getSizeStyle(size),
        disabled && "cursor-not-allowed",
        className,
      );
    }, [effectiveVariant, size, disabled, className]);

    // Context7 Pattern: Data-as-Code - Display value computation
    const displayValue = React.useMemo(() => {
      if (currentValues.length === 0) return placeholder;

      const selectedOptions = options.filter((opt) =>
        currentValues.includes(opt.value),
      );

      if (!multiple) {
        return selectedOptions[0]?.label || placeholder;
      }

      if (selectedOptions.length <= maxSelectedDisplay) {
        return selectedOptions.map((opt) => opt.label).join(", ");
      }

      return `${selectedOptions
        .slice(0, maxSelectedDisplay)
        .map((opt) => opt.label)
        .join(", ")} +${selectedOptions.length - maxSelectedDisplay}`;
    }, [currentValues, options, placeholder, multiple, maxSelectedDisplay]);

    // Context7 Pattern: Resource management - Click outside to close
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          if (selectState.isOpen) {
            setSelectState((prev) => ({ ...prev, isOpen: false }));
            onClose?.(createObservabilityContext());
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [selectState.isOpen, onClose, createObservabilityContext]);

    return (
      <div
        ref={(element) => {
          if (selectRef.current !== element) {
            (
              selectRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = element;
          }
          if (typeof ref === "function") {
            ref(element);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              element;
          }
        }}
        className="relative w-full"
        {...props}
      >
        {/* Select Trigger */}
        <div
          className={selectStyles}
          onClick={disabled ? undefined : toggleDropdown}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={selectState.isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <span
            className={cn(
              "block truncate",
              currentValues.length === 0 && "text-muted-foreground",
            )}
          >
            {displayValue}
          </span>

          <span className="ml-2 h-4 w-4 shrink-0">
            <svg
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                selectState.isOpen && "rotate-180",
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>

        {/* Dropdown */}
        {selectState.isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-md shadow-lg">
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-border">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search options..."
                  className="w-full px-3 py-2 text-sm bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring"
                  value={selectState.searchQuery}
                  onChange={(e) =>
                    setSelectState((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                  autoFocus
                />
              </div>
            )}

            {/* Options List */}
            <div className="max-h-60 overflow-auto py-1" role="listbox">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className={cn(
                      "px-3 py-2 text-sm cursor-pointer transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      index === selectState.focusedIndex &&
                        "bg-accent text-accent-foreground",
                      currentValues.includes(option.value) &&
                        "bg-primary/10 text-primary",
                      option.disabled && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={
                      option.disabled
                        ? undefined
                        : () => handleOptionSelect(option.value)
                    }
                    role="option"
                    aria-selected={currentValues.includes(option.value)}
                    aria-disabled={option.disabled}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {option.description}
                          </div>
                        )}
                      </div>
                      {currentValues.includes(option.value) && (
                        <svg
                          className="h-4 w-4 ml-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {typeof error === "string" && error && (
          <div className="mt-1 text-xs text-destructive font-medium">
            {error}
          </div>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

// Context7 Pattern: Factory Pattern - Select creation utilities
export const createSelect = {
  countries: () => ({
    searchable: true,
    placeholder: "Select country...",
    options: [
      { value: "us", label: "United States", description: "North America" },
      { value: "ca", label: "Canada", description: "North America" },
      { value: "uk", label: "United Kingdom", description: "Europe" },
      { value: "de", label: "Germany", description: "Europe" },
      { value: "fr", label: "France", description: "Europe" },
    ] as SelectOption[],
  }),

  visaTypes: () => ({
    placeholder: "Select visa type...",
    options: [
      {
        value: "tourist",
        label: "Tourist Visa",
        description: "Short-term visit",
      },
      { value: "work", label: "Work Visa", description: "Employment-based" },
      {
        value: "student",
        label: "Student Visa",
        description: "Educational purposes",
      },
      {
        value: "family",
        label: "Family Visa",
        description: "Family reunification",
      },
    ] as SelectOption[],
  }),

  languages: () => ({
    multiple: true,
    searchable: true,
    placeholder: "Select languages...",
    options: [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "de", label: "German" },
      { value: "ar", label: "Arabic" },
    ] as SelectOption[],
  }),

  priorities: () => ({
    placeholder: "Select priority...",
    options: [
      { value: "low", label: "Low", description: "Non-urgent" },
      { value: "medium", label: "Medium", description: "Standard timeline" },
      { value: "high", label: "High", description: "Urgent" },
      {
        value: "critical",
        label: "Critical",
        description: "Immediate attention",
      },
    ] as SelectOption[],
  }),
};

// Context7 Pattern: Modularity - Select composition helpers
export const SelectComposed = {
  FieldSelect: ({
    label,
    error,
    required = false,
    ...selectProps
  }: SelectProps & {
    label: string;
    required?: boolean;
  }) => {
    const fieldId = React.useId();

    return (
      <div className="space-y-2">
        <label
          htmlFor={fieldId}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            required && "after:content-['*'] after:text-destructive after:ml-1",
            error && "text-destructive",
          )}
        >
          {label}
        </label>
        <Select id={fieldId} error={error} {...selectProps} />
      </div>
    );
  },
};
