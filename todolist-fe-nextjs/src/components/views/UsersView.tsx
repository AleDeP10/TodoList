"use client";

import { useEffect, useState } from "react";
import { UserDto } from "@/types/dto/UserDto";
import { UserFilters } from "@/types/filters/UserFilters";
import { useT } from "@/hooks/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser, getUsers, updateUser } from "@/lib/api/users";
import {
  setUsers,
  setUserFilters,
  getFilteredUsers,
  getUserFilters,
} from "@/store/user";
import { Icons } from "@/lib/icons/Icons";
import UserFilterModal from "@/components/modals/UserFilterModal";
import UserModal from "@/components/modals/UserModal";
import { Button } from "@/components/ui/Button";
import UserDeleteConfirmModal from "../modals/UserDeleteConfirmModal";

export default function UsersView() {
  const t = useT();
  const dispatch = useDispatch();
  const users = useSelector(getFilteredUsers);
  const userFilters = useSelector(getUserFilters);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tmpFilters, setTmpFilters] = useState<UserFilters>(userFilters);
  const [currentUser, setCurrentUser] = useState<UserDto | undefined>(
    undefined
  );
  const [userToDelete, setUserToDelete] = useState<UserDto>();

  useEffect(() => {
    getUsers()
      .then((data) => dispatch(setUsers(data)))
      .catch(console.error);
  }, [dispatch]);

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
      {/* 🆕 New user + Filters */}
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
      {/* 📋 User List */}
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="border p-4 rounded shadow-sm flex flex-wrap items-center justify-between gap-4 sm:items-center"
          >
            <div className="text-sm">
              <div>
                <strong>{user.fullName ?? user.username}</strong>
              </div>
              <div className="text-xs text-gray-600">
                {t("user.role")}:{" "}
                {user.isAdmin ? t("user.role.admin") : t("user.role.user")} •{" "}
                {user.status}
              </div>
            </div>

            {/* 🛠 Actions */}
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
      {/* 🔍 Filters modal */}
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
      {/* Create|Edit modal */}
      {currentUser && (
        <UserModal
          currentUser={currentUser}
          onClose={() => setCurrentUser(undefined)}
          onSubmit={async (updatedUser) => {
            try {
              if (updatedUser.id == null) {
                const created = await createUser(updatedUser);
                const refreshed = await getUsers();
                dispatch(setUsers(refreshed));
                console.log("User created:", created);
              } else {
                await updateUser(updatedUser.id, updatedUser);
                const refreshed = await getUsers();
                dispatch(setUsers(refreshed));
                console.log("User updated:", updatedUser);
              }
            } catch (err) {
              console.error("Error while saving user:", err);
            } finally {
              setCurrentUser(undefined);
            }
          }}
        />
      )}
      {/* Delete confirm modal */}
      {userToDelete && (
        <UserDeleteConfirmModal
          user={userToDelete}
          onClose={() => setUserToDelete(undefined)}
          onConfirm={async () => {
            try {
              await deleteUser(userToDelete.id as number);
              const refreshed = await getUsers();
              dispatch(setUsers(refreshed));
              setUserToDelete(undefined);
            } catch (err) {
              console.error("Error during deletion:", err);
            }
          }}
        />
      )}
    </section>
  );
}
