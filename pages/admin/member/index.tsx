import PageLoading from '@/src/components/loading/page-loading.component';
import MainLayout from '@/src/layouts/main.layout';
import { Table, Text } from '@mantine/core';
import { Suspense } from 'react';

const Member = () => {
  return (
    <MainLayout>
      <Suspense fallback={<PageLoading />}>
        <Text>Member Page</Text>
      </Suspense>
    </MainLayout>
  );
};

export default Member;
