import React, { type ChangeEvent } from 'react';
import './search.css';

export interface SearchProps {
    /** Input value */
    value: string;
    /** Placeholder text */
    placeholder?: string;
    /** Loading state */
    loading?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Called on input change */
    onChange: (value: string) => void;
    /** Called on submit */
    onSearch?: () => void;
}

/** Search component styled like Storybook Button */
export const Search = ({
    value,
    placeholder = 'Search...',
    loading = false,
    disabled = false,
    onChange,
    onSearch
}: SearchProps) => {
    const isDisabled = disabled || loading;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!isDisabled) {
            onSearch?.();
        }
    };

    return (
        <form className={`storybook-search ${loading ? 'storybook-search--loading' : ''}`} onSubmit={handleSubmit}>
            <input
                type='text'
                className='storybook-search__input'
                value={value}
                placeholder={placeholder}
                disabled={isDisabled}
                onChange={handleChange}
            />

            <button type='submit' className='storybook-search__button' disabled={isDisabled} aria-busy={loading}>
                {loading ? '⏳' : 'Search'}
            </button>
        </form>
    );
};
