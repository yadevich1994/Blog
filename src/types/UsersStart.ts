export interface IPostUser {
  user: {
    username: string;
    email: string;
    password: string;
  };
}
export interface IPostexhistingUser {
  user: {
    email: string;
    password: string;
  };
}

export interface IPutEditProfile {
  user: {
    username: string;
    email: string;
    password?: string;
    image?: string;
  };
}

export interface IUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  password?: string;
}

export interface IPostUserResponse {
  user: IUser;
}
