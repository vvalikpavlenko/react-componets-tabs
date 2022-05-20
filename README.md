# Component Tabs
Made according to documentation [`a11y`](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html).
## Example of Tabs completion:
```js
const tabs = [
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

return(
    <Tabs
        title="Test title"
        tabs{tabs}
    />
);
```

### Activate the selected tab
```js
return(
    <Tabs
        title="Test title"
        tabs{tabs}
        initialActiveTab={1}
    />
);
```
