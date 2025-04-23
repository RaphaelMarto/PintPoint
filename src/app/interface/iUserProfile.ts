import { UserAdress } from './iUserAddress';
import { UserUpdate } from './iUserUpdate';
export interface UserProfile {
    userProfile: UserUpdate;
    userAddress: UserAdress;
}