export interface Column {
  name: string;
  type: 'STRING' | 'DECIMAL' | 'LONG' | 'DOUBLE' | 'DATE' | 'DATETIME';
}

export interface Schema {
  columns: Column[];
}

export interface DataSet {
  id?: string;
  name?: string;
  description?: string;
  owner?: {
    id?: string;
    name?: string;
  };
  columns?: number;
  createdAt?: string;
  updatedAt?: string;
  dataCurrentAt?: string;
  schema?: Schema;
  pdpEnabled?: boolean;
  policies?: Policy[];
  rows?: number;
}

export interface Policy {
  name?: string;
  type?: string;
  users?: number[];
  groups?: number[];
  filters?: PolicyFilter[];
}

export interface PolicyFilter {
  column: string;
  not: boolean;
  operator: string;
  values: string[];
}
