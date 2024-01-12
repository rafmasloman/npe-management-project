import ProjectMutationApi from '@/pages/api/project/project-mutation';
import Notifications from '@/src/components/notifications/notification.component';
import { ROUTES } from '@/src/constant/routes.constant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const usePostProject = () => {
  const queryClient = useQueryClient();

  const { replace } = useRouter();

  return useMutation({
    mutationKey: ['post-project-id-key'],
    mutationFn: (payload: FormData) =>
      ProjectMutationApi.createProject(payload),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['post-project-id-key'] });

      //   Notifications({
      //     title: 'User ditambah',
      //     message: 'Berhasil menambah data user',
      //     status: 'SUCCESS',
      //   });

      //   replace(ROUTES.ADMIN_PROJECTS);
    },
  });
};
