import { ExtendedUser } from './types';
import { ForbiddenError } from './errors';

/**
 * Permission string type
 */
export type Permission = string;

/**
 * Role definition with permissions and optional inheritance
 */
export interface Role {
  /**
   * Name of the role
   */
  name: string;

  /**
   * Description of the role
   */
  description?: string;

  /**
   * Array of permissions assigned to this role
   */
  permissions: Permission[];

  /**
   * Optional array of parent role names this role inherits from
   */
  inherits?: string[];
}

/**
 * Configuration options for the RBAC manager
 */
export interface RBACOptions {
  /**
   * Default roles and their permissions
   */
  roles?: Record<string, Role>;

  /**
   * Name of super admin role that has all permissions
   * @default 'admin'
   */
  superAdminRole?: string;

  /**
   * Enable permission caching for performance
   * @default true
   */
  enableCache?: boolean;

  /**
   * Custom function to extract roles from a user
   */
  extractRoles?: (user: ExtendedUser) => string[];
}

/**
 * Default RBAC options
 */
const defaultRBACOptions: RBACOptions = {
  roles: {},
  superAdminRole: 'admin',
  enableCache: true,
};

/**
 * Role-Based Access Control Manager
 */
export class RBACManager {
  private roles: Record<string, Role>;
  private superAdminRole: string;
  private enableCache: boolean;
  private extractRoles: (user: ExtendedUser) => string[];
  private permissionCache: Map<string, Set<Permission>> = new Map();

  constructor(options: RBACOptions = {}) {
    const config = { ...defaultRBACOptions, ...options };
    this.roles = config.roles || {};
    this.superAdminRole = config.superAdminRole || 'admin';
    this.enableCache = config.enableCache ?? true;
    this.extractRoles = config.extractRoles || ((user: ExtendedUser) => {
      return [user.role || 'user'];
    });
  }

  /**
   * Define a new role with permissions
   */
  defineRole(role: Role): void {
    this.roles[role.name] = role;
    
    // Clear cache if caching is enabled
    if (this.enableCache) {
      this.permissionCache.clear();
    }
  }

  /**
   * Define multiple roles at once
   */
  defineRoles(roles: Record<string, Role>): void {
    this.roles = { ...this.roles, ...roles };
    
    // Clear cache if caching is enabled
    if (this.enableCache) {
      this.permissionCache.clear();
    }
  }

  /**
   * Get all permissions for a given role
   */
  private getRolePermissions(roleName: string, visited: Set<string> = new Set()): Set<Permission> {
    // Avoid circular dependencies
    if (visited.has(roleName)) {
      return new Set();
    }
    
    // Mark this role as visited
    visited.add(roleName);
    
    // Get the role definition
    const role = this.roles[roleName];
    if (!role) {
      return new Set();
    }
    
    // Start with this role's permissions
    const permissions = new Set(role.permissions);
    
    // Add inherited permissions
    if (role.inherits && role.inherits.length > 0) {
      for (const parentRole of role.inherits) {
        const parentPermissions = this.getRolePermissions(parentRole, visited);
        parentPermissions.forEach(permission => permissions.add(permission));
      }
    }
    
    return permissions;
  }

  /**
   * Get all permissions for a user based on their roles
   */
  getUserPermissions(user: ExtendedUser | null): Set<Permission> {
    if (!user) {
      return new Set();
    }
    
    // Extract roles from user
    const userRoles = this.extractRoles(user);
    
    // Check for super admin role
    if (userRoles.includes(this.superAdminRole)) {
      return new Set(['*']);  // Special wildcard permission for super admins
    }
    
    // Check the cache first if enabled
    if (this.enableCache) {
      const cacheKey = userRoles.sort().join(',');
      const cachedPermissions = this.permissionCache.get(cacheKey);
      
      if (cachedPermissions) {
        return cachedPermissions;
      }
    }
    
    // Collect all permissions from all roles
    const allPermissions = new Set<Permission>();
    for (const roleName of userRoles) {
      const rolePermissions = this.getRolePermissions(roleName);
      rolePermissions.forEach(permission => allPermissions.add(permission));
    }
    
    // Save to cache if enabled
    if (this.enableCache && userRoles.length > 0) {
      const cacheKey = userRoles.sort().join(',');
      this.permissionCache.set(cacheKey, allPermissions);
    }
    
    return allPermissions;
  }

  /**
   * Check if the user has a specific role
   */
  hasRole(user: ExtendedUser | null, roleName: string): boolean {
    if (!user) return false;
    
    const userRoles = this.extractRoles(user);
    return userRoles.includes(roleName) || userRoles.includes(this.superAdminRole);
  }

  /**
   * Check if the user has a specific permission
   */
  hasPermission(user: ExtendedUser | null, permission: Permission): boolean {
    if (!user) return false;
    
    // Get all permissions for the user
    const permissions = this.getUserPermissions(user);
    
    // Super admin has all permissions
    if (permissions.has('*')) return true;
    
    // Check exact permission
    if (permissions.has(permission)) return true;
    
    // Check wildcard permissions
    const parts = permission.split(':');
    for (let i = 1; i <= parts.length; i++) {
      const wildcardPermission = [...parts.slice(0, i), '*'].join(':');
      if (permissions.has(wildcardPermission)) return true;
    }
    
    return false;
  }

  /**
   * Check if the user has any of the specified permissions
   */
  hasAnyPermission(user: ExtendedUser | null, permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(user, permission));
  }

  /**
   * Check if the user has all of the specified permissions
   */
  hasAllPermissions(user: ExtendedUser | null, permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(user, permission));
  }

  /**
   * Enforce a permission requirement, throwing an error if not authorized
   */
  enforcePermission(user: ExtendedUser | null, permission: Permission): void {
    if (!this.hasPermission(user, permission)) {
      throw new ForbiddenError(`Missing required permission: ${permission}`);
    }
  }

  /**
   * Enforce that user has any of the specified permissions
   */
  enforceAnyPermission(user: ExtendedUser | null, permissions: Permission[]): void {
    if (!this.hasAnyPermission(user, permissions)) {
      throw new ForbiddenError(`Missing at least one of the required permissions: ${permissions.join(', ')}`);
    }
  }

  /**
   * Enforce that user has all of the specified permissions
   */
  enforceAllPermissions(user: ExtendedUser | null, permissions: Permission[]): void {
    if (!this.hasAllPermissions(user, permissions)) {
      throw new ForbiddenError(`Missing some of the required permissions: ${permissions.join(', ')}`);
    }
  }

  /**
   * Create a permission string from resource and action
   */
  createPermission(resource: string, action: string): Permission {
    return `${resource}:${action}`;
  }
}

// Singleton RBAC manager instance
let rbacManager: RBACManager | null = null;

/**
 * Get the RBAC manager instance, creating it if it doesn't exist
 */
export function getRBACManager(options?: RBACOptions): RBACManager {
  if (!rbacManager) {
    rbacManager = new RBACManager(options);
  }
  return rbacManager;
}

/**
 * Create a permission string from resource and action
 */
export function createPermission(resource: string, action: string): Permission {
  return `${resource}:${action}`;
}

/**
 * Check if the user has a specific permission
 */
export function hasPermission(user: ExtendedUser | null, permission: Permission): boolean {
  return getRBACManager().hasPermission(user, permission);
}

/**
 * Enforce a permission requirement, throwing an error if not authorized
 */
export function enforcePermission(user: ExtendedUser | null, permission: Permission): void {
  return getRBACManager().enforcePermission(user, permission);
} 