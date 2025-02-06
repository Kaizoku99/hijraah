import { monitoring } from './monitoring';

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = 'info';
  private readonly LOG_LEVELS: Record<LogLevel, number> = {
    info: 0,
    warn: 1,
    error: 2,
  };

  private constructor() {
    this.initializeLogger();
  }

  private initializeLogger(): void {
    // Set log level from environment
    const envLogLevel = process.env.NEXT_PUBLIC_LOG_LEVEL?.toLowerCase() as LogLevel;
    if (envLogLevel && this.LOG_LEVELS[envLogLevel] !== undefined) {
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
    return this.LOG_LEVELS[level] >= this.LOG_LEVELS[this.logLevel];
  }

  private formatLog(entry: LogEntry): string {
    const metadata = entry.metadata ? ` ${JSON.stringify(entry.metadata)}` : '';
    return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${metadata}`;
  }

  private async log(level: LogLevel, message: string, metadata?: Record<string, unknown>): Promise<void> {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      metadata,
      timestamp: new Date().toISOString(),
    };

    const formattedLog = this.formatLog(entry);

    // Console logging
    switch (level) {
      case 'info':
        console.info(formattedLog);
        break;
      case 'warn':
        console.warn(formattedLog);
        break;
      case 'error':
        console.error(formattedLog);
        // Record errors in monitoring system
        if (metadata?.error instanceof Error) {
          monitoring.recordError({
            error: metadata.error,
            context: { message, ...metadata },
            severity: 'medium',
          });
        }
        break;
    }

    // In production, send logs to logging service
    if (process.env.NODE_ENV === 'production') {
      await this.sendToLoggingService(entry).catch((error) => {
        console.error('Failed to send log to logging service:', error);
        monitoring.recordError({
          error: error instanceof Error ? error : new Error(String(error)),
          context: { message: 'Failed to send log to logging service' },
          severity: 'low',
        });
      });
    }
  }

  private async sendToLoggingService(entry: LogEntry): Promise<void> {
    const endpoint = process.env.NEXT_PUBLIC_LOGGING_ENDPOINT;
    const apiKey = process.env.NEXT_PUBLIC_LOGGING_API_KEY;

    if (!endpoint || !apiKey) {
      throw new Error('Logging service not properly configured');
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      throw new Error(`Failed to send log: ${response.statusText}`);
    }
  }

  public info(message: string, metadata?: Record<string, unknown>): void {
    void this.log('info', message, metadata);
  }

  public warn(message: string, metadata?: Record<string, unknown>): void {
    void this.log('warn', message, metadata);
  }

  public error(message: string, metadata?: Record<string, unknown>): void {
    void this.log('error', message, metadata);
  }

  public setLogLevel(level: LogLevel): void {
    if (this.LOG_LEVELS[level] !== undefined) {
      this.logLevel = level;
    }
  }
}

export const logger = Logger.getInstance();