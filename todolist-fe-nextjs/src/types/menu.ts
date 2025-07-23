export type MenuGroup = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export type MenuItemsMap = {
  [key: string]: MenuGroup[];
};