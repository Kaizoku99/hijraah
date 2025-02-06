type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = 'info';
  private buffer: LogEntry[] = [];
  private readonly maxBufferSize = 1000;

  private constructor() {
    // Set log level from environment
    const envLogLevel = process.env.LOG_LEVEL as LogLevel;
    if (envLogLevel && ['debug', 'info', 'warn', 'error'].includes(envLogLevel)) {
      this.logLevel = envLogLevel;
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    return levels[level] >= levels[this.logLevel];
  }

  private formatMessage(entry: LogEntry): string {
    const context = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
    return `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}${context}`;
  }

  private addToBuffer(entry: LogEntry) {
    this.buffer.push(entry);
    if (this.buffer.length > this.maxBufferSize) {
      this.buffer.shift();
    }
  }

  private createLogEntry(level: LogLevel, message: string, context?: Record<string, unknown>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
  }

  public debug(message: string, context?: Record<string, unknown>) {
    if (this.shouldLog('debug')) {
      const entry = this.createLogEntry('debug', message, context);
      this.addToBuffer(entry);
      if (process.env.NODE_ENV === 'development') {
        console.debug(this.formatMessage(entry));
      }
    }
  }

  public info(message: string, context?: Record<string, unknown>) {
    if (this.shouldLog('info')) {
      const entry = this.createLogEntry('info', message, context);
      this.addToBuffer(entry);
      console.info(this.formatMessage(entry));
    }
  }

  public warn(message: string, context?: Record<string, unknown>) {
    if (this.shouldLog('warn')) {
      const entry = this.createLogEntry('warn', message, context);
      this.addToBuffer(entry);
      console.warn(this.formatMessage(entry));
    }
  }

  public error(message: string, error?: Error, context?: Record<string, unknown>) {
    if (this.shouldLog('error')) {
      const errorContext = error ? {
        ...context,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      } : context;

      const entry = this.createLogEntry('error', message, errorContext);
      this.addToBuffer(entry);
      console.error(this.formatMessage(entry));
    }
  }

  public getBuffer(): LogEntry[] {
    return [...this.buffer];
  }

  public clearBuffer() {
    this.buffer = [];
  }

  public setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }
}

export const logger = Logger.getInstance(); 