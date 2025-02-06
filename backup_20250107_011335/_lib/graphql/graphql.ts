/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  JSON: { input: Record<string, any>; output: Record<string, any>; }
  Upload: { input: File; output: File; }
};

export type CaseStatus =
  | 'ACTIVE'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'ON_HOLD';

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  role: ChatRole;
  session: ChatSession;
  timestamp: Scalars['DateTime']['output'];
};

export type ChatRole =
  | 'ASSISTANT'
  | 'SYSTEM'
  | 'USER';

export type ChatSession = {
  __typename?: 'ChatSession';
  case?: Maybe<ImmigrationCase>;
  context?: Maybe<Scalars['JSON']['output']>;
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  messages: Array<ChatMessage>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  startedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CreateCaseInput = {
  caseType: Scalars['String']['input'];
  destinationCountry: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Scalars['JSON']['input']>;
  targetDate?: InputMaybe<Scalars['Date']['input']>;
};

export type CreateChatSessionInput = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  context?: InputMaybe<Scalars['JSON']['input']>;
};

export type CreateTaskInput = {
  caseId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type Document = {
  __typename?: 'Document';
  case?: Maybe<ImmigrationCase>;
  expiresAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  status: DocumentStatus;
  storagePath: Scalars['String']['output'];
  type: Scalars['String']['output'];
  uploadedAt: Scalars['DateTime']['output'];
  user: User;
  version: Scalars['Int']['output'];
};

export type DocumentStatus =
  | 'ACTIVE'
  | 'EXPIRED'
  | 'PENDING_REVIEW'
  | 'REJECTED';

export type ImmigrationCase = {
  __typename?: 'ImmigrationCase';
  caseType: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentStage: Scalars['String']['output'];
  destinationCountry: Scalars['String']['output'];
  documents?: Maybe<Array<Document>>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  requirements?: Maybe<Scalars['JSON']['output']>;
  status: CaseStatus;
  targetDate?: Maybe<Scalars['Date']['output']>;
  tasks?: Maybe<Array<Task>>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCase: ImmigrationCase;
  createChatSession: ChatSession;
  createTask: Task;
  deleteCase: Scalars['Boolean']['output'];
  deleteDocument: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  endChatSession: ChatSession;
  sendChatMessage: ChatMessage;
  updateCase: ImmigrationCase;
  updateDocument: Document;
  updateProfile: User;
  updateTask: Task;
  uploadDocument: Document;
};


export type MutationCreateCaseArgs = {
  input: CreateCaseInput;
};


export type MutationCreateChatSessionArgs = {
  input: CreateChatSessionInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteCaseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEndChatSessionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendChatMessageArgs = {
  input: SendChatMessageInput;
};


export type MutationUpdateCaseArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCaseInput;
};


export type MutationUpdateDocumentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDocumentInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
};


export type MutationUploadDocumentArgs = {
  input: UploadDocumentInput;
};

export type Query = {
  __typename?: 'Query';
  case?: Maybe<ImmigrationCase>;
  cases: Array<ImmigrationCase>;
  chatMessages: Array<ChatMessage>;
  chatSessions: Array<ChatSession>;
  documents: Array<Document>;
  me?: Maybe<User>;
  tasks: Array<Task>;
  user?: Maybe<User>;
};


export type QueryCaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCasesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<CaseStatus>;
};


export type QueryChatMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sessionId: Scalars['ID']['input'];
};


export type QueryChatSessionsArgs = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDocumentsArgs = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTasksArgs = {
  caseId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TaskStatus>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type SendChatMessageInput = {
  content: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  sessionId: Scalars['ID']['input'];
};

export type Task = {
  __typename?: 'Task';
  case: ImmigrationCase;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  priority: Scalars['Int']['output'];
  status: TaskStatus;
  title: Scalars['String']['output'];
};

export type TaskStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PENDING';

export type UpdateCaseInput = {
  caseType?: InputMaybe<Scalars['String']['input']>;
  currentStage?: InputMaybe<Scalars['String']['input']>;
  destinationCountry?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<CaseStatus>;
  targetDate?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateDocumentInput = {
  expiresAt?: InputMaybe<Scalars['Date']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DocumentStatus>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  countryOfResidence?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UploadDocumentInput = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  file: Scalars['Upload']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  cases?: Maybe<Array<ImmigrationCase>>;
  chatSessions?: Maybe<Array<ChatSession>>;
  countryOfResidence?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  documents?: Maybe<Array<Document>>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Scalars['JSON']['output']>;
  status: UserStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED';

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, status: UserStatus, emailVerified: boolean, cases?: Array<{ __typename?: 'ImmigrationCase', id: string, caseType: string, status: CaseStatus }> | null } | null };

export type GetCaseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCaseQuery = { __typename?: 'Query', case?: { __typename?: 'ImmigrationCase', id: string, caseType: string, destinationCountry: string, currentStage: string, status: CaseStatus, targetDate?: string | null, requirements?: Record<string, any> | null, notes?: string | null, documents?: Array<{ __typename?: 'Document', id: string, name: string, type: string, status: DocumentStatus }> | null, tasks?: Array<{ __typename?: 'Task', id: string, title: string, status: TaskStatus, dueDate?: string | null }> | null } | null };


export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"cases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caseType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetCaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"case"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caseType"}},{"kind":"Field","name":{"kind":"Name","value":"destinationCountry"}},{"kind":"Field","name":{"kind":"Name","value":"currentStage"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"targetDate"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetCaseQuery, GetCaseQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  JSON: { input: Record<string, any>; output: Record<string, any>; }
  Upload: { input: File; output: File; }
};

export type CaseStatus =
  | 'ACTIVE'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'ON_HOLD';

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  role: ChatRole;
  session: ChatSession;
  timestamp: Scalars['DateTime']['output'];
};

export type ChatRole =
  | 'ASSISTANT'
  | 'SYSTEM'
  | 'USER';

export type ChatSession = {
  __typename?: 'ChatSession';
  case?: Maybe<ImmigrationCase>;
  context?: Maybe<Scalars['JSON']['output']>;
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  messages: Array<ChatMessage>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  startedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CreateCaseInput = {
  caseType: Scalars['String']['input'];
  destinationCountry: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Scalars['JSON']['input']>;
  targetDate?: InputMaybe<Scalars['Date']['input']>;
};

export type CreateChatSessionInput = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  context?: InputMaybe<Scalars['JSON']['input']>;
};

export type CreateTaskInput = {
  caseId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type Document = {
  __typename?: 'Document';
  case?: Maybe<ImmigrationCase>;
  expiresAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  status: DocumentStatus;
  storagePath: Scalars['String']['output'];
  type: Scalars['String']['output'];
  uploadedAt: Scalars['DateTime']['output'];
  user: User;
  version: Scalars['Int']['output'];
};

export type DocumentStatus =
  | 'ACTIVE'
  | 'EXPIRED'
  | 'PENDING_REVIEW'
  | 'REJECTED';

export type ImmigrationCase = {
  __typename?: 'ImmigrationCase';
  caseType: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentStage: Scalars['String']['output'];
  destinationCountry: Scalars['String']['output'];
  documents?: Maybe<Array<Document>>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  requirements?: Maybe<Scalars['JSON']['output']>;
  status: CaseStatus;
  targetDate?: Maybe<Scalars['Date']['output']>;
  tasks?: Maybe<Array<Task>>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCase: ImmigrationCase;
  createChatSession: ChatSession;
  createTask: Task;
  deleteCase: Scalars['Boolean']['output'];
  deleteDocument: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  endChatSession: ChatSession;
  sendChatMessage: ChatMessage;
  updateCase: ImmigrationCase;
  updateDocument: Document;
  updateProfile: User;
  updateTask: Task;
  uploadDocument: Document;
};


export type MutationCreateCaseArgs = {
  input: CreateCaseInput;
};


export type MutationCreateChatSessionArgs = {
  input: CreateChatSessionInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteCaseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEndChatSessionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendChatMessageArgs = {
  input: SendChatMessageInput;
};


export type MutationUpdateCaseArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCaseInput;
};


export type MutationUpdateDocumentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDocumentInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
};


export type MutationUploadDocumentArgs = {
  input: UploadDocumentInput;
};

export type Query = {
  __typename?: 'Query';
  case?: Maybe<ImmigrationCase>;
  cases: Array<ImmigrationCase>;
  chatMessages: Array<ChatMessage>;
  chatSessions: Array<ChatSession>;
  documents: Array<Document>;
  me?: Maybe<User>;
  tasks: Array<Task>;
  user?: Maybe<User>;
};


export type QueryCaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCasesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<CaseStatus>;
};


export type QueryChatMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sessionId: Scalars['ID']['input'];
};


export type QueryChatSessionsArgs = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDocumentsArgs = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTasksArgs = {
  caseId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TaskStatus>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type SendChatMessageInput = {
  content: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  sessionId: Scalars['ID']['input'];
};

export type Task = {
  __typename?: 'Task';
  case: ImmigrationCase;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  priority: Scalars['Int']['output'];
  status: TaskStatus;
  title: Scalars['String']['output'];
};

export type TaskStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PENDING';

export type UpdateCaseInput = {
  caseType?: InputMaybe<Scalars['String']['input']>;
  currentStage?: InputMaybe<Scalars['String']['input']>;
  destinationCountry?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<CaseStatus>;
  targetDate?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateDocumentInput = {
  expiresAt?: InputMaybe<Scalars['Date']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DocumentStatus>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  countryOfResidence?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UploadDocumentInput = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  file: Scalars['Upload']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  cases?: Maybe<Array<ImmigrationCase>>;
  chatSessions?: Maybe<Array<ChatSession>>;
  countryOfResidence?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  documents?: Maybe<Array<Document>>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Scalars['JSON']['output']>;
  status: UserStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED';

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, status: UserStatus, emailVerified: boolean, cases?: Array<{ __typename?: 'ImmigrationCase', id: string, caseType: string, status: CaseStatus }> | null } | null };

export type GetCaseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCaseQuery = { __typename?: 'Query', case?: { __typename?: 'ImmigrationCase', id: string, caseType: string, destinationCountry: string, currentStage: string, status: CaseStatus, targetDate?: string | null, requirements?: Record<string, any> | null, notes?: string | null, documents?: Array<{ __typename?: 'Document', id: string, name: string, type: string, status: DocumentStatus }> | null, tasks?: Array<{ __typename?: 'Task', id: string, title: string, status: TaskStatus, dueDate?: string | null }> | null } | null };


export const GetMeDocument = gql`
    query GetMe {
  me {
    id
    email
    firstName
    lastName
    status
    emailVerified
    cases {
      id
      caseType
      status
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetCaseDocument = gql`
    query GetCase($id: ID!) {
  case(id: $id) {
    id
    caseType
    destinationCountry
    currentStage
    status
    targetDate
    requirements
    notes
    documents {
      id
      name
      type
      status
    }
    tasks {
      id
      title
      status
      dueDate
    }
  }
}
    `;

/**
 * __useGetCaseQuery__
 *
 * To run a query within a React component, call `useGetCaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCaseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCaseQuery(baseOptions: Apollo.QueryHookOptions<GetCaseQuery, GetCaseQueryVariables> & ({ variables: GetCaseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCaseQuery, GetCaseQueryVariables>(GetCaseDocument, options);
      }
export function useGetCaseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCaseQuery, GetCaseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCaseQuery, GetCaseQueryVariables>(GetCaseDocument, options);
        }
export function useGetCaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCaseQuery, GetCaseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCaseQuery, GetCaseQueryVariables>(GetCaseDocument, options);
        }
export type GetCaseQueryHookResult = ReturnType<typeof useGetCaseQuery>;
export type GetCaseLazyQueryHookResult = ReturnType<typeof useGetCaseLazyQuery>;
export type GetCaseSuspenseQueryHookResult = ReturnType<typeof useGetCaseSuspenseQuery>;
export type GetCaseQueryResult = Apollo.QueryResult<GetCaseQuery, GetCaseQueryVariables>;