export interface CreateGroupRequest {
  default: boolean;
  name: string;
}

export interface ListGroupRequest {
  offset: number;
  limit: number;
}

export interface UpdateGroupRequest {
  name?: string;
  default?: boolean;
  active?: boolean;
}

export interface ListGroupUsersRequest extends ListGroupRequest {}
