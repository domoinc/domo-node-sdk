export interface Column {
  name: string;
  type: string;
}

export interface Schema {
  columns: Column[];
}

export interface CreateDatasetRequest {
  name: string;
  description: string;
  schema: Schema;
}

export interface UpdateDatasetRequest extends CreateDatasetRequest {}

export interface ListDatasetRequest {
  sort: string;
  limit: number;
  offset: number;
}

export interface PolicyFilter {
  column: string;
  not: boolean;
  operator: string;
}

export interface CreatePolicyRequest {
  name: string;
  type: string;
  users: number[];
  groups: number[];
  filters: PolicyFilter[];
}

export interface UpdatePolicyRequest extends CreatePolicyRequest {}
