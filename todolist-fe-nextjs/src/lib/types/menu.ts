export type MenuItemData = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export type MenuSections = {
  [key: string]: MenuItemData[];
};