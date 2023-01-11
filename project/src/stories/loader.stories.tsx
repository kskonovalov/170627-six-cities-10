import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Loader from '../components/ux/loader';

export default {
  title: 'Loader',
  component: Loader,
  parameters: {}
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = () => <Loader />;

export const Loading = Template.bind({});
