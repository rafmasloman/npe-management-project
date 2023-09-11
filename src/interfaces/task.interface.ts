export interface ITaskProps {
  name: string;
  startedDate: Date;
  endDate: Date;
  project?: Array<any>;
  status: string;
  milestone: string;
  assignedTo: string;
}
