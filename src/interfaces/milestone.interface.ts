import { IMemberProps } from './member.interface';
import { IPlatformService } from './platform.interface';
import { ITaskProps, ITasksMilestoneResponseData } from './task.interface';

export interface IMilestoneCardProps {
  projectId?: string;
  projectName: string;
  projectIcon?: string;
  platform: string;
  member?: any[];
  task?: any[];
  deadline: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface IMilestoneDataParams {
  milestoneName: string;
  projectId: string;
  startedDate: Date;
  endDate: Date;
  member: any[];
}

export interface IMilestoneProjectResponseData {
  id: number;
  milestoneName: string;
  description: string;
  projectId: string;
  progress: number;
  startedDate: Date;
  endDate: Date;
  status: string;
  task: ITasksMilestoneResponseData[];
}
