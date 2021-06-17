import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Yoga: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          Meditation: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          Food: {
            screens: {
              TabThreeScreen: 'three',
            },
          },
          Profile: {
            screens: {
              TabFourScreen: 'four',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
