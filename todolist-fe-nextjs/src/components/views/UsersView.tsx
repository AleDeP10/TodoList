"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useT } from "@/hooks/useTranslation";
import {
  useUsersWithFilters,
  useSaveUser,
  useDeleteUser,
} from "@/hooks/useUsers";
import {
  getUserFilters,
  setUserFilters,
} from "@/store/user";
import { UserDto } from "@/types/dto/UserDto";
import { UserFilters } from "@/types/filters/UserFilters";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/lib/icons/Icons";
import UserModal from "@/components/modals/UserModal";
import UserFilterModal from "@/components/modals/UserFilterModal";
import UserDeleteConfirmModal from "@/components/modals/UserDeleteConfirmModal";

export default function UsersView() {
  const t = useT();
  const dispatch = useDispatch();

  const { data: filteredUsers = [], isLoading } = useUsersWithFilters();
  const { mutate: saveUser } = useSaveUser();
  const { mutate: deleteUser } = useDeleteUser();

  const userFilters = useSelector(getUserFilters);
  const [tmpFilters, setTmpFilters] = useState<UserFilters>(userFilters);
  const [currentUser, setCurrentUser] = useState<UserDto>();
  const [userToDelete, setUserToDelete] = useState<UserDto>();
  const [showFilterModal, setShowFilterModal] = useState(false);

  const clearFilters = () => {
    dispatch(
      setUserFilters({
        username: "",
        fullName: "",
        statusMap: { ACTIVE: true, BLOCKED: false },
      })
    );
  };

  return (
    <section className="p-6 space-y-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">{t("user.management")}</h2>

      {/* 👤 Create & Filter buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <Button
          variant="primary"
          label={t("button.create")}
          icon={Icons.plus}
          size="small"
          backgroundColor="#16a34a"
          onClick={() =>
            setCurrentUser({
              fullName: "",
              username: "",
              password: "",
              isAdmin: false,
              status: "ACTIVE",
            })
          }
        />
        <div className="flex gap-2">
          <Button
            variant="primary"
            label={t("button.filter")}
            icon={Icons.filter}
            size="small"
            backgroundColor="#ffd700"
            onClick={() => setShowFilterModal(true)}
          />
          <Button
            variant="primary"
            label={t("button.filter.remove")}
            icon={Icons.removeFilter}
            size="small"
            backgroundColor="#ffa500"
            onClick={clearFilters}
          />
        </div>
      </div>

      {/* 📋 User list */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-8 w-8 border-4 border-yellow-400 rounded-full border-t-transparent" />
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="border p-4 rounded shadow-sm flex flex-wrap items-center justify-between gap-4 sm:items-center"
            >
              <div className="text-sm">
                <strong>{user.fullName ?? user.username}</strong>
                <div className="text-xs text-gray-600">
                  {t("user.role")}:{" "}
                  {user.isAdmin ? t("user.role.admin") : t("user.role.user")} •{" "}
                  {user.status}
                </div>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button
                  tooltip={t("button.edit")}
                  icon={Icons.edit}
                  size="small"
                  variant="primary"
                  onClick={() => setCurrentUser(user)}
                />
                <Button
                  tooltip={t("button.delete")}
                  icon={Icons.delete}
                  size="small"
                  variant="danger"
                  onClick={() => setUserToDelete(user)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 🔍 Filter modal */}
      {showFilterModal && (
        <UserFilterModal
          filters={tmpFilters}
          onChange={setTmpFilters}
          originalFilters={userFilters}
          onClose={() => setShowFilterModal(false)}
          onApply={() => {
            dispatch(setUserFilters(tmpFilters));
            setShowFilterModal(false);
          }}
        />
      )}

      {/* ✏️ Create/Edit modal */}
      {currentUser && (
        <UserModal
          currentUser={currentUser}
          onClose={() => setCurrentUser(undefined)}
          onSubmit={(user) => {
            saveUser({ entity: user });
            setCurrentUser(undefined);
          }}
        />
      )}

      {/* ❌ Delete modal */}
      {userToDelete && (
        <UserDeleteConfirmModal
          user={userToDelete}
          onClose={() => setUserToDelete(undefined)}
          onConfirm={() => {
            deleteUser(userToDelete.id as number);
            setUserToDelete(undefined);
          }}
        />
      )}
    </section>
  );
}
