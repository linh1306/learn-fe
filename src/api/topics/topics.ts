/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Social Learning Platform API
 * The Social Learning Platform API description
 * OpenAPI spec version: 1.0
 */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  ApiGetTopicsParams,
  BodyCreateTopicDto,
  BodyCreateVocabularyDto,
  BodyUpdateTopicDto,
  ResFindOneTopicDto,
  TopicsDto
} from '../../model';

import { customMutator } from '.././index';
import type { ErrorType , BodyType } from '.././index';




/**
 * @summary Tạo topic
 */
export const apiCreateTopic = (
    bodyCreateTopicDto: BodyType<BodyCreateTopicDto>,
 signal?: AbortSignal
) => {
      
      
      return customMutator<TopicsDto>(
      {url: `/topics`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: bodyCreateTopicDto, signal
    },
      );
    }
  


export const getApiCreateTopicMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiCreateTopic>>, TError,{data: BodyType<BodyCreateTopicDto>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof apiCreateTopic>>, TError,{data: BodyType<BodyCreateTopicDto>}, TContext> => {

const mutationKey = ['apiCreateTopic'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof apiCreateTopic>>, {data: BodyType<BodyCreateTopicDto>}> = (props) => {
          const {data} = props ?? {};

          return  apiCreateTopic(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApiCreateTopicMutationResult = NonNullable<Awaited<ReturnType<typeof apiCreateTopic>>>
    export type ApiCreateTopicMutationBody = BodyType<BodyCreateTopicDto>
    export type ApiCreateTopicMutationError = ErrorType<unknown>

    /**
 * @summary Tạo topic
 */
export const useApiCreateTopic = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiCreateTopic>>, TError,{data: BodyType<BodyCreateTopicDto>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof apiCreateTopic>>,
        TError,
        {data: BodyType<BodyCreateTopicDto>},
        TContext
      > => {

      const mutationOptions = getApiCreateTopicMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary Lấy danh sách topic
 */
export const apiGetTopics = (
    params?: ApiGetTopicsParams,
 signal?: AbortSignal
) => {
      
      
      return customMutator<TopicsDto[]>(
      {url: `/topics`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getApiGetTopicsQueryKey = (params?: ApiGetTopicsParams,) => {
    return [`/topics`, ...(params ? [params]: [])] as const;
    }

    
export const getApiGetTopicsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopics>>, ApiGetTopicsParams['page']>, TError = ErrorType<unknown>>(params?: ApiGetTopicsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData, QueryKey, ApiGetTopicsParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiGetTopicsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiGetTopics>>, QueryKey, ApiGetTopicsParams['page']> = ({ signal, pageParam }) => apiGetTopics({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000, refetchOnWindowFocus: false, retry: false,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData, QueryKey, ApiGetTopicsParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ApiGetTopicsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof apiGetTopics>>>
export type ApiGetTopicsInfiniteQueryError = ErrorType<unknown>


export function useApiGetTopicsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopics>>, ApiGetTopicsParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  ApiGetTopicsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData, QueryKey, ApiGetTopicsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiGetTopics>>,
          TError,
          Awaited<ReturnType<typeof apiGetTopics>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApiGetTopicsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopics>>, ApiGetTopicsParams['page']>, TError = ErrorType<unknown>>(
 params?: ApiGetTopicsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData, QueryKey, ApiGetTopicsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiGetTopics>>,
          TError,
          Awaited<ReturnType<typeof apiGetTopics>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApiGetTopicsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopics>>, ApiGetTopicsParams['page']>, TError = ErrorType<unknown>>(
 params?: ApiGetTopicsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData, QueryKey, ApiGetTopicsParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách topic
 */

export function useApiGetTopicsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopics>>, ApiGetTopicsParams['page']>, TError = ErrorType<unknown>>(
 params?: ApiGetTopicsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData, QueryKey, ApiGetTopicsParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getApiGetTopicsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions , queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getApiGetTopicsQueryOptions = <TData = Awaited<ReturnType<typeof apiGetTopics>>, TError = ErrorType<unknown>>(params?: ApiGetTopicsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiGetTopicsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiGetTopics>>> = ({ signal }) => apiGetTopics(params, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000, refetchOnWindowFocus: false, retry: false,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ApiGetTopicsQueryResult = NonNullable<Awaited<ReturnType<typeof apiGetTopics>>>
export type ApiGetTopicsQueryError = ErrorType<unknown>


export function useApiGetTopics<TData = Awaited<ReturnType<typeof apiGetTopics>>, TError = ErrorType<unknown>>(
 params: undefined |  ApiGetTopicsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiGetTopics>>,
          TError,
          Awaited<ReturnType<typeof apiGetTopics>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApiGetTopics<TData = Awaited<ReturnType<typeof apiGetTopics>>, TError = ErrorType<unknown>>(
 params?: ApiGetTopicsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiGetTopics>>,
          TError,
          Awaited<ReturnType<typeof apiGetTopics>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApiGetTopics<TData = Awaited<ReturnType<typeof apiGetTopics>>, TError = ErrorType<unknown>>(
 params?: ApiGetTopicsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách topic
 */

export function useApiGetTopics<TData = Awaited<ReturnType<typeof apiGetTopics>>, TError = ErrorType<unknown>>(
 params?: ApiGetTopicsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopics>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getApiGetTopicsQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Lấy thông tin topic theo ID
 */
export const apiGetTopic = (
    topicId: string,
 signal?: AbortSignal
) => {
      
      
      return customMutator<ResFindOneTopicDto>(
      {url: `/topics/${topicId}`, method: 'GET', signal
    },
      );
    }
  

export const getApiGetTopicQueryKey = (topicId: string,) => {
    return [`/topics/${topicId}`] as const;
    }

    
export const getApiGetTopicInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopic>>>, TError = ErrorType<unknown>>(topicId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiGetTopicQueryKey(topicId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiGetTopic>>> = ({ signal }) => apiGetTopic(topicId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(topicId),  staleTime: 10000, refetchOnWindowFocus: false, retry: false,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ApiGetTopicInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof apiGetTopic>>>
export type ApiGetTopicInfiniteQueryError = ErrorType<unknown>


export function useApiGetTopicInfinite<TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopic>>>, TError = ErrorType<unknown>>(
 topicId: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiGetTopic>>,
          TError,
          Awaited<ReturnType<typeof apiGetTopic>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApiGetTopicInfinite<TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopic>>>, TError = ErrorType<unknown>>(
 topicId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiGetTopic>>,
          TError,
          Awaited<ReturnType<typeof apiGetTopic>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApiGetTopicInfinite<TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopic>>>, TError = ErrorType<unknown>>(
 topicId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin topic theo ID
 */

export function useApiGetTopicInfinite<TData = InfiniteData<Awaited<ReturnType<typeof apiGetTopic>>>, TError = ErrorType<unknown>>(
 topicId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getApiGetTopicInfiniteQueryOptions(topicId,options)

  const query = useInfiniteQuery(queryOptions , queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getApiGetTopicQueryOptions = <TData = Awaited<ReturnType<typeof apiGetTopic>>, TError = ErrorType<unknown>>(topicId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiGetTopicQueryKey(topicId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiGetTopic>>> = ({ signal }) => apiGetTopic(topicId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(topicId),  staleTime: 10000, refetchOnWindowFocus: false, retry: false,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ApiGetTopicQueryResult = NonNullable<Awaited<ReturnType<typeof apiGetTopic>>>
export type ApiGetTopicQueryError = ErrorType<unknown>


export function useApiGetTopic<TData = Awaited<ReturnType<typeof apiGetTopic>>, TError = ErrorType<unknown>>(
 topicId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiGetTopic>>,
          TError,
          Awaited<ReturnType<typeof apiGetTopic>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApiGetTopic<TData = Awaited<ReturnType<typeof apiGetTopic>>, TError = ErrorType<unknown>>(
 topicId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiGetTopic>>,
          TError,
          Awaited<ReturnType<typeof apiGetTopic>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApiGetTopic<TData = Awaited<ReturnType<typeof apiGetTopic>>, TError = ErrorType<unknown>>(
 topicId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin topic theo ID
 */

export function useApiGetTopic<TData = Awaited<ReturnType<typeof apiGetTopic>>, TError = ErrorType<unknown>>(
 topicId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiGetTopic>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getApiGetTopicQueryOptions(topicId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Cập nhật thông tin topic
 */
export const apiUpdateTopic = (
    topicId: string,
    bodyUpdateTopicDto: BodyType<BodyUpdateTopicDto>,
 ) => {
      
      
      return customMutator<TopicsDto>(
      {url: `/topics/${topicId}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: bodyUpdateTopicDto
    },
      );
    }
  


export const getApiUpdateTopicMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiUpdateTopic>>, TError,{topicId: string;data: BodyType<BodyUpdateTopicDto>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof apiUpdateTopic>>, TError,{topicId: string;data: BodyType<BodyUpdateTopicDto>}, TContext> => {

const mutationKey = ['apiUpdateTopic'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof apiUpdateTopic>>, {topicId: string;data: BodyType<BodyUpdateTopicDto>}> = (props) => {
          const {topicId,data} = props ?? {};

          return  apiUpdateTopic(topicId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApiUpdateTopicMutationResult = NonNullable<Awaited<ReturnType<typeof apiUpdateTopic>>>
    export type ApiUpdateTopicMutationBody = BodyType<BodyUpdateTopicDto>
    export type ApiUpdateTopicMutationError = ErrorType<unknown>

    /**
 * @summary Cập nhật thông tin topic
 */
export const useApiUpdateTopic = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiUpdateTopic>>, TError,{topicId: string;data: BodyType<BodyUpdateTopicDto>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof apiUpdateTopic>>,
        TError,
        {topicId: string;data: BodyType<BodyUpdateTopicDto>},
        TContext
      > => {

      const mutationOptions = getApiUpdateTopicMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary Xóa topic (soft delete)
 */
export const apiRemoveTopic = (
    topicId: string,
 ) => {
      
      
      return customMutator<TopicsDto>(
      {url: `/topics/${topicId}`, method: 'DELETE'
    },
      );
    }
  


export const getApiRemoveTopicMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiRemoveTopic>>, TError,{topicId: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof apiRemoveTopic>>, TError,{topicId: string}, TContext> => {

const mutationKey = ['apiRemoveTopic'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof apiRemoveTopic>>, {topicId: string}> = (props) => {
          const {topicId} = props ?? {};

          return  apiRemoveTopic(topicId,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApiRemoveTopicMutationResult = NonNullable<Awaited<ReturnType<typeof apiRemoveTopic>>>
    
    export type ApiRemoveTopicMutationError = ErrorType<unknown>

    /**
 * @summary Xóa topic (soft delete)
 */
export const useApiRemoveTopic = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiRemoveTopic>>, TError,{topicId: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof apiRemoveTopic>>,
        TError,
        {topicId: string},
        TContext
      > => {

      const mutationOptions = getApiRemoveTopicMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary Thêm từ vựng
 */
export const apiCreateVocabulary = (
    topicId: string,
    bodyCreateVocabularyDto: BodyType<BodyCreateVocabularyDto>,
 signal?: AbortSignal
) => {
      
      
      return customMutator<TopicsDto>(
      {url: `/topics/${topicId}/vocabularies`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: bodyCreateVocabularyDto, signal
    },
      );
    }
  


export const getApiCreateVocabularyMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiCreateVocabulary>>, TError,{topicId: string;data: BodyType<BodyCreateVocabularyDto>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof apiCreateVocabulary>>, TError,{topicId: string;data: BodyType<BodyCreateVocabularyDto>}, TContext> => {

const mutationKey = ['apiCreateVocabulary'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof apiCreateVocabulary>>, {topicId: string;data: BodyType<BodyCreateVocabularyDto>}> = (props) => {
          const {topicId,data} = props ?? {};

          return  apiCreateVocabulary(topicId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApiCreateVocabularyMutationResult = NonNullable<Awaited<ReturnType<typeof apiCreateVocabulary>>>
    export type ApiCreateVocabularyMutationBody = BodyType<BodyCreateVocabularyDto>
    export type ApiCreateVocabularyMutationError = ErrorType<unknown>

    /**
 * @summary Thêm từ vựng
 */
export const useApiCreateVocabulary = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiCreateVocabulary>>, TError,{topicId: string;data: BodyType<BodyCreateVocabularyDto>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof apiCreateVocabulary>>,
        TError,
        {topicId: string;data: BodyType<BodyCreateVocabularyDto>},
        TContext
      > => {

      const mutationOptions = getApiCreateVocabularyMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    