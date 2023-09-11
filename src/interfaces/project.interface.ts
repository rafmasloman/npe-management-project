import { IMemberProps } from './member.interface';
import { IPlatformService } from './platform.interface';
import { ITaskProps } from './task.interface';

export interface IProjectCardProps {
  projectName: string;
  tag: IPlatformService[];
  taskComplete: number;
  tasks: ITaskProps[];
  member?: IMemberProps[];
  deadline: string;
}
