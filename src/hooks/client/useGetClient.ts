import ClientQueryApi from '@/pages/api/client/client-query.api';
import ProjectsQueryApi from '@/pages/api/project/project-query';
import { useQuery } from '@tanstack/react-query';

export const useGetClientsQuery = () => {
  return useQuery({
    queryKey: ['get-clients-id-key'],
    queryFn: () => ClientQueryApi.getAllClients(),
  });
};
