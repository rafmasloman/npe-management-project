import UserQueryApi from '@/pages/api/user/user-query';
import UserForm from '@/src/components/form/user/user-form.component';
import { TOKEN_NAME } from '@/src/constant/variables.constant';
import FormLayout from '@/src/layouts/form/form.layout';
import MainLayout from '@/src/layouts/main.layout';
import {
  __getBrowserAuthCookie,
  __getSSRAuthCookie,
  __setSSRAuthCookie,
} from '@/src/utils/cookie.util';
import { useRouter } from 'next/router';
// import { cookies } from 'next/headers';
import cookie from 'cookie';
import {
  IApiCreatePostUserMutationParams,
  IApiCreatePostUserMutationResponse,
  IApiGetUserQueryResponse,
} from '@/src/interfaces/api/user/user-api.interface';

export async function getServerSideProps(context: any) {
  const { params, req } = context;

  const cookieToken = cookie.parse(req.headers.cookie!) as any;

  __setSSRAuthCookie(cookieToken?.token);

  const userDetail = await UserQueryApi.getUserQueryById(params.userId);

  return { props: { userDetail: userDetail.data } };
}

const EditUser = ({
  userDetail,
}: {
  userDetail: IApiCreatePostUserMutationResponse;
}) => {
  const { pathname } = useRouter();

  return (
    <MainLayout>
      <FormLayout pathname={pathname} title="Add User" pageTitle="Tambah User">
        <UserForm
          initialValues={{
            email: userDetail.email,
            username: userDetail.username,
            password: userDetail.password,
            firstname: userDetail.firstname,
            lastname: userDetail.lastname,
            role: userDetail.role,
          }}
        />
      </FormLayout>
    </MainLayout>
  );
};

export default EditUser;
