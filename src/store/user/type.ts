export type ImgType = {
  name: string;
  type: string;
  uri: string;
};
export type ProfilePayload = {
  firstName: string;
  lastName: string;
  userImage: ImgType;
};
