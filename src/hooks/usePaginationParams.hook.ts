import { IPaginationParams } from '@/common/type/index.type';
import { useState, useCallback, useMemo } from 'react';

interface UsePaginationOptions {
  defaultPage?: number;
  defaultPageSize?: number;
  defaultTotal?: number;
}

interface UsePaginationResult {
  pagination: IPaginationParams;
  paginationQuery: Pick<IPaginationParams, 'page' | 'pageSize'>;
  onChangePagination: (page: number, pageSize: number) => void;
  setPagination: (pagination: IPaginationParams) => void;
  resetPagination: () => void;
}

/**
 * Hook quản lý trạng thái phân trang (pagination)
 * @param options - Tùy chọn cho hook
 * @returns Đối tượng chứa các thuộc tính và hàm để quản lý phân trang
 */
export function usePaginationParam(options?: UsePaginationOptions): UsePaginationResult {
  const { defaultPage = 1, defaultPageSize = 10, defaultTotal = 1 } = options || {};

  const [pagination, setPagination] = useState<IPaginationParams>({
    page: defaultPage,
    pageSize: defaultPageSize,
    total: defaultTotal,
  });

  const { total, ...paginationQuery } = pagination;

  const onChangePagination = useCallback(
    (page: number, pageSize: number) => {
      const newPagination = { ...pagination, pageSize, page: page };
      setPagination(newPagination);
    },
    [pagination],
  );

  const resetPagination = useCallback(() => {
    setPagination({
      page: defaultPage,
      pageSize: defaultPageSize,
    });
  }, [defaultPage, defaultPageSize]);

  const memoizedPagination = useMemo(() => {
    return {
      page: pagination.page,
      pageSize: pagination.pageSize,
      total: pagination.total,
    };
  }, [pagination.page, pagination.pageSize, pagination.total]);

  return {
    pagination: memoizedPagination,
    paginationQuery,
    onChangePagination,
    setPagination,
    resetPagination,
  };
}

export default usePaginationParam;
