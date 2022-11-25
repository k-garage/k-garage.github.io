export type Notebook = {
  author: string;
  title: string;
  abstract: string;
  tag: string;
  name: string;
  image: string;
  createdDate: string;
};

export type Toc = {
  link: string;
  name: string;
  depth: number;
};
