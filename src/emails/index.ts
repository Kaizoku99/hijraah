// Export email templates
export { default as PasswordReset } from './templates/PasswordReset';
export { default as EmailConfirmation } from './templates/EmailConfirmation';
export { default as MagicLink } from './templates/MagicLink';
export { default as EmailChange } from './templates/EmailChange';
export { default as UserInvitation } from './templates/UserInvitation';

// Export base email component
export { default as BaseEmail } from './templates/BaseSuabaseEmail';

// Export utility for rendering React components to HTML strings
export { renderToStaticMarkup } from 'react-dom/server'; 