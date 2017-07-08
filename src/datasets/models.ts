export interface Column {
  name: string;
  type: string;
}

export interface Schema {
  columns: Column[];
}

export interface DataSet {
  name: string;
  description: string;
  schema: Schema;
}

export interface CreateDatasetRequest extends DataSet {}
export interface UpdateDatasetRequest extends DataSet {}

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
