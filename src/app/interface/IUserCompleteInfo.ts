export interface UserCompleteInfo {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  phone: string;
  password: string;
  pictureUrl: string;
  policyCheck: boolean;
  dateOfBirth: Date | string | null;
  street: string;
  idCity: number;
  houseNumber: string;
  postCode: string;
  addressId: number;
}
