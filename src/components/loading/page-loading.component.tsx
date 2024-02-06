import { Loader } from '@mantine/core';

const PageLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader size={56} color="blue" />
    </div>
  );
};

export default PageLoading;
