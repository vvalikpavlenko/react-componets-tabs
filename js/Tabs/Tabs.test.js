import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tabs from './Tabs';

const TABS = [
  {
    title: 'Tab1',
    key: 'tab-1',
    body: 'Panel #1'
  },
  {
    title: 'Tab2',
    key: 'tab-2',
    body: 'Panel #2'
  },
  {
    title: 'Tab3',
    key: 'tab-3',
    body: 'Panel #3'
  }
];

describe('Tabs component', () => {
  it('should render correctly', () => {
    const { getByRole, getAllByRole } = render(
      <Tabs
        tabs={TABS}
        title="Test Tabs"
        initialActiveTab={1}
      />
    );

    expect(getByRole('tablist')).toHaveAccessibleName('Test Tabs');

    expect(getAllByRole('tab')).toHaveLength(3);

    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[1].title);
  });

  it('should be the correct behavior when interacting with the mouse', () => {
    const { getByRole, getAllByRole } = render(<Tabs tabs={TABS} title="Test Tabs"/>);

    const buttons = getAllByRole('tab');

    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[0].title);

    userEvent.click(buttons[1]);
    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[1].title);

    userEvent.click(buttons[2]);
    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[2].title);
  });

  it('should be the correct behavior when interacting with the keyboard', () => {
    const { getByRole, getAllByRole } = render(<Tabs tabs={TABS} title="Test Tabs"/>);
    const tabs = getAllByRole('tab');

    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[0].title);

    tabs[0].focus();

    expect(tabs[0]).toHaveFocus();
    fireEvent.keyDown(tabs[0], { key: 'End', keyCode: 35 });
    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[2].title);

    expect(tabs[2]).toHaveFocus();
    fireEvent.keyDown(tabs[2], { key: 'Home', keyCode: 36 });
    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[0].title);

    expect(tabs[0]).toHaveFocus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight', keyCode: 39 });
    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[1].title);

    expect(tabs[1]).toHaveFocus();
    fireEvent.keyDown(tabs[1], { key: 'ArrowLeft', keyCode: 37 });
    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[0].title);

    expect(tabs[0]).toHaveFocus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowLeft', keyCode: 37 });
    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[2].title);

    expect(tabs[2]).toHaveFocus();
    fireEvent.keyDown(tabs[2], { key: 'ArrowRight', keyCode: 39 });
    expect(getByRole('tabpanel')).toHaveAccessibleName(TABS[0].title);
  });
});
