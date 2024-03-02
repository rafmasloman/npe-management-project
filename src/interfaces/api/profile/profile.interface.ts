export interface IUpdateProfilePayload {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  gender: string;
  profilePicture: string;
}

export interface IUpdateProfilePicturePayload {
  profilePicture: string;
}
