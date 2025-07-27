export type ErrorType =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "rate_limit"
  | "offline";

export type Surface =
  | "chat"
  | "auth"
  | "api"
  | "stream"
  | "database"
  | "history"
  | "vote"
  | "document"
  | "suggestions";

export type ErrorCode = `${ErrorType}:${Surface}`;

export type ErrorVisibility = "response" | "log" | "none";

const ERROR_VISIBILITY: Partial<Record<ErrorCode, ErrorVisibility>> = {
  "bad_request:api": "response",
  "bad_request:auth": "response",
  "forbidden:api": "response",
  "forbidden:auth": "response",
  "unauthorized:auth": "response",
  "not_found:chat": "response",
  "forbidden:chat": "response",
  "unauthorized:chat": "response",
  "rate_limit:chat": "response",
  "not_found:stream": "response",
  "not_found:document": "response",
  "unauthorized:document": "response",
  "forbidden:document": "response",
  "unauthorized:suggestions": "response",
  "forbidden:vote": "response",
  "unauthorized:vote": "response",
  "not_found:vote": "response",
};

export class ChatSDKError extends Error {
  public type: ErrorType;
  public surface: Surface;
  public statusCode: number;

  constructor(errorCode: ErrorCode, cause?: string) {
    super(getMessageByErrorCode(errorCode), { cause });
    const [type, surface] = errorCode.split(":");

    this.type = type as ErrorType;
    this.surface = surface as Surface;
    this.statusCode = getStatusCodeByType(this.type);
  }

  public toResponse() {
    const visibility = ERROR_VISIBILITY[this.getErrorCode()] ?? "log";

    if (visibility === "response") {
      return new Response(this.message, { status: this.statusCode });
    } else {
      return new Response("An unexpected error occurred", { status: 500 });
    }
  }

  private getErrorCode(): ErrorCode {
    return `${this.type}:${this.surface}`;
  }
}

export function getMessageByErrorCode(errorCode: ErrorCode): string {
  switch (errorCode) {
    case "bad_request:api":
      return "Bad request.";
    case "unauthorized:auth":
      return "Unauthorized.";
    case "forbidden:api":
      return "Forbidden.";
    case "forbidden:auth":
      return "Forbidden.";
    case "not_found:chat":
      return "Chat not found.";
    case "forbidden:chat":
      return "You do not have access to this chat.";
    case "unauthorized:chat":
      return "Unauthorized.";
    case "rate_limit:chat":
      return "You have reached your message limit.";
    case "not_found:stream":
      return "Stream not found.";
    case "not_found:document":
      return "Document not found.";
    case "unauthorized:document":
      return "Unauthorized.";
    case "forbidden:document":
      return "You do not have access to this document.";
    case "unauthorized:suggestions":
      return "Unauthorized.";
    case "forbidden:vote":
      return "You do not have access to vote on this chat.";
    case "unauthorized:vote":
      return "Unauthorized.";
    case "not_found:vote":
      return "Vote not found.";
    default:
      return "An unexpected error occurred.";
  }
}

function getStatusCodeByType(type: ErrorType) {
  switch (type) {
    case "bad_request":
      return 400;
    case "unauthorized":
      return 401;
    case "forbidden":
      return 403;
    case "not_found":
      return 404;
    case "rate_limit":
      return 429;
    default:
      return 500;
  }
}
