enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

interface CircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeout?: number;
  halfOpenRetries?: number;
  monitorInterval?: number;
  onStateChange?: (from: CircuitState, to: CircuitState) => void;
  onError?: (error: Error) => void;
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private halfOpenSuccessCount: number = 0;
  private readonly options: Required<CircuitBreakerOptions>;

  constructor(options: CircuitBreakerOptions = {}) {
    this.options = {
      failureThreshold: 5,
      resetTimeout: 60000, // 1 minute
      halfOpenRetries: 3,
      monitorInterval: 10000, // 10 seconds
      onStateChange: () => {},
      onError: () => {},
      ...options,
    };

    // Start monitoring circuit state
    this.startMonitoring();
  }

  private startMonitoring() {
    setInterval(() => {
      if (this.state === CircuitState.OPEN) {
        const now = Date.now();
        if (now - this.lastFailureTime >= this.options.resetTimeout) {
          this.transitionTo(CircuitState.HALF_OPEN);
        }
      }
    }, this.options.monitorInterval);
  }

  private transitionTo(newState: CircuitState) {
    if (this.state === newState) return;

    const oldState = this.state;
    this.state = newState;

    if (newState === CircuitState.CLOSED) {
      this.failureCount = 0;
      this.halfOpenSuccessCount = 0;
    } else if (newState === CircuitState.HALF_OPEN) {
      this.halfOpenSuccessCount = 0;
    }

    this.options.onStateChange(oldState, newState);
  }

  async execute<T>(
    action: () => Promise<T>,
    fallback?: () => Promise<T>
  ): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (fallback) {
        return fallback();
      }
      throw new Error('Circuit breaker is OPEN');
    }

    try {
      const result = await action();

      if (this.state === CircuitState.HALF_OPEN) {
        this.halfOpenSuccessCount++;
        if (this.halfOpenSuccessCount >= this.options.halfOpenRetries) {
          this.transitionTo(CircuitState.CLOSED);
        }
      }

      return result;
    } catch (error) {
      this.handleFailure(error as Error);

      if (fallback) {
        return fallback();
      }
      throw error;
    }
  }

  private handleFailure(error: Error) {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    this.options.onError(error);

    if (
      this.state === CircuitState.CLOSED &&
      this.failureCount >= this.options.failureThreshold
    ) {
      this.transitionTo(CircuitState.OPEN);
    } else if (this.state === CircuitState.HALF_OPEN) {
      this.transitionTo(CircuitState.OPEN);
    }
  }

  getState(): CircuitState {
    return this.state;
  }

  reset() {
    this.transitionTo(CircuitState.CLOSED);
  }
}

// Create circuit breaker instances for different services
const circuitBreakers: Record<string, CircuitBreaker> = {};

export function getCircuitBreaker(
  service: string,
  options?: CircuitBreakerOptions
): CircuitBreaker {
  if (!circuitBreakers[service]) {
    circuitBreakers[service] = new CircuitBreaker(options);
  }
  return circuitBreakers[service];
}

// Helper function to wrap a service call with circuit breaker
export async function withCircuitBreaker<T>(
  service: string,
  action: () => Promise<T>,
  fallback?: () => Promise<T>,
  options?: CircuitBreakerOptions
): Promise<T> {
  const breaker = getCircuitBreaker(service, options);
  return breaker.execute(action, fallback);
} 