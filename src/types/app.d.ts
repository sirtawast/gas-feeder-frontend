export type Items = Item[];

export interface Item {
  id: number;
  title: string;
  link: string;
  img?: string;
  desc: string;
}