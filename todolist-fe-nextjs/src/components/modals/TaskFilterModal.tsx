"use client";

import { useEffect, useMemo, useState } from "react";
import { TaskStatus } from "@/lib/types/Status";
import { TaskFilters } from "@/lib/types/filters/TaskFilters";
import { UserDto } from "@/lib/types/dto/UserDto";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useUserList } from "@/hooks/useUsers";
import { Icons } from "@/lib/components/Icons";
import type { ButtonVariant } from "@/lib/components/ui/Button";
import Dropdown from "@/lib/components/ui/Dropdown";
import Modal from "@/lib/components/ui/Modal";
import Switch from "@/lib/components/ui/Switch";
import TextField from "@/lib/components/ui/TextField";

interface Props {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
  originalFilters: TaskFilters;
  onClose: () => void;
  onApply: () => void;
}

export default function TaskFilterModal({
  filters,
  onChange,
  originalFilters,
  onClose,
  onApply,
}: Props) {
  const t = useTranslation();
  const statusOptions: TaskStatus[] = ["TODO", "IN PROGRESS", "DONE"];

  const allAssigneesLabel = t("task.allAssignees");
  const noAssigneeLabel = t("task.noAssignee");

  const allAssignees = useMemo<UserDto>(
    () => ({
      id: -1,
      fullName: allAssigneesLabel,
      username: "",
      password: "",
      isAdmin: false,
      status: "ACTIVE",
    }),
    [allAssigneesLabel]
  );

  const noAssignee = useMemo<UserDto>(
    () => ({
      id: undefined,
      fullName: noAssigneeLabel,
      username: "",
      password: "",
      isAdmin: false,
      status: "ACTIVE",
    }),
    [noAssigneeLabel]
  );

  const fetchedUsers = useUserList().users;
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    setUsers([allAssignees, noAssignee, ...fetchedUsers]);
  }, [allAssignees, noAssignee, fetchedUsers]);

  const selectedUser =
    users.find((u) => u.id === filters.assigneeId) ?? noAssignee;

  return (
    <Modal
      title={t("task.filter.title")}
      onClose={onClose}
      footerActions={[
        {
          icon: Icons.cancel,
          label: t("button.cancel"),
          variant: "secondary" as ButtonVariant,
          onClick: () => {
            onChange(originalFilters);
            onClose();
          },
        },
        {
          icon: Icons.filter,
          label: t("button.filter.apply"),
          variant: "primary" as ButtonVariant,
          onClick: onApply,
        },
      ]}
    >
      <div className="space-y-4">
        {/* Description */}
        <TextField
          label={t("task.description")}
          value={filters.description}
          onChange={(e) =>
            onChange({ ...filters, description: e.target.value })
          }
        />

        {/* Assignee */}
        <Dropdown
          label={t("task.assignee")}
          value={selectedUser}
          options={users}
          getOptionValue={(user) => String(user.id)}
          getOptionLabel={(user) => user.fullName}
          onChange={(user) =>
            onChange({
              ...filters,
              assigneeId: user.id, 
            })
          }
        />

        {/* Status switches */}
        <div className="grid grid-cols-12 gap-4 items-start">
          <label className="col-span-3 text-sm font-medium">
            {t("task.status")}
          </label>
          <div className="col-span-9 flex flex-col gap-2">
            {statusOptions.map((status) => (
              <Switch
                key={status}
                checked={filters.statusMap[status]}
                onChange={(value) =>
                  onChange({
                    ...filters,
                    statusMap: {
                      ...filters.statusMap,
                      [status]: value,
                    },
                  })
                }
                label={status}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
