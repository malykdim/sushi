export interface AuthResponseData {
// FIREBASE
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

// BACK4APP
  // objectId?: string,
  // username: string,
  // email?: string,
  // role: string,
  // accessToken?: string,
  // createdAt?: Date,
  // updatedAt?: Date
}
