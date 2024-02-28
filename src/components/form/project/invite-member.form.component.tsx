import { Button, Select, Space } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { InviteMemberSchema } from './project.schema';
import { useGetMemberQuery } from '@/src/hooks/member/useGetQueryMember';
import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { COLORS } from '@/src/constant/colors.constant';
import { usePostMemberInvitation } from '@/src/hooks/project/usePostMemberInvitation';

const InviteMemberForm = ({ project }: any) => {
  const { data: members } = useGetMemberQuery();
  const [membersSelectOption, setMembersSelectOption] = useState([]);

  const { mutate: sendInvitation } = usePostMemberInvitation();
  const form = useForm({
    validate: yupResolver(InviteMemberSchema),
    initialValues: {
      member: '',
    },
  });

  useEffect(() => {
    const membersOption = members?.data?.map((member: any) => {
      return {
        value: member.id,
        label: `${member.user?.firstname} ${member.user?.lastname}`,
      };
    });

    setMembersSelectOption(!members ? [] : membersOption);
  }, [members]);

  const handleSubmitInvitation = form.onSubmit((values) => {
    const payload = {
      projectId: project.id,
      member: values.member,
    };
    console.log('member : ', payload);

    sendInvitation(payload);
  });

  //   console.log('member : ', project);

  return (
    <form onSubmit={handleSubmitInvitation}>
      <Select
        data={membersSelectOption}
        placeholder="Pilih Member"
        label="Members"
        dropdownPosition="bottom"
        {...form.getInputProps('member')}
      />

      <Space h={25} />

      <div>
        <Button
          fullWidth
          type="submit"
          bg={COLORS.PRIMARY}
          leftIcon={<IconPlus />}
        >
          Tambah Member
        </Button>
      </div>
    </form>
  );
};

export default InviteMemberForm;
