import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe checkbox configurations
export type CheckboxVariant = "default" | "success" | "warning" | "error";
export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxState = "unchecked" | "checked" | "indeterminate";

// Context7 Pattern: Observability - Checkbox interaction metrics
interface CheckboxObservabilityContext {
  variant: CheckboxVariant;
  size: CheckboxSize;
  state: CheckboxState;
  isDisabled: boolean;
  hasError: boolean;
  groupId?: string;
  groupSelectedCount?: number;
  groupTotalCount?: number;
  timestamp: number;
}

// Context7 Pattern: Tracing - Checkbox lifecycle events
const createCheckboxTrace = (context: CheckboxObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Checkbox:Context7:Trace]", {
      component: "Checkbox",
      interaction: {
        state: context.state,
        groupSelection:
          context.groupId &&
          context.groupSelectedCount !== undefined &&
          context.groupTotalCount !== undefined
            ? `${context.groupSelectedCount}/${context.groupTotalCount} selected`
            : "individual",
      },
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Checkbox style system
class CheckboxStyleProvider {
  private static readonly VARIANT_STYLES = {
    default: {
      base: "border-primary text-primary-foreground focus-visible:ring-ring",
      checked: "bg-primary border-primary",
      unchecked: "bg-background border-input",
      indeterminate: "bg-primary border-primary",
    },
    success: {
      base: "border-green-500 text-white focus-visible:ring-green-500",
      checked: "bg-green-500 border-green-500",
      unchecked: "bg-background border-input",
      indeterminate: "bg-green-500 border-green-500",
    },
    warning: {
      base: "border-orange-500 text-white focus-visible:ring-orange-500",
      checked: "bg-orange-500 border-orange-500",
      unchecked: "bg-background border-input",
      indeterminate: "bg-orange-500 border-orange-500",
    },
    error: {
      base: "border-destructive text-destructive-foreground focus-visible:ring-destructive",
      checked: "bg-destructive border-destructive",
      unchecked: "bg-background border-input",
      indeterminate: "bg-destructive border-destructive",
    },
  } as const;

  private static readonly SIZE_STYLES = {
    sm: {
      box: "h-3 w-3",
      icon: "h-2 w-2",
      text: "text-xs",
    },
    md: {
      box: "h-4 w-4",
      icon: "h-3 w-3",
      text: "text-sm",
    },
    lg: {
      box: "h-5 w-5",
      icon: "h-4 w-4",
      text: "text-base",
    },
  } as const;

  private static readonly BASE_STYLES =
    "peer shrink-0 rounded-sm border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  static getVariantStyle(
    variant: CheckboxVariant,
    state: CheckboxState,
  ): string {
    const styles = this.VARIANT_STYLES[variant];
    return `${styles.base} ${styles[state]}`;
  }

  static getSizeStyle(size: CheckboxSize): {
    box: string;
    icon: string;
    text: string;
  } {
    return this.SIZE_STYLES[size];
  }

  static get baseStyles(): string {
    return this.BASE_STYLES;
  }
}

// Context7 Pattern: Resource Pooling - Checkbox group manager
class CheckboxGroupManager {
  private static instance: CheckboxGroupManager;
  private groups = new Map<string, Set<string>>();
  private selectedItems = new Map<string, Set<string>>();
  private callbacks = new Map<
    string,
    ((state: { selected: string[]; total: number }) => void)[]
  >();

  static getInstance(): CheckboxGroupManager {
    if (!CheckboxGroupManager.instance) {
      CheckboxGroupManager.instance = new CheckboxGroupManager();
    }
    return CheckboxGroupManager.instance;
  }

  registerGroup(groupId: string): void {
    if (!this.groups.has(groupId)) {
      this.groups.set(groupId, new Set());
      this.selectedItems.set(groupId, new Set());
      this.callbacks.set(groupId, []);
    }
  }

  addToGroup(groupId: string, itemId: string): void {
    this.registerGroup(groupId);
    this.groups.get(groupId)!.add(itemId);
  }

  removeFromGroup(groupId: string, itemId: string): void {
    this.groups.get(groupId)?.delete(itemId);
    this.selectedItems.get(groupId)?.delete(itemId);
    this.notifyGroupChange(groupId);
  }

  setItemSelected(groupId: string, itemId: string, selected: boolean): void {
    this.registerGroup(groupId);
    const selectedSet = this.selectedItems.get(groupId)!;

    if (selected) {
      selectedSet.add(itemId);
    } else {
      selectedSet.delete(itemId);
    }

    this.notifyGroupChange(groupId);
  }

  getGroupState(groupId: string): {
    selected: string[];
    total: number;
    state: CheckboxState;
  } {
    const total = this.groups.get(groupId)?.size || 0;
    const selected = Array.from(this.selectedItems.get(groupId) || []);

    const state: CheckboxState =
      selected.length === 0
        ? ("unchecked" as CheckboxState)
        : selected.length === total
          ? ("checked" as CheckboxState)
          : ("indeterminate" as CheckboxState);

    return { selected, total, state };
  }

  subscribeToGroup(
    groupId: string,
    callback: (state: { selected: string[]; total: number }) => void,
  ): () => void {
    this.registerGroup(groupId);
    const callbacks = this.callbacks.get(groupId)!;
    callbacks.push(callback);

    return () => {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  private notifyGroupChange(groupId: string): void {
    const callbacks = this.callbacks.get(groupId) || [];
    const state = this.getGroupState(groupId);
    callbacks.forEach((callback) => callback(state));
  }
}

// Context7 Pattern: Resumability - Checkbox internal state management
interface CheckboxInternalState {
  checked: boolean;
  indeterminate: boolean;
  focused: boolean;
}

// Checkbox component with Context7 patterns
interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange" | "onFocus" | "onBlur"
  > {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  error?: string | boolean;
  indeterminate?: boolean;
  groupId?: string;
  onChange?: (checked: boolean, context: CheckboxObservabilityContext) => void;
  onFocus?: (context: CheckboxObservabilityContext) => void;
  onBlur?: (context: CheckboxObservabilityContext) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      label,
      description,
      error = false,
      indeterminate = false,
      groupId,
      checked: controlledChecked,
      defaultChecked,
      disabled = false,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    const groupManagerRef = React.useRef(CheckboxGroupManager.getInstance());
    const componentId = React.useRef(
      `checkbox-${Math.random().toString(36).substr(2, 9)}`,
    );

    // Context7 Pattern: Resumability - Internal state management
    const [checkboxState, setCheckboxState] =
      React.useState<CheckboxInternalState>({
        checked: controlledChecked || defaultChecked || false,
        indeterminate: indeterminate,
        focused: false,
      });

    const isControlled = controlledChecked !== undefined;
    const currentChecked = isControlled
      ? controlledChecked
      : checkboxState.checked;
    const currentIndeterminate = indeterminate || checkboxState.indeterminate;
    const effectiveVariant = error ? "error" : variant;

    // Determine effective state for styling and tracing
    const effectiveState: CheckboxState = currentIndeterminate
      ? ("indeterminate" as CheckboxState)
      : currentChecked
        ? ("checked" as CheckboxState)
        : ("unchecked" as CheckboxState);

    // Context7 Pattern: Resource management - Group registration
    React.useEffect(() => {
      if (groupId) {
        groupManagerRef.current.addToGroup(groupId, componentId.current);
        groupManagerRef.current.setItemSelected(
          groupId,
          componentId.current,
          currentChecked,
        );

        return () => {
          groupManagerRef.current.removeFromGroup(groupId, componentId.current);
        };
      }
    }, [groupId, currentChecked]);

    // Context7 Pattern: Observability - Create context for callbacks
    const createObservabilityContext =
      React.useCallback((): CheckboxObservabilityContext => {
        let groupInfo = {};

        if (groupId) {
          const groupState = groupManagerRef.current.getGroupState(groupId);
          groupInfo = {
            groupId,
            groupSelectedCount: groupState.selected.length,
            groupTotalCount: groupState.total,
          };
        }

        return {
          variant: effectiveVariant,
          size,
          state: effectiveState,
          isDisabled: disabled,
          hasError: !!error,
          timestamp: Date.now(),
          ...groupInfo,
        };
      }, [effectiveVariant, size, effectiveState, disabled, error, groupId]);

    // Context7 Pattern: Event-driven Architecture - Change handling
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;

        if (!isControlled) {
          setCheckboxState((prev) => ({ ...prev, checked: newChecked }));
        }

        if (groupId) {
          groupManagerRef.current.setItemSelected(
            groupId,
            componentId.current,
            newChecked,
          );
        }

        const context = createObservabilityContext();
        onChange?.(newChecked, context);
        createCheckboxTrace(context);
      },
      [isControlled, groupId, createObservabilityContext, onChange],
    );

    // Context7 Pattern: Event-driven Architecture - Focus/blur handling
    const handleFocus = React.useCallback(
      (_event: React.FocusEvent<HTMLInputElement>) => {
        setCheckboxState((prev) => ({ ...prev, focused: true }));

        const context = createObservabilityContext();
        onFocus?.(context);
      },
      [createObservabilityContext, onFocus],
    );

    const handleBlur = React.useCallback(
      (_event: React.FocusEvent<HTMLInputElement>) => {
        setCheckboxState((prev) => ({ ...prev, focused: false }));

        const context = createObservabilityContext();
        onBlur?.(context);
      },
      [createObservabilityContext, onBlur],
    );

    // Context7 Pattern: Provider Isolation - Style computation
    const sizeStyles = CheckboxStyleProvider.getSizeStyle(size);
    const checkboxStyles = React.useMemo(() => {
      return cn(
        CheckboxStyleProvider.baseStyles,
        CheckboxStyleProvider.getVariantStyle(effectiveVariant, effectiveState),
        sizeStyles.box,
        className,
      );
    }, [effectiveVariant, effectiveState, sizeStyles.box, className]);

    // Context7 Pattern: Resource management - Indeterminate state sync
    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = currentIndeterminate;
      }
    }, [currentIndeterminate]);

    return (
      <div className="flex items-start space-x-2">
        <div className="flex items-center">
          <input
            ref={(element) => {
              if (checkboxRef.current !== element) {
                (
                  checkboxRef as React.MutableRefObject<HTMLInputElement | null>
                ).current = element;
              }
              if (typeof ref === "function") {
                ref(element);
              } else if (ref) {
                (
                  ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = element;
              }
            }}
            type="checkbox"
            className={checkboxStyles}
            checked={currentChecked}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-describedby={
              description ? `${componentId.current}-description` : undefined
            }
            {...props}
          />

          {/* Custom checkbox indicator */}
          <div
            className={cn(
              "absolute flex items-center justify-center pointer-events-none",
              sizeStyles.box,
              currentChecked || currentIndeterminate
                ? "opacity-100"
                : "opacity-0",
              "transition-opacity duration-200",
            )}
          >
            {currentIndeterminate ? (
              <svg
                className={sizeStyles.icon}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            ) : currentChecked ? (
              <svg
                className={sizeStyles.icon}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
            ) : null}
          </div>
        </div>

        {/* Label and description */}
        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={props.id}
                className={cn(
                  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  sizeStyles.text,
                  error && "text-destructive",
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={`${componentId.current}-description`}
                className={cn(
                  "text-muted-foreground leading-snug",
                  size === "sm" && "text-xs",
                  size === "md" && "text-xs",
                  size === "lg" && "text-sm",
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Error message */}
        {typeof error === "string" && error && (
          <div className="mt-1 text-xs text-destructive font-medium">
            {error}
          </div>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

// Context7 Pattern: Factory Pattern - Checkbox creation utilities
export const createCheckbox = {
  agreement: (label: string) => ({
    label,
    required: true,
    variant: "default" as const,
    size: "md" as const,
  }),

  permission: (label: string, description?: string) => ({
    label,
    description,
    variant: "default" as const,
    size: "sm" as const,
  }),

  feature: (label: string, description: string) => ({
    label,
    description,
    variant: "default" as const,
    size: "md" as const,
  }),

  confirmation: (label: string) => ({
    label,
    variant: "success" as const,
    size: "md" as const,
  }),
};

// Context7 Pattern: Modularity - Checkbox composition helpers
export const CheckboxComposed = {
  CheckboxGroup: ({
    options,
    value = [],
    onChange,
    groupLabel,
    error,
    ...checkboxProps
  }: {
    options: Array<{
      value: string;
      label: string;
      description?: string;
      disabled?: boolean;
    }>;
    value?: string[];
    onChange?: (selected: string[]) => void;
    groupLabel?: string;
    error?: string;
  } & Omit<CheckboxProps, "onChange" | "checked" | "value">) => {
    const groupId = React.useId();

    const handleCheckboxChange = React.useCallback(
      (optionValue: string, checked: boolean) => {
        const newSelected = checked
          ? [...value, optionValue]
          : value.filter((v) => v !== optionValue);
        onChange?.(newSelected);
      },
      [value, onChange],
    );

    return (
      <div className="space-y-3">
        {groupLabel && (
          <label className="text-sm font-medium leading-none">
            {groupLabel}
          </label>
        )}
        <div className="space-y-2">
          {options.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              description={option.description}
              checked={value.includes(option.value)}
              disabled={option.disabled}
              groupId={groupId}
              onChange={(checked) =>
                handleCheckboxChange(option.value, checked)
              }
              error={error}
              {...checkboxProps}
            />
          ))}
        </div>
      </div>
    );
  },

  SelectAllCheckbox: ({
    groupId,
    label = "Select All",
    onChange,
  }: {
    groupId: string;
    label?: string;
    onChange?: (allSelected: boolean) => void;
  }) => {
    const [groupState, setGroupState] = React.useState({
      selected: [] as string[],
      total: 0,
      state: "unchecked" as CheckboxState,
    });
    const groupManagerRef = React.useRef(CheckboxGroupManager.getInstance());

    React.useEffect(() => {
      const unsubscribe = groupManagerRef.current.subscribeToGroup(
        groupId,
        (state) => {
          const checkboxState: CheckboxState =
            state.selected.length === 0
              ? ("unchecked" as CheckboxState)
              : state.selected.length === state.total
                ? ("checked" as CheckboxState)
                : ("indeterminate" as CheckboxState);

          setGroupState({ ...state, state: checkboxState });
        },
      );

      return unsubscribe;
    }, [groupId]);

    const handleSelectAll = React.useCallback(
      (checked: boolean) => {
        onChange?.(checked);
      },
      [onChange],
    );

    return (
      <Checkbox
        label={label}
        checked={groupState.state === ("checked" as CheckboxState)}
        indeterminate={groupState.state === ("indeterminate" as CheckboxState)}
        onChange={handleSelectAll}
        variant="default"
      />
    );
  },
};
