export interface ITaskProps {
  name: string;
  startedDate: Date;
  endDate: Date;
  project?: Array<any>;
  status: string;
  milestone: string;
  assignedTo: string;
}

export interface ITasksMilestoneResponseData {
  name: string;
  createdAt: string;
  endDate: string;
  projectId: string;
  status: string;
  milestoneId: number;
  priority: string;
}

export interface IQueryAllResponseTaskData {
  id: 36;
  name: string;
  status: string;
  projectId: string;
  priority: string;
  createdAt: Date;
  endDate: Date;
  updatedAt: Date;
  project: {
    projectIcon: string;
    projectName: string;
  };
}
