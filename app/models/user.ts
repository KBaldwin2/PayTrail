export type UserInfo = {
  id: string;
  name: string;
  emailAddress?: string;
  phoneNumber?: string;
  isPhoneVerified: boolean;
  acceptToSVersion: number;
  acceptMarketing: boolean;
  alias?: string;
};

export type User = UserInfo & {
  token: string;
};
