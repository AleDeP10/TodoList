import {
  ArrowRight,
  Edit,
  Filter,
  Trash,
  ListChecks,
  Users,
  UserCircle,
  FolderGit2,
  XCircle,
} from "lucide-react";

export const Icons = {
  edit: <Edit size={16} />,
  delete: <Trash size={16} />,
  filter: <Filter size={16} />,
  removeFilter: <XCircle size={16} />,
  arrowRight: <ArrowRight />,
};
export const MenuIcons = {
  tasks: <ListChecks size={16} />,
  users: <Users size={16} />,
  author: <UserCircle size={16} />,
  portfolio: <FolderGit2 size={16} />,
};
