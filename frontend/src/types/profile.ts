export type UserProfileDto = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
};

export type UpdateProfileRequest = {
  firstName: string;
  lastName: string;
  phone: string;
};