import 'react-native-gesture-handler/jestSetup';

global.__ExpoImportMetaRegistry = {};
global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

jest.mock('expo/src/winter/runtime.native.ts', () => ({}), { virtual: true });
jest.mock('expo/src/winter/installGlobal.ts', () => ({}), { virtual: true });

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useNavigation: () => ({
    setOptions: jest.fn(),
    navigate: jest.fn(),
  }),
  Stack: {
    Screen: () => null,
  },
}));

jest.mock('expo-linking', () => ({
  createURL: jest.fn(),
}));
