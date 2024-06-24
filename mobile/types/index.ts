export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Comment {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}
