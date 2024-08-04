import { mainApi } from '@Apis/Api'
import { API } from '@Constants/api.constants'
import { RESPONSE } from '@Constants/response.constants'
import type {
  GetGroupMembersRequestType,
  GetGroupMembersResponseType,
  GetUserGroupsRequestDataType,
  GetUserGroupsResponseType,
  GroupCreateRequestDataType,
  GroupDataType,
  GroupInfoRequestType,
  GroupInfoResponseType,
  GroupMemberInfoRequestType,
  GroupUpdateRequestDataType,
} from '@Models/GroupModels'
import type { PaginatedRequestType } from '@Models/ResponseModels'
import { initiateRefetch } from '@Utils/helpers'

const extendedGroupApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserGroups: builder.query<
      GetUserGroupsResponseType,
      GetUserGroupsRequestDataType & PaginatedRequestType
    >({
      providesTags: (result, _, { username }) =>
        result?.data.groups
          ? [
              ...result.data.groups.map((group) => ({ type: 'Group' as const, id: group.slug })),
              { type: 'Group', username },
            ]
          : [{ type: 'Group', username }],
      query: ({ username, page = 1, limit = RESPONSE.DOCUMENTS_LIMIT, searchQuery = '' }) => ({
        url: `${API.GROUPS}?searchQuery=${searchQuery}&username=${username}&page=${page}&limit=${limit}`,
      }),
    }),
    createGroup: builder.mutation<GroupDataType, GroupCreateRequestDataType>({
      invalidatesTags: (_, error, { username }) =>
        !error?.status
          ? [
              { type: 'Group', username },
              { type: 'User', id: username },
            ]
          : [],
      query: ({ formData }) => ({
        url: API.GROUPS,
        method: 'POST',
        body: formData,
      }),
      onQueryStarted: initiateRefetch('groups'),
    }),
    getGroup: builder.query<GroupInfoResponseType, GroupInfoRequestType>({
      providesTags: (result) =>
        result?.data.group ? [{ type: 'Group', id: result.data.group.slug }, 'Group'] : [],
      query: ({ slug }) => ({
        url: `${API.GROUPS}/${slug}`,
      }),
    }),
    updateGroup: builder.mutation<GroupInfoResponseType, GroupUpdateRequestDataType>({
      invalidatesTags: (result) =>
        result?.data.group ? [{ type: 'Group', id: result.data.group.slug }] : [],
      query: ({ slug, formData }) => ({
        url: `${API.GROUPS}/${slug}`,
        method: 'PATCH',
        body: formData,
      }),
      onQueryStarted: initiateRefetch('groups'),
    }),
    deleteGroup: builder.mutation<void, GroupInfoRequestType>({
      invalidatesTags: (_, error, { slug, username }) =>
        !error?.status
          ? [
              { type: 'Group', id: slug },
              { type: 'User', id: username },
            ]
          : [],
      query: ({ slug }) => ({
        url: `${API.GROUPS}/${slug}`,
        method: 'DELETE',
      }),
      onQueryStarted: initiateRefetch('groups'),
    }),
    getGroupMembers: builder.query<
      GetGroupMembersResponseType,
      GetGroupMembersRequestType & PaginatedRequestType
    >({
      providesTags: (result, _, { slug }) =>
        result?.data.members ? [{ type: 'Member' as const, id: slug }, 'Member'] : [],
      query: ({ slug, id, searchQuery = '', page = 1, limit = RESPONSE.GROUP_MEMBERS_LIMIT }) => ({
        url: `${API.GROUPS}/${
          slug || id
        }/members?searchQuery=${searchQuery}&page=${page}&limit=${limit}`,
      }),
    }),
    leaveGroup: builder.mutation<void, GroupInfoRequestType>({
      invalidatesTags: (_, error, { slug, username }) =>
        !error?.status
          ? [
              { type: 'Member' as const, id: slug },
              { type: 'Group', id: slug },
              { type: 'User', id: username },
            ]
          : [],
      query: ({ slug }) => ({
        url: `${API.GROUPS}/${slug}/members`,
        method: 'DELETE',
      }),
      onQueryStarted: initiateRefetch('groups'),
    }),
    deleteGroupMember: builder.mutation<void, GroupMemberInfoRequestType>({
      invalidatesTags: (_, error, { slug, username }) =>
        !error?.status
          ? [
              { type: 'Member' as const, id: slug },
              { type: 'Group', id: slug },
              { type: 'User', id: username },
            ]
          : [],
      query: ({ slug, membershipId }) => ({
        url: `${API.GROUPS}/${slug}/members/${membershipId}`,
        method: 'DELETE',
      }),
      onQueryStarted: initiateRefetch('groups', 'members'),
    }),
  }),
})

export { extendedGroupApi }
