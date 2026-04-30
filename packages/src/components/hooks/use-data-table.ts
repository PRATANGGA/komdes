import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type TableState,
  type Updater,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import type { ExtendedColumnSort } from '@/components/data-table/types';
import { useDebouncedCallback } from '@/components/hooks/use-debounced-callback';

const DEBOUNCE_MS = 300;

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      | 'state'
      | 'pageCount'
      | 'getCoreRowModel'
      | 'manualFiltering'
      | 'manualPagination'
      | 'manualSorting'
    >,
    Required<Pick<TableOptions<TData>, 'pageCount'>> {
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: ExtendedColumnSort<TData>[];
  };
  debounceMs?: number;
  enableAdvancedFilter?: boolean;
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const {
    columns,
    pageCount = -1,
    initialState,
    debounceMs = DEBOUNCE_MS,
    enableAdvancedFilter = false,
    page: controlledPage,
    perPage: controlledPerPage,
    onPageChange,
    onPerPageChange,
    ...tableProps
  } = props;

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {},
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    initialState?.columnVisibility ?? {},
  );

  const [internalPage, setInternalPage] = React.useState<number>(
    initialState?.pagination?.pageIndex !== undefined ? initialState.pagination.pageIndex + 1 : 1,
  );
  const [internalPerPage, setInternalPerPage] = React.useState<number>(
    initialState?.pagination?.pageSize ?? 10,
  );

  const page = controlledPage ?? internalPage;
  const perPage = controlledPerPage ?? internalPerPage;

  const pagination: PaginationState = React.useMemo(() => {
    return {
      pageIndex: page - 1, // zero-based index -> one-based index
      pageSize: perPage,
    };
  }, [page, perPage]);

  const onPaginationChange = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === 'function') {
        const newPagination = updaterOrValue(pagination);
        const newPage = newPagination.pageIndex + 1;

        if (controlledPage === undefined) setInternalPage(newPage);
        if (controlledPerPage === undefined) setInternalPerPage(newPagination.pageSize);

        onPageChange?.(newPage);
        onPerPageChange?.(newPagination.pageSize);
      } else {
        const newPage = updaterOrValue.pageIndex + 1;
        if (controlledPage === undefined) setInternalPage(newPage);
        if (controlledPerPage === undefined) setInternalPerPage(updaterOrValue.pageSize);

        onPageChange?.(newPage);
        onPerPageChange?.(updaterOrValue.pageSize);
      }
    },
    [pagination, controlledPage, controlledPerPage, onPageChange, onPerPageChange],
  );

  const [sorting, setSorting] = React.useState<ExtendedColumnSort<TData>[]>(
    initialState?.sorting ?? [],
  );

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      if (typeof updaterOrValue === 'function') {
        const newSorting = updaterOrValue(sorting);
        setSorting(newSorting as ExtendedColumnSort<TData>[]);
      } else {
        setSorting(updaterOrValue as ExtendedColumnSort<TData>[]);
      }
    },
    [sorting],
  );

  const filterableColumns = React.useMemo(() => {
    if (enableAdvancedFilter) return [];
    return columns.filter((column) => column.enableColumnFilter);
  }, [columns, enableAdvancedFilter]);

  const [filterValues, setFilterValuesRef] = React.useState<
    Record<string, string | string[] | null>
  >({});

  const setFilterValues = React.useCallback((updates: Record<string, string | string[] | null>) => {
    setFilterValuesRef((prev) => ({ ...prev, ...updates }));
  }, []);

  const debouncedSetFilterValues = useDebouncedCallback(
    (values: Record<string, string | string[] | null>) => {
      if (controlledPage === undefined) setInternalPage(1);
      onPageChange?.(1);
      setFilterValues(values);
    },
    debounceMs,
  );

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialState?.columnFilters ?? [],
  );

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      if (enableAdvancedFilter) return;

      setColumnFilters((prev) => {
        const next = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue;

        const filterUpdates = next.reduce<Record<string, string | string[] | null>>(
          (acc, filter) => {
            if (filterableColumns.find((column) => column.id === filter.id)) {
              acc[filter.id] = filter.value as string | string[];
            }
            return acc;
          },
          {},
        );

        for (const prevFilter of prev) {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = null;
          }
        }

        debouncedSetFilterValues(filterUpdates);
        return next;
      });
    },
    [debouncedSetFilterValues, filterableColumns, enableAdvancedFilter],
  );

  const table = useReactTable({
    ...tableProps,
    columns,
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange,
    pageCount,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
      sorting,
    },
  });

  return { filterValues, page, perPage, sorting, table };
}
