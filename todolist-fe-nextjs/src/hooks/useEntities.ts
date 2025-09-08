import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type Entity from "@/lib/types/Entity";
import { Filters } from "@/lib/types/Filters";
import { useT } from "@/lib/hooks/useTranslation";
import { setLoading, showToast } from "@/store/ui/uiSlice";

/**
 * Hook to retrieve and filter entities with automatic sorting.
 */
export function useFilteredEntities<T extends Entity, F extends Filters>(
  entityQueryHook: () => { data?: T[] },
  filters: F,
  filterFn: (entity: T, filters: F) => boolean
) {
  const { data = [], ...queryRest } = entityQueryHook();

  const filtered = filters
    ? data.filter((item) => filterFn(item, filters))
    : data;

  const sorted = filtered.sort((e1, e2) => (e1.id ?? 0) - (e2.id ?? 0));

  return {
    data: sorted,
    ...queryRest,
  };
}

/**
 * Hook to fetch entities from a remote query with loading and error handling.
 */
export const useEntities = <T extends Entity>(
  entityName: string,
  fetchFn: () => Promise<T[]>,
  queryKey?: string[]
) => {
  const dispatch = useDispatch();
  const t = useT();

  const query = useQuery<T[], Error, T[], string[]>({
    queryKey: queryKey ?? [entityName],
    queryFn: fetchFn,
  });

  useEffect(() => {
    dispatch(setLoading(query.isFetching));

    if (query.isError && query.error instanceof Error) {
      dispatch(
        showToast({
          type: "error",
          message: t("entity.fetch.error", {
            entity: t(`entity.${entityName}`),
            error: query.error.message,
          }),
        })
      );
      console.error(`error while fetching ${entityName}`, query.error);
    }
  }, [query.isFetching, query.isError, query.error, dispatch, t, entityName]);

  return query;
};

/**
 * Hook to save an entity (create or update) with feedback and cache invalidation.
 */
export const useSaveEntity = <T extends Entity>(
  entityName: string,
  createFn: (entity: T) => Promise<T>,
  updateFn: (entity: T) => Promise<void>,
  queryKey?: string[]
) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const t = useT();

  return useMutation<T | void, Error, { entity: T }>({
    mutationFn: async ({ entity }) => {
      if (process.env.NODE_ENV !== "production") {
        console.log(`useSaveEntities[${entityName}]`, { entity });
      }
      dispatch(setLoading(true)); // 🚦 Spinner ON
      if (entity.id) {
        await updateFn(entity); // 🔄 Update
      } else {
        return await createFn(entity); // 🆕 Create
      }
    },
    onSuccess: () => {
      dispatch(setLoading(false)); // 🚦 Spinner OFF
      queryClient.invalidateQueries({ queryKey: queryKey ?? [entityName] });
      dispatch(
        showToast({
          type: "success",
          message: t("entity.save.success", {
            entity: t(`entity.${entityName}`),
          }),
        })
      );
    },
    onError: (error) => {
      dispatch(setLoading(false)); // 🚦 Spinner OFF
      dispatch(
        showToast({
          type: "error",
          message: t("entity.save.error", {
            entity: t(`entity.${entityName}`),
            message: error.message,
          }),
        })
      );
      console.error(`error while saving ${entityName}`, error);
    },
  });
};

/**
 * Hook to delete an entity with feedback and cache invalidation.
 */
export const useDeleteEntity = (
  entityName: string,
  deleteFn: (id: number) => Promise<void>,
  queryKey?: string[]
) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const t = useT();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      dispatch(setLoading(true)); // 🚦 Spinner ON
      await deleteFn(id); // Execute deletion
    },
    onSuccess: () => {
      dispatch(setLoading(false)); // 🚦 Spinner OFF
      queryClient.invalidateQueries({ queryKey: queryKey ?? [entityName] });
      dispatch(
        showToast({
          type: "delete",
          message: t("entity.delete.success", {
            entity: t(`entity.${entityName}`),
          }),
        })
      );
    },
    onError: (error) => {
      dispatch(setLoading(false)); // 🚦 Spinner OFF
      dispatch(
        showToast({
          type: "error",
          message: t("entity.delete.error", {
            entity: t(`entity.${entityName}`),
            message: error.message,
          }),
        })
      );
      console.error(`error while deleting ${entityName}`, error);
    },
  });
};
