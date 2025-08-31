"use client";

import { UserStatus } from "@/lib/types/Status";
import { UserFilters } from "@/lib/types/filters/UserFilters";
import { useT } from "@/lib/hooks/useTranslation";
import { Icons } from "@/lib/components/Icons";
import type { ButtonVariant } from "@/lib/components/ui/Button";
import Modal from "@/lib/components/ui/Modal";
import Switch from "@/lib/components/ui/Switch";
import TextField from "@/lib/components/ui/TextField";

interface Props {
  filters: UserFilters;
  onChange: (filters: UserFilters) => void;
  originalFilters: UserFilters;
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
  const t = useT();
  const statusOptions: UserStatus[] = ["ACTIVE", "BLOCKED"];

  return (
    <Modal
      title={t("user.filter.title")}
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
        {/* Full name */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("user.fullName")}
          </label>
          <div className="col-span-9">
            <TextField
              value={filters.fullName}
              onChange={(e) =>
                onChange({ ...filters, fullName: e.target.value })
              }
            />
          </div>
        </div>

        {/* Username */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("user.username")}
          </label>
          <div className="col-span-9">
            <TextField
              value={filters.username}
              onChange={(e) =>
                onChange({ ...filters, username: e.target.value })
              }
            />
          </div>
        </div>

        {/* Status switches */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("user.status")}
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
