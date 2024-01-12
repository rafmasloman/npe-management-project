import { Loader } from '@mantine/core';

const PageLoading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 9,
      }}
    >
      <Loader size={56} color="blue" />
    </div>
  );
};

export default PageLoading;
