export interface Doc {
  username: string;
  content: Content[];
}

export interface Content {
  content: string;
  id: string;
}
