import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type Entity from "@/types/Entity";
import { Filters } from "@/types/Filters";
import { setLoading, showToast } from "@/store/ui/uiSlice";
import { useT } from "./useTranslation";

export function useFilteredEntities<T extends Entity, F extends Filters>(
  entityQueryHook: () => { data?: T[] },
  filters: F,
  filterFn: (entity: T, filters: F) => boolean
) {
  const { data = [], ...queryRest } = entityQueryHook();

  const filtered = data.filter((item) => filterFn(item, filters));

  const sorted = filtered.sort((e1: Entity, e2: Entity) => {
    if (!e1.id) return -1;
    if (!e2.id) return 1;
    if (e1.id < e2.id) return -1;
    if (e1.id > e2.id) return 1;
    return 0;
  })

  return {
    data: sorted,
    ...queryRest,
  };
}

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
    if (query.isFetching) {
      dispatch(setLoading(true));
    }

    if (query.isError && query.error instanceof Error) {
      dispatch(
        showToast({
          type: "error",
          message: t("entity.fetch.error", {
            entity: t(`entity.${entityName}`),
            error: query.error.message
          }),
        })
      );
      console.error(`error while fetching ${entityName}`, query.error);
    }

    if (!query.isFetching) {
      dispatch(setLoading(false));
    }
  }, [query.isFetching, query.isError, query.error, dispatch, t, entityName]);

  return query;
};

export const useSaveEntity = <T extends Entity>(
  entityName: string,
  createFn: (entity: T) => Promise<T>,
  updateFn: (entity: T) => Promise<void>,
  queryKey?: string[] | undefined
) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const t = useT();

  return useMutation<T | void, Error, { entity: T }>({
    mutationFn: async ({ entity }) => {
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
            message: error.message
          }),
        })
      );
      console.error(`error while saving ${entityName}`, error);
    },
  });
};

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
            message: error.message
          }),
        })
      );
      console.error(`error while deleting ${entityName}`, error);
    },
  });
};
