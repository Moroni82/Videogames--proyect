import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Create from './Create';
import { Provider } from 'react-redux';
import Store from '../store'
import { BrowserRouter } from 'react-router-dom';

it("searchRenderName", () => {
  const { queryByTitle } = render(<Provider store={Store}><BrowserRouter> <Create /> </BrowserRouter></Provider>);
  const input = queryByTitle("name");
  expect(input).toBeTruthy();
});

describe("chaneInputName", () => {
  it("onChangeName", () => {
    const { queryByTitle } = render(<Provider store={Store}><BrowserRouter> <Create /> </BrowserRouter></Provider>);
    const input = queryByTitle("name");
    fireEvent.change(input, { target: { value: 'test '}})
    expect(input.value).toBe('test')
  })
})   

it("searchRenderDate", () => {
  const { queryByTitle } = render(<Provider store={Store}><BrowserRouter> <Create /> </BrowserRouter></Provider>);
  const input = queryByTitle("date");
  expect(input).toBeTruthy();
});

it("searchRenderRating", () => {
  const { queryByTitle } = render(<Provider store={Store}><BrowserRouter> <Create /> </BrowserRouter></Provider>);
  const input = queryByTitle("rating");
  expect(input).toBeTruthy();
});

it("searchRenderDescription", () => {
  const { queryByTitle } = render(<Provider store={Store}><BrowserRouter> <Create /> </BrowserRouter></Provider>);
  const input = queryByTitle("description");
  expect(input).toBeTruthy();
});

it("searchRenderGenreSelector", () => {
  const { queryByTitle } = render(<Provider store={Store}><BrowserRouter> <Create /> </BrowserRouter></Provider>);
  const input = queryByTitle("genres");
  expect(input).toBeTruthy();
});

it("searchRenderPlatformSelector", () => {
  const { queryByTitle } = render(<Provider store={Store}><BrowserRouter> <Create /> </BrowserRouter></Provider>);
  const input = queryByTitle("platforms");
  expect(input).toBeTruthy();
});
