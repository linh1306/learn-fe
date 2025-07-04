/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Social Learning Platform API
 * The Social Learning Platform API description
 * OpenAPI spec version: 1.0
 */
import {
  useMutation
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';

import type {
  BodyChatWithGeminiDto,
  ResChatWithGeminiDto
} from '../../model';

import { customMutator } from '.././index';
import type { ErrorType , BodyType } from '.././index';




/**
 * @summary Chat với ai
 */
export const apiChat = (
    bodyChatWithGeminiDto: BodyType<BodyChatWithGeminiDto>,
 signal?: AbortSignal
) => {
      
      
      return customMutator<ResChatWithGeminiDto>(
      {url: `/chat`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: bodyChatWithGeminiDto, signal
    },
      );
    }
  


export const getApiChatMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiChat>>, TError,{data: BodyType<BodyChatWithGeminiDto>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof apiChat>>, TError,{data: BodyType<BodyChatWithGeminiDto>}, TContext> => {

const mutationKey = ['apiChat'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof apiChat>>, {data: BodyType<BodyChatWithGeminiDto>}> = (props) => {
          const {data} = props ?? {};

          return  apiChat(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApiChatMutationResult = NonNullable<Awaited<ReturnType<typeof apiChat>>>
    export type ApiChatMutationBody = BodyType<BodyChatWithGeminiDto>
    export type ApiChatMutationError = ErrorType<unknown>

    /**
 * @summary Chat với ai
 */
export const useApiChat = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiChat>>, TError,{data: BodyType<BodyChatWithGeminiDto>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof apiChat>>,
        TError,
        {data: BodyType<BodyChatWithGeminiDto>},
        TContext
      > => {

      const mutationOptions = getApiChatMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    