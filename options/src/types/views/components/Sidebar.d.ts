export type PageListType = {
  [key: string]: string;
};
export type PagesType = {
  [key: string]: PageListType;
};
export type PageListProp = {
  data: PageListType;
  id: number;
};
