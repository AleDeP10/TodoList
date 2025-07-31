import { useEffect, useMemo, useState } from "react";
import { useT } from "@/hooks/useTranslation";
import { useUserList } from "@/hooks/useUsers";
import { Icons } from "@/lib/icons/Icons";
import { TaskStatus } from "@/types/Status";
import { TaskDto } from "@/types/dto/TaskDto";
import { UserDto } from "@/types/dto/UserDto";
import Modal from "@/components/ui/Modal";
import { ButtonVariant } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Dropdown from "@/components/ui/Dropdown";

interface Props {
  currentTask?: TaskDto;
  onClose: () => void;
  onSubmit: (task: TaskDto) => void;
}

export default function TaskEditModal({
  currentTask,
  onClose,
  onSubmit,
}: Props) {
  const t = useT();

  const [formState, setFormState] = useState<TaskDto>({
    id: currentTask?.id,
    description: currentTask?.description ?? "",
    assigneeId: currentTask?.assigneeId ?? undefined,
    status: currentTask?.status ?? "TODO",
  });

  const noAssigneeLabel = t("task.noAssignee");

  const dummyUser = useMemo<UserDto>(
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
    setUsers([dummyUser, ...fetchedUsers]);
  }, [dummyUser, fetchedUsers]);

  const selectedUser =
    users.find((u) => u.id === formState.assigneeId) ?? dummyUser;

  return (
    <Modal
      title={currentTask ? t("task.edit.title") : t("task.create.title")}
      onClose={onClose}
      footerActions={[
        {
          label: t("button.cancel"),
          icon: Icons.cancel,
          variant: "secondary" as ButtonVariant,
          onClick: onClose,
        },
        {
          label: t("button.save"),
          icon: Icons.save,
          variant: "primary" as ButtonVariant,
          onClick: () => onSubmit(formState),
        },
      ]}
    >
      <div className="flex flex-col gap-2">
        {/* Description */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("task.description")}
          </label>
          <div className="col-span-9">
            <TextField
              value={formState.description}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Assignee */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("task.assignee")}
          </label>
          <div className="col-span-9">
            <Dropdown
              value={selectedUser}
              options={users}
              getOptionValue={(user) => String(user.id)}
              getOptionLabel={(user) => user.fullName}
              onChange={(user) =>
                setFormState((prev) => ({
                  ...prev,
                  assigneeId: user.id,
                }))
              }
              placeholder={t("task.assignee")}
            />
          </div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium">
            {t("task.status")}
          </label>
          <div className="col-span-9">
            <Dropdown<TaskStatus>
              value={formState.status}
              options={["TODO", "IN PROGRESS", "DONE"]}
              onChange={(status) =>
                setFormState((prev) => ({
                  ...prev,
                  status: status!,
                }))
              }
              placeholder={t("task.status")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
