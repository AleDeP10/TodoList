import React from "react";
import {
  X,
  ArrowRight,
  Edit,
  Filter,
  Trash,
  Save,
  ListChecks,
  Users,
  UserCircle,
  FolderGit2,
  XOctagon,
  FilterX,
  CheckCircle,
  PlusCircle,
  Loader2,
} from "lucide-react";

export const Icons = {
  close: <X size={16} />,
  edit: <Edit size={16} />,
  delete: <Trash size={16} />,
  filter: <Filter size={16} />,
  removeFilter: <FilterX size={16} />,
  plus: <PlusCircle size={16} />,
  arrowRight: <ArrowRight size={16} />,
  cancel: <XOctagon size={16} />,
  confirm: <CheckCircle size={16} />,
  save: <Save size={16} />,

  // Parameteric spinner
  spinner: ({
    size = 64,
    color = "text-yellow-400",
    className = "",
  }: {
    size?: number;
    color?: string;
    className?: string;
  } = {}) => <Loader2 className={`animate-spin ${color} ${className}`} size={size} />,
};

export const MenuIcons = {
  tasks: <ListChecks size={16} />,
  users: <Users size={16} />,
  author: <UserCircle size={16} />,
  portfolio: <FolderGit2 size={16} />,
};
