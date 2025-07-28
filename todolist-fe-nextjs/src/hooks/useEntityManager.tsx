import { useState } from "react";
import { toast } from "@/lib/toast";

interface EntityManagerCallbacks<T> {
  fetchAll: () => Promise<T[]>;
  create: (item: T) => Promise<T>;
  update: (id: number, item: T) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export function useEntityManager<T>(
  entityName: string,
  callbacks: EntityManagerCallbacks<T>
) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async (): Promise<T[]> => {
    try {
      setLoading(true);
      const data = await callbacks.fetchAll();
      return data;
    } catch (err: unknown) {
      toast.error(`Error while loading ${entityName}`);
      setError(err instanceof Error ? err.message : String(err));
      return [];
    } finally {
      setLoading(false);
    }
  };

  const save = async (item: T & { id?: number }) => {
    try {
      setLoading(true);
      if (item.id != null) {
        await callbacks.update(item.id, item);
      } else {
        await callbacks.create(item);
      }
      toast.success(`${entityName} saved successfully`);
    } catch (err: unknown) {
      toast.error(`Error while saving ${entityName}`);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number) => {
    try {
      setLoading(true);
      await callbacks.remove(id);
      toast.delete(`${entityName} deleted`);
    } catch (err: unknown) {
      toast.error(`Error while deleting ${entityName}`);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getAll,
    save,
    remove,
  };
}