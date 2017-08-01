import { DataSet } from '../datasets/models';

export interface Stream {
  dataSet?: DataSet;
  updateMethod?: string;
}

export interface StreamExecution {
  id: number;
  startedAt: Date;
  currentState: string;
  createdAt: Date;
  modifiedAt: Date;
  endedAt?: Date;
}
