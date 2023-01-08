import React, { FC, ReactNode, useCallback, useRef, useState } from 'react';

import styles from './Tabs.module.scss';

type propTypes = {
  className?: string;
  title: string;
  tabs: {
    title: string;
    key: string;
    body: ReactNode;
  }[];
  initialActiveTab?: number;
}

const Tabs: FC<propTypes> = ({
  title,
  tabs,
  initialActiveTab = 0
}) => {
  const listRef = useRef(null);
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const moveIndex = useCallback((step: 'start' | 'end' | number) => {
    let index = activeTab;
    //@ts-ignore
    const tabs = [...listRef.current.children];
    if (step === 'start') {
      index = 0;
    } else if (step === 'end') {
      index = tabs.length - 1;
    } else if (typeof step === 'number') {
      const nextIndex = index + step;
      const tabsLength = tabs.length - 1;

      if (nextIndex > tabsLength) {
        index = 0;
      } else if (nextIndex < 0) {
        index = tabsLength;
      } else {
        index = nextIndex;
      }
    }

    setActiveTab(index);
    tabs[index].focus();
  }, []);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.keyCode) {
      case 35: // End
        event.preventDefault();
        return moveIndex('end');
      case 36: // Home
        event.preventDefault();
        return moveIndex('start');
      case 37: // Arrow Left
        return moveIndex(-1);
      case 39: // Arrow right
        return moveIndex(1);
    }
  }, []);

  return (
    <div className={styles.tabs}>
      <div
        className={styles['tabs__wrapper-button']}
        role="tablist"
        ref={listRef}
        aria-label={title}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            id={tab.key}
            role="tab"
            tabIndex={activeTab === index ? 0 : -1}
            aria-selected={activeTab === index}
            aria-controls={tab.key + '-tab'}
            className={styles.tabs__button}
            onClick={() => setActiveTab(index)}
            onKeyDown={onKeyDown}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.key}
          id={tab.key + '-tab'}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={tab.key}
          className={styles.tabs__section}
          hidden={activeTab !== index}
        >
          {tab.body}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
