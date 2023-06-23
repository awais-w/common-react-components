import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { spy } from 'sinon';

configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: spy(),
  setItem: spy(),
  clear: spy(),
};

global.localStorage = localStorageMock;
