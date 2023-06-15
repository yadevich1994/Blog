export interface ISignUp {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  checkForm: boolean;
}

export interface ISignIn {
  password: string;
  email: string;
}

export interface IEditProfile {
  username: string;
  email: string;
  password: string;
  image: string;
}

export interface ICreateArticle {
  title: string;
  description: string;
  text: string;
  tags: string;
}

export interface IPostNewArticle {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: Array<string>;
  };
}

export interface IEditArticle {
  article: {
    title: string;
    description: string;
    body: string;
  };
}

export interface IPostexhistingUser {
  user: {
    email: string;
    password: string;
  };
}
