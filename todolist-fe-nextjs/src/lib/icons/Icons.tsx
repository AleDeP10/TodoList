import {
  ArrowRight,
  Edit,
  Filter,
  Trash,
  Save,
  ListChecks,
  Users,
  UserCircle,
  FolderGit2,
  XCircle,
  CheckCircle,
  PlusCircle,
} from "lucide-react";

export const Icons = {
  edit: <Edit size={16} />,
  delete: <Trash size={16} />,
  filter: <Filter size={16} />,
  removeFilter: <XCircle size={16} />,
  plus: <PlusCircle size={16} />,
  arrowRight: <ArrowRight size={16} />,
  confirm: <CheckCircle size={16} />,
  save: <Save size={16} />
};
export const MenuIcons = {
  tasks: <ListChecks size={16} />,
  users: <Users size={16} />,
  author: <UserCircle size={16} />,
  portfolio: <FolderGit2 size={16} />,
};
