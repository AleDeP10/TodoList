"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserDto } from "@/lib/types/dto/UserDto";
import { UserFilters } from "@/lib/types/filters/UserFilters";
import { useT } from "@/lib/hooks/useTranslation";
import { Icons } from "@/lib/components/Icons";
import { Button } from "@/lib/components/ui/Button";
import LoadingSpinner from "@/lib/components/ui/LoadingSpinner";
import { useSaveUser, useDeleteUser, useFilteredUsers } from "@/hooks/useUsers";
import { getLoading } from "@/store/ui/getLoading";
import { setUserFilters } from "@/store/user/userSlice";
import { getUserFilters } from "@/store/user/getUserFilters";
import { getCSSVariable } from "@/utils/getCSSVariable";
import UserModal from "@/components/modals/UserModal";
import UserFilterModal from "@/components/modals/UserFilterModal";
import UserDeleteConfirmModal from "@/components/modals/UserDeleteConfirmModal";

export default function UsersView() {
  const t = useT();
  const dispatch = useDispatch();

  const { data: filteredUsers = [] } = useFilteredUsers();
  const { mutate: saveUser } = useSaveUser();
  const { mutate: deleteUser } = useDeleteUser();

  const isLoading = useSelector(getLoading);
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

  const statusClass = {
    ACTIVE: "user--active",
    BLOCKED: "user--blocked",
  };

  return (
    <section className="p-6 space-y-6 mx-auto">
      <h2 className="text-xl font-semibold text-center">
        {t("user.management")}
      </h2>

      {/* 👤 Create & Filter buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <Button
          variant="primary"
          label={t("button.create")}
          icon={Icons.plus}
          size="small"
          backgroundColor={getCSSVariable("--create-bg")}
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
            backgroundColor={getCSSVariable("--filter-bg")}
            onClick={() => setShowFilterModal(true)}
          />
          <Button
            variant="primary"
            label={t("button.filter.remove")}
            icon={Icons.removeFilter}
            size="small"
            backgroundColor={getCSSVariable("--remove-filter-bg")}
            onClick={clearFilters}
          />
        </div>
      </div>

      {/* 📋 User list */}
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`border ${
                statusClass[user.status]
              } p-4 rounded shadow-sm flex flex-wrap items-center justify-between gap-4 sm:items-center`}
            >
              <div className="text-sm">
                <strong>{user.fullName ?? user.username}</strong>
                <div className="text-xs text-[var(--text-secondary)]">
                  {t("user.role")}:{" "}
                  {user.isAdmin ? t("user.role.admin") : t("user.role.user")} •{" "}
                  {user.status}
                </div>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0 ml-auto">
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
