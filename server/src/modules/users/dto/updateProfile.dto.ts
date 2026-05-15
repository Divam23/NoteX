interface NotificationPreferencesDto {
  email?: boolean;
  push?: boolean;
  marketing?: boolean;
}

interface UserPreferencesDto {
  language?: string;
  theme?: 'light' | 'dark' | 'system';
  notifications?: NotificationPreferencesDto;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  userName?: string;
  avatar?: string;
  bio?: string;
  college?: string;
  course?: string;
  subject?: string[];
  university?: string;
  semester?: number;
  preferences?: UserPreferencesDto;
}
