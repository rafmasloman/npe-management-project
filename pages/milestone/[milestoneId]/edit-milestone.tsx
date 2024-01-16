import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import { useRouter } from 'next/router';
import MainLayout from '@/src/layouts/main.layout';
import FormLayout from '@/src/layouts/form/form.layout';
import MilestoneForm from '@/src/components/form/milestone/milestone.form.component';
import { __setSSRAuthCookie } from '@/src/utils/cookie.util';
import MilestoneQueryAPI from '@/pages/api/milestone/milestone-query';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { params, req } = ctx;

  const milestoneId = params?.milestoneId;

  const cookieToken = cookie.parse(req.headers.cookie!) as any;
  console.log('cookie token : ', cookieToken?.token);

  __setSSRAuthCookie(cookieToken?.token);

  const milestoneDetail = await MilestoneQueryAPI.getDetailMilestone(
    milestoneId as string,
  );

  return { props: { milestoneDetail } };
}

const EditMilestone = ({ milestoneDetail }: any) => {
  const { pathname } = useRouter();

  console.log('milestone edit : ', milestoneDetail.data);

  return (
    <MainLayout>
      <FormLayout
        pathname={pathname}
        title="Add Milestone"
        pageTitle="Tambah Milestone"
      >
        <MilestoneForm
          initValue={{
            milestoneName: milestoneDetail.data?.milestoneName,
            startedDate: new Date(milestoneDetail.data?.startedDate),
            endDate: new Date(milestoneDetail.data?.endDate),
            projectId: milestoneDetail.data?.projectId,
            status: milestoneDetail.data?.status,
          }}
        />
      </FormLayout>
    </MainLayout>
  );
};

export default EditMilestone;
