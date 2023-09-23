import { IMemberProps } from './member.interface';
import { IPlatformService } from './platform.interface';
import { ITaskProps } from './task.interface';

export interface IProjectCardProps {
  projectName: string;
  tag: IPlatformService[];
  taskComplete: number;
  tasks: number;
  member?: IMemberProps[];
  deadline: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface IProjectDataParams {
  projectName: string;
  client: string;
  tags: string;
  startedDate: Date;
  endDate: Date;
  description: string;
}
