import { IMemberProps } from './member.interface';
import { IPlatformService } from './platform.interface';
import { ITaskProps } from './task.interface';

export interface IProjectCardProps {
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

export interface IProjectDataParams {
  projectName: string;
  client: string;
  platform: string;
  startedDate: Date;
  endDate: Date;
  description: string;
  projectIcon: File | any;
  member: any[];
  price: number;
}
