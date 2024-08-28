import React from 'react';
import { IconType } from 'react-icons/lib';

export type TabProp = {
  tab: string;
  title: string;
  IconComp?: IconType;
  className?: string;
};

export type TabsProps = {
  tabName?: string;
  defaultTab?: string;
  tabs: TabProp[];
};
