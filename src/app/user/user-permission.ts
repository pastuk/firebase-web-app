import { UserAccess } from './user-access.enum';

export interface UserPermission {
  readonly [type: string]: UserAccess;
}
