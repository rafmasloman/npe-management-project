import { Tabs } from '@mantine/core';
import { ReactNode } from 'react';

interface IPanelPropsType {
  value: string;
  panel: JSX.Element;
}

interface ITabPanelPropsType {
  spaces: IPanelPropsType[];
}

const TabPanel = ({ spaces }: ITabPanelPropsType) => {
  return spaces.map((item: IPanelPropsType, index: number) => {
    return (
      <Tabs.Panel key={index} value={item.value}>
        {item.panel}
      </Tabs.Panel>
    );
  });
};

export default TabPanel;
