// navBar
// Todo move to navbar types
export type navbarCategory = {
  id: number;
  name: string;
  url: string;
};

export type labelValue = {
  colorValue: string;
  name: string;
};

export type labels = {
  [key: string]: labelValue;
};
