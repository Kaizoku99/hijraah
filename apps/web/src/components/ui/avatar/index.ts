// Enhanced Avatar System Exports
export { UserAvatar, EnhancedUserAvatar } from "../user-avatar";
export type { UserAvatarProps } from "../user-avatar";

export {
  AvatarSelector,
  CompactAvatarSelector,
  useAvatarSelection,
} from "../avatar-selector";
export { AvatarGallery } from "../avatar-gallery";

// Avatar utility exports
export {
  generateAvatarUrl,
  getRandomDefaultAvatar,
  getAllDefaultAvatars,
  getAvatarMetadata,
  isDefaultAvatar,
  getDefaultAvatarPath,
  getUserAvatar,
  uploadAvatar,
  updateUserAvatar,
  clearAvatarCache,
  clearAllAvatarCache,
  getIdenticonUrl,
} from "@/lib/avatar-utils";

export { AvatarUploadError, ProfileUpdateError } from "@/lib/avatar-utils";
