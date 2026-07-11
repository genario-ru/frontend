import type { QueryClient, QueryKey } from "@tanstack/react-query";

import type { GetProfileAttachmentsResponseSchema } from "@/codegen/api/product";

type ProfileReferencesListData<TItem> = {
  data: TItem[];
};

export async function cancelProfileReferencesQuery(
  queryClient: QueryClient,
  queryKey: QueryKey,
) {
  await queryClient.cancelQueries({ queryKey });
}

export function getProfileReferencesQuerySnapshot<TData>(
  queryClient: QueryClient,
  queryKey: QueryKey,
) {
  return queryClient.getQueryData<TData>(queryKey);
}

export function restoreProfileReferencesQuerySnapshot<TData>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  snapshot: TData | undefined,
) {
  if (!snapshot) {
    return;
  }

  queryClient.setQueryData(queryKey, snapshot);
}

export function appendProfileReferencesListItem<TItem>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  item: TItem,
) {
  queryClient.setQueryData<ProfileReferencesListData<TItem>>(
    queryKey,
    (current) => ({
      data: [...(current?.data ?? []), item],
    }),
  );
}

export function replaceProfileReferencesListItemById<
  TItem extends { id: string },
>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  itemId: string,
  nextItem: TItem,
) {
  queryClient.setQueryData<ProfileReferencesListData<TItem>>(
    queryKey,
    (current) => {
      if (!current) {
        return current;
      }

      return {
        data: current.data.map((item) =>
          item.id === itemId ? nextItem : item,
        ),
      };
    },
  );
}

export function removeProfileReferencesListItemById<
  TItem extends { id: string },
>(queryClient: QueryClient, queryKey: QueryKey, itemId: string) {
  queryClient.setQueryData<ProfileReferencesListData<TItem>>(
    queryKey,
    (current) => {
      if (!current) {
        return current;
      }

      return {
        data: current.data.filter((item) => item.id !== itemId),
      };
    },
  );
}

export function removeProfileAttachmentListItemByAttachmentId(
  queryClient: QueryClient,
  queryKey: QueryKey,
  attachmentId: string,
) {
  queryClient.setQueryData<GetProfileAttachmentsResponseSchema>(
    queryKey,
    (current) => {
      if (!current) {
        return current;
      }

      return {
        data: current.data.filter(
          (attachment) => attachment.attachmentId !== attachmentId,
        ),
      };
    },
  );
}

export function invalidateProfileReferencesQuery(
  queryClient: QueryClient,
  queryKey: QueryKey,
) {
  void queryClient.invalidateQueries({ queryKey });
}
