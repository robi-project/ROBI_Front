import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddRobotMutationVariables = Types.Exact<{
  data: Types.NewRobotInput;
}>;


export type AddRobotMutation = { __typename?: 'Mutation', addRobot: { __typename?: 'Robot', id: string, nom: string, etat: string } };


export const AddRobotDocument = gql`
    mutation AddRobot($data: NewRobotInput!) {
  addRobot(data: $data) {
    id
    nom
    etat
  }
}
    `;
export type AddRobotMutationFn = Apollo.MutationFunction<AddRobotMutation, AddRobotMutationVariables>;

/**
 * __useAddRobotMutation__
 *
 * To run a mutation, you first call `useAddRobotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRobotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRobotMutation, { data, loading, error }] = useAddRobotMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddRobotMutation(baseOptions?: Apollo.MutationHookOptions<AddRobotMutation, AddRobotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRobotMutation, AddRobotMutationVariables>(AddRobotDocument, options);
      }
export type AddRobotMutationHookResult = ReturnType<typeof useAddRobotMutation>;
export type AddRobotMutationResult = Apollo.MutationResult<AddRobotMutation>;
export type AddRobotMutationOptions = Apollo.BaseMutationOptions<AddRobotMutation, AddRobotMutationVariables>;