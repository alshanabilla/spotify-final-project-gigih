import React, { render, screen } from '@testing-library/react';
import SearchBar from './index';
import { Provider } from 'react-redux';
import store from '../../store'

it('Search Bar components rendered', () => {
    render (<Provider store={store}><SearchBar /></Provider>);

    const searchInput = screen.getByTestId('form-search_input');
    const searchButton = screen.getByTestId('form-search_button');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
});