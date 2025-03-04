import { useEffect, useCallback, useState } from 'react';

interface UseKeyboardNavigationProps {
  enabled?: boolean;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onTab?: () => void;
}

export function useKeyboardNavigation({
  enabled = true,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onEnter,
  onEscape,
  onTab,
}: UseKeyboardNavigationProps = {}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || !isFocused) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          onArrowUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onArrowDown?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onArrowLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onArrowRight?.();
          break;
        case 'Enter':
          event.preventDefault();
          onEnter?.();
          break;
        case 'Escape':
          event.preventDefault();
          onEscape?.();
          break;
        case 'Tab':
          event.preventDefault();
          onTab?.();
          break;
      }
    },
    [enabled, isFocused, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onEnter, onEscape, onTab]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [enabled, handleKeyDown]);

  return {
    isFocused,
    setIsFocused,
  };
}
