import React from 'react';
import { render } from '@testing-library/react';
import TitleLayout from '../components/Layout/TitleLayout/TitleLayout';

test('render TitleLayout component', () => {
  const wrapper = render(<TitleLayout title="HelloWorld" />);
  const element = wrapper.getByText('HelloWorld') as HTMLElement;
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('SPAN');
  expect(element).toHaveClass('title-txt');
});
