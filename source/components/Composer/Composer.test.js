//Core
import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';

const props = {
  _createPost:          jest.fn(),
  avatar:               'userAvatar',
  currentUserFirstName: 'userName',
}

const comment = 'Merry Xmas!';

const initialState = {
  comment: '',
}

const updatedState = {
  comment,
}

const result = mount(<Composer {...props} />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');

describe('Composer component:', () => {
  test('should have 1 "section" element', () => {
    expect(result.find('section')).toHaveLength(1);
  });

  test('should have 1 "form" element', () => {
    expect(result.find('form')).toHaveLength(1);
  });

  test('should have 1 "textarea" element', () => {
    expect(result.find('textarea')).toHaveLength(1);
  });

  test('should have 1 "input" element', () => {
    expect(result.find('input')).toHaveLength(1);
  });

  test('should have 1 "img" element', () => {
    expect(result.find('img')).toHaveLength(1);
  });

  test('should have valid initial state', () => {
    expect(result.state()).toEqual(initialState);
  });

  test('textarea should be empty initially', () => {
    expect(result.find('textarea').text()).toBe('');
  });

  test('should respond to state change properly', () => {
    result.setState({
      comment,
    })

    expect(result.state()).toEqual(updatedState);
    expect(result.find('textarea').text()).toBe(comment);

    result.setState({
      comment: '',
    });

    expect(result.state()).toEqual(initialState);
    expect(result.find('textarea').text()).toBe('');
  });

  test('should handle textarea "change" event', () => {
    result.find('textarea').simulate('change', {
      target: {
        value: comment,
      }
    });
    expect(result.find('textarea').text()).toBe(comment);
    expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
    expect(result.state()).toEqual(updatedState);
  });

  test('should handle form "submit" event', () => {
    result.find('form').simulate('submit');
    expect(result.state()).toEqual(initialState);
  });

  test('_createPost prop should be invoked once after form submission', () => {
    expect(props._createPost).toHaveBeenCalledTimes(1);
  });

  test('_submitComment and _handleFormSubmit class methods should be invoked once after form is submitted', () => {
    expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  });

  test('should have nonzero length of avatar property in props', () => {
    expect(props.avatar).toBeDefined();
  });

  test('should have nonzero length of currentUserFirstName property in props', () => {
    expect(props.currentUserFirstName).not.toHaveLength(0);
  });

  test('_submitComment function should return null if comment is empty', () => {
    result.setState(initialState);
    result.instance()._submitComment();
    expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    expect(_submitCommentSpy).toHaveReturnedWith(null);
    jest.clearAllMocks();
  });

  test('_submitOnEnter function should be invoked once when "Enter" key is pressed', () => {
    result.find('textarea').simulate('keypress', {
        key: 'Enter'
    });
    expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
    expect(result.state()).toEqual(initialState);
    jest.clearAllMocks();
  });

  test('_submitOnEnter function should not be invoked when "q" key is pressed', () => {
    result.find('textarea').simulate('keypress', {
        key: 'q'
    });
    expect(_submitCommentSpy).toHaveBeenCalledTimes(0);
  });
})
