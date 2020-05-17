import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import { Input, InputProps } from '../Input/input';
import { useDebounce } from '../../hooks/useDebounce';
import classNames from 'classnames';
import { useClickOutside } from '../../hooks/useClickOutSide';
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType>[];
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOption,
    value,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [highlightIndex, setHighLightIndex] = useState(-1);
  const debounceValue = useDebounce(inputValue, 200);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debounceValue) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        console.log('trigger fetch in useEffect');
        setLoading(true);
        results.then((data) => {
          setSuggestions(data);
          setLoading(false);
        });
      } else {
        let res = results as DataSourceType[];
        setSuggestions(res);
      }
    } else {
      setSuggestions([]);
    }
    setHighLightIndex(-1);
  }, [debounceValue]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighLightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  const renderTemplete = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions &&
          suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'item-highlighted': index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {renderTemplete(item)}
              </li>
            );
          })}
      </ul>
    );
  };
  return (
    <div className='r-parts-auto-complete' ref={componentRef}>
      <Input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        {...restProps}
      />
      {loading && <ul>..loadingd</ul>}
      {suggestions && suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
