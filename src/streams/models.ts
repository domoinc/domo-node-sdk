import { DataSet } from '../datasets/models';

export interface CreateStreamRequest {
  dataSet: DataSet;
  updateMethod: string;
}

export interface UpdateStreamRequest {
  updateMethod: string;
}
