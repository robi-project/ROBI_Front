import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllRobotQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllRobotQuery = { __typename?: 'Query', getAllRobots: Array<{ __typename?: 'Robot', id: string, nom: string, etat: string }> };


export const GetAllRobotDocument = gql`
    query GetAllRobot {
  getAllRobots {
    id
    nom
    etat
  }
}
    `;

/**
 * __useGetAllRobotQuery__
 *
 * To run a query within a React component, call `useGetAllRobotQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRobotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRobotQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRobotQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRobotQuery, GetAllRobotQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRobotQuery, GetAllRobotQueryVariables>(GetAllRobotDocument, options);
      }
export function useGetAllRobotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRobotQuery, GetAllRobotQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRobotQuery, GetAllRobotQueryVariables>(GetAllRobotDocument, options);
        }
export function useGetAllRobotSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRobotQuery, GetAllRobotQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRobotQuery, GetAllRobotQueryVariables>(GetAllRobotDocument, options);
        }
export type GetAllRobotQueryHookResult = ReturnType<typeof useGetAllRobotQuery>;
export type GetAllRobotLazyQueryHookResult = ReturnType<typeof useGetAllRobotLazyQuery>;
export type GetAllRobotSuspenseQueryHookResult = ReturnType<typeof useGetAllRobotSuspenseQuery>;
export type GetAllRobotQueryResult = Apollo.QueryResult<GetAllRobotQuery, GetAllRobotQueryVariables>;