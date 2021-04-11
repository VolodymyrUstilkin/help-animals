import {TokenAuthService} from './token-auth-service/token-auth.service';
import {UserAuthService} from './user-auth-service/user-auth.service';


export const sharedServices = [UserAuthService, TokenAuthService];
