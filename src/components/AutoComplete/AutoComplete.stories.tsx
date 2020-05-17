import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AutoComplete, DataSourceType } from './AutoComplete';
interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
const SimpleComplete = () => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((item) => item.value.includes(query));
  };
  const renderOption = (item: DataSourceType) => {
    const result = item as DataSourceType<LakerPlayerProps>;
    return <h2>Name:{result.value}</h2>;
  };
  return (
    <>
      <AutoComplete
        fetchSuggestions={handleFetch}
        renderOption={renderOption}
        onSelect={action('selected')}
      />
    </>
  );
};
const RemoteAutoComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        const result = items.slice(0, 10).map((item: any) => ({
          value: item.login,
          ...item,
        }));
        return result;
      });
  };
  const renderOption = (item: DataSourceType) => {
    const result = item as DataSourceType<GithubUserProps>;
    return <h2>Name:{result.value}</h2>;
  };
  return (
    <>
      <AutoComplete
        fetchSuggestions={handleFetch}
        renderOption={renderOption}
        onSelect={action('selected')}
      />
    </>
  );
};
storiesOf('AutoComplete component', module)
  .add('AutoComplete', SimpleComplete)
  .add('remote complete', RemoteAutoComplete);
