"use client";

import { TaskStatus, UserStatus } from "@/lib/types/Status";
import { DashboardFilters, UnassignedPolicy } from "@/lib/types/filters/DashboardFilters";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Icons } from "@/lib/components/Icons";
import type { ButtonVariant } from "@/lib/components/ui/Button";
import Modal from "@/lib/components/ui/Modal";
import Switch from "@/lib/components/ui/Switch";
import TextField from "@/lib/components/ui/TextField";
import Dropdown from "@/lib/components/ui/Dropdown";

interface Props {
  filters: DashboardFilters;
  onChange: (filters: DashboardFilters) => void;
  originalFilters: DashboardFilters;
  onClose: () => void;
  onApply: () => void;
}

export default function UserFilterModal({
  filters,
  onChange,
  originalFilters,
  onClose,
  onApply,
}: Props) {
  const t = useTranslation();
  const unassignedPolicies: UnassignedPolicy[] = ["TO_TOP", "HIDE", "TO_BOTTOM"];
  const userStatusOptions: UserStatus[] = ["ACTIVE", "BLOCKED"];
  const taskStatusOptions: TaskStatus[] = [
    "TODO",
    "IN PROGRESS",
    "PAUSED",
    "DONE",
  ];

  return (
    <Modal
      title={t("dashboard.filter.title")}
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
        {/* Show Unassigned */}
        <Dropdown
          label={t("dashboard.unassignedPolicy")}
          value={filters.unassignedPolicy}
          options={unassignedPolicies}
          getOptionValue={(policy) => policy}
          getOptionLabel={(policy) => t(`dashboard.unassignedPolicy.${policy}`)}
          onChange={(policy) =>
            onChange({
              ...filters,
              unassignedPolicy: policy,
            })
          }
        />

        <h3>{t("entity.user")}</h3>

        {/* Full name */}
        <TextField
          label={t("user.fullName")}
          value={filters.fullName}
          onChange={(e) => onChange({ ...filters, fullName: e.target.value })}
        />

        {/* Username */}
        <TextField
          label={t("user.username")}
          value={filters.username}
          onChange={(e) => onChange({ ...filters, username: e.target.value })}
        />

        {/* User status switches */}
        <div className="grid grid-cols-12 gap-4 items-start">
          <label className="col-span-3 text-left text-sm font-medium">
            {t("user.status")}
          </label>
          <div className="col-span-9 flex flex-col gap-2">
            {userStatusOptions.map((status) => (
              <Switch
                variant="compact"
                key={status}
                checked={filters.userStatus[status]}
                onChange={(value) =>
                  onChange({
                    ...filters,
                    userStatus: {
                      ...filters.userStatus,
                      [status]: value,
                    },
                  })
                }
                label={status}
              />
            ))}
          </div>
        </div>

        <h3>{t("entity.task")}</h3>

        {/* Description */}
        <TextField
          label={t("task.description")}
          value={filters.description}
          onChange={(e) =>
            onChange({ ...filters, description: e.target.value })
          }
        />

        {/* Task status switches */}
        <div className="grid grid-cols-12 gap-4 items-start">
          <label className="col-span-3 text-left text-sm font-medium">
            {t("user.status")}
          </label>
          <div className="col-span-9 flex flex-col gap-2">
            {taskStatusOptions.map((status) => (
              <Switch
                variant="compact"
                key={status}
                checked={filters.taskStatus[status]}
                onChange={(value) =>
                  onChange({
                    ...filters,
                    taskStatus: {
                      ...filters.taskStatus,
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
