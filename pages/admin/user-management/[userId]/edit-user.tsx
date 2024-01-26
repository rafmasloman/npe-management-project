import UserQueryApi from '@/pages/api/user/user-query';
import UserForm from '@/src/components/form/client/client.form.component';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import { __getBrowserAuthCookie } from '@/src/utils/cookie.util';
import { useRouter } from 'next/router';
// import { cookies } from 'next/headers';

export async function getServerSideProps(context: any) {
  const userId = context.params.userId;

  const user = await UserQueryApi.getUserQueryById(userId);

  const repo = '';
  return { props: { user } };
}

const EditUser = () => {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      <FormLayout pathname={pathname} title="Add User" pageTitle="Tambah User">
        <UserForm />
      </FormLayout>
    </MainLayout>
  );
};

export default EditUser;
