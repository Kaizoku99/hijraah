/**
 * Application constants
 */

// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Auth constants
export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_REFRESH_TOKEN_KEY = "auth_refresh_token";
export const AUTH_USER_KEY = "auth_user";

// Pagination constants
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUMBER = 1;

// Application routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  VISA: "/visa",
  IMMIGRATION: "/immigration",
  SERVICES: "/services",
  ABOUT: "/about",
  CONTACT: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  NOT_FOUND: "/404",
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PASSWORD:
    "Password must be at least 8 characters with uppercase, lowercase, and a number",
  INVALID_PHONE: "Please enter a valid phone number",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
  TERMS_REQUIRED: "You must accept the terms and conditions",
};

// Status codes
export const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: "theme",
  LANGUAGE: "language",
  RECENT_SEARCHES: "recent_searches",
};

// Support contact information
export const SUPPORT = {
  EMAIL: "support@hijraah.com",
  PHONE: "+1-800-HIJRAAH",
  HOURS: "9:00 AM - 5:00 PM EST, Monday to Friday",
};
