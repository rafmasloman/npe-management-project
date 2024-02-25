import { IMemberProps } from './member.interface';
import { IPlatformService } from './platform.interface';
import { ITaskProps } from './task.interface';

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
  status: string;
  member: any[];
}
