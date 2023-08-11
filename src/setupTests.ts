/* eslint-disable import/no-extraneous-dependencies */ import Enzyme from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import * as util from "util";
Enzyme.configure({ adapter: new ReactSixteenAdapter() });
// ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// ref: https://github.com/jsdom/jsdom/issues/2524
Object.defineProperty(window, "TextEncoder", {
  writable: true,
  value: util.TextEncoder,
});
Object.defineProperty(window, "TextDecoder", {
  writable: true,
  value: util.TextDecoder,
});
