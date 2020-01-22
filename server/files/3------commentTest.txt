// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import {Comment} from "../src/widgets";

describe('Comment test', () => {


  it('initially', () => {
    let instance = Comment.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.props.tekst).toMatch("test");
    if (instance) expect(instance.props.nickname).toMatch("test");
  });

  it('after load', done => {
    Comment("test", "test");

    setTimeout(() => {
      let instance = Comment.instance();
      expect(typeof instance).toEqual('object');
      if (instance) expect(instance.props.tekst).toMatch("test");
      if (instance) expect(instance.props.nickname).toMatch("test");

      done();
    });
  });
});

describe('Article test', () => {

});
