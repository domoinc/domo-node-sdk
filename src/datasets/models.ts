export interface Column {
  name: string;
  type: string;
}

export interface Schema {
  columns: Column[];
}

export interface DataSet {
  name?: string;
  schema?: Schema;
  description?: string;
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
