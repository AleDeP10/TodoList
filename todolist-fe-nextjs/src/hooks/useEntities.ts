import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type Entity from "@/types/Entity";
/*
export const useUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: fetchUsers });

import { useState } from "react";
import { toast } from "@/lib/toast";

interface EntityManagerCallbacks<T> {
  fetchAll: () => Promise<T[]>;
  create: (item: T) => Promise<T>;
  update: (item: T) => Promise<void>;
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
        await callbacks.update(item);
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
}*/

export const useEntities = <T extends Entity>(
  entityType: string,
  fetchCb: () => Promise<T[]>,
  queryKey?: string[] | undefined
) => useQuery({ queryKey: queryKey ?? [entityType], queryFn: fetchCb });

export const useSaveEntity = <T extends Entity>(
  entityName: string,
  createCb: (entity: T) => Promise<T>,
  updateCb: (entity: T) => Promise<void>,
  queryKey?: string[] | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<T | void, Error, { entity: T }>({
    mutationFn: async ({ entity }) => {
      if (entity.id) {
        await updateCb(entity); // → Promise<void>
      } else {
        return await createCb(entity); // → Promise<T>
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey ?? [entityName],
      });
    },
    onError: (error) => {
      console.error(`Error while saving ${entityName}:`, error);
    },
  });
};

export const useDeleteEntity = (
  entityName: string,
  deleteCb: (id: number) => Promise<void>,
  queryKey?: string[]
) => {
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      try {
        setLoading(true);
        await deleteCb(id);
        //toast.delete(`${entityName} eliminato`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        //toast.error(`Errore nella cancellazione di ${entityName}`);
        throw err; // Per propagare l'errore a React Query
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey ?? [entityName] });
    },
  });

  return {
    ...mutation,
    isLoading,
    error,
  };
};
