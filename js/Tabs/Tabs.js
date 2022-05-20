import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Tabs.module.scss';

export default function Tabs({
  title,
  tabs,
  initialActiveTab
}) {
  const listRef = useRef();
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const moveIndex = (step) => {
    let index = activeTab;
    const tabs = [...listRef.current.children];
    if (step === 'start') {
      index = 0;
    } else if (step === 'end') {
      index = tabs.length - 1;
    } else {
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
  };

  const onKeyDown = (event) => {
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
  };

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
          tabIndex="0"
          aria-labelledby={tab.key}
          className={styles.tabs__section}
          hidden={activeTab !== index}
        >
          {tab.body}
        </div>
      ))}
    </div>
  );
}

Tabs.defaultProps = {
  initialActiveTab: 0
};

Tabs.propTypes = {
  title: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired
  })).isRequired,
  initialActiveTab: PropTypes.number
};
