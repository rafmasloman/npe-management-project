import ProjectMutationApi from '@/pages/api/project/project-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePutProject = () => {
  const queryClient = useQueryClient();

  const { replace } = useRouter();

  return useMutation({
    mutationKey: ['put-project-id-key'],
    mutationFn: ({ projectId, payload }: any) =>
      ProjectMutationApi.updateProject(projectId, payload),
    onSuccess(data, variables, context) {
      // queryClient.invalidateQueries({ queryKey: ['post-project-id-key'] });
      //   Notifications({
      //     title: 'User ditambah',
      //     message: 'Berhasil menambah data user',
      //     status: 'SUCCESS',
      //   });
      //   replace(ROUTES.ADMIN_PROJECTS);
    },
  });
};
