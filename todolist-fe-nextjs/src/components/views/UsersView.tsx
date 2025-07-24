"use client";

import { useEffect, useState } from "react";
import { useT } from "@/hooks/useTranslation";
import { Icons } from "@/lib/icons/Icons";
import { getUsers } from "@/lib/api/users";
import Modal from "@/components/ui/Modal";

interface User {
  id?: number;
  username: string;
  fullName?: string;
  status: string;
  isAdmin?: boolean;
}

export default function UsersView() {
  const [users, setUsers] = useState<User[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const t = useT();

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  const clearFilters = () => {
    getUsers().then(setUsers).catch(console.error);
  };

  return (
    <section className="p-6 space-y-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">Gestione Utenti</h2>

      {/* 🆕 New user + Filters */}
      <div className="flex justify-between items-center gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">
          {Icons.plus}
          {t("button.create")}
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
          >
            {Icons.filter}
            {t("button.filter")}
          </button>
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-red-500 hover:underline"
          >
            {Icons.removeFilter}
            {t("button.filter.remove")}
          </button>
        </div>
      </div>

      {/* 🔍 Filters modal */}
      {showFilterModal && (
        <Modal
          title="Filtra utenti"
          onClose={() => setShowFilterModal(false)}
          footerActions={[
            { label: t("button.cancel"), onClick: () => setShowFilterModal(false) }
          ]}
        >
          <div className="space-y-2 text-sm">
            <p>
              Qui puoi aggiungere i criteri di filtro (username, stato, ecc.)
            </p>
          </div>
        </Modal>
      )}

      {/* 📋 User List */}
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="border p-4 rounded shadow-sm flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center"
          >
            <div className="text-sm">
              <div>
                <strong>{user.fullName ?? user.username}</strong>{" "}
                <span className="text-xs text-gray-500"></span>
              </div>
              <div className="text-xs text-gray-600">
                Role: {user.isAdmin ? "Admin" : "User"} • {user.status}
              </div>
            </div>

            {/* 🛠 Actions */}
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-1">
                {Icons.edit}
                {t("button.edit")}
              </button>
              <button className="text-sm px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1">
                {Icons.delete}
                {t("button.delete")}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
