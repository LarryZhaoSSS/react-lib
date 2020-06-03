var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef, } from 'react';
import { Input } from '../Input/input';
import { useDebounce } from '../../hooks/useDebounce';
import classNames from 'classnames';
import { useClickOutside } from '../../hooks/useClickOutSide';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOption = props.renderOption, value = props.value, restProps = __rest(props, ["fetchSuggestions", "onSelect", "renderOption", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighLightIndex = _d[1];
    var debounceValue = useDebounce(inputValue, 200);
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        if (debounceValue) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                console.log('trigger fetch in useEffect');
                setLoading(true);
                results.then(function (data) {
                    setSuggestions(data);
                    setLoading(false);
                });
            }
            else {
                var res = results;
                setSuggestions(res);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighLightIndex(-1);
    }, [debounceValue]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var highlight = function (index) {
        if (index < 0) {
            index = 0;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighLightIndex(index);
    };
    var handleKeyDown = function (e) {
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
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplete = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", null, suggestions &&
            suggestions.map(function (item, index) {
                var cnames = classNames('suggestion-item', {
                    'item-highlighted': index === highlightIndex,
                });
                return (React.createElement("li", { key: index, className: cnames, onClick: function () {
                        handleSelect(item);
                    } }, renderTemplete(item)));
            })));
    };
    return (React.createElement("div", { className: 'r-parts-auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ onChange: handleChange, onKeyDown: handleKeyDown, value: inputValue }, restProps)),
        loading && React.createElement("ul", null, "..loadingd"),
        suggestions && suggestions.length > 0 && generateDropdown()));
};
