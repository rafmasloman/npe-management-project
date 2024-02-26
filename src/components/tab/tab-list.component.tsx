import { Tabs, rem } from '@mantine/core';

interface ITabListPropsType {
  value: string;
  text?: string;
}

interface TabListDataType {
  id: number;
  value: string;
  text: string;
}

const TabListData: TabListDataType[] = [
  {
    id: 1,
    value: 'overview',
    text: 'Overview',
  },
  {
    id: 2,
    value: 'tasks',
    text: 'Task',
  },
  {
    id: 3,
    value: 'milestone',
    text: 'Milestone',
  },
];

const TabList = () => {
  return (
    <Tabs.List>
      {TabListData.map((item: TabListDataType) => {
        return (
          <Tabs.Tab
            key={item.id}
            fz={rem(16)}
            mr={rem(50)}
            value={item.value}
            pb={rem(20)}
            style={{
              borderWidth: 3,
              bottom: 0,
            }}
            pl={0}
          >
            {item.text}
          </Tabs.Tab>
        );
      })}
    </Tabs.List>
  );
};

export default TabList;
