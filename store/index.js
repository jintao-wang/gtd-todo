import Model from './model';

export const signedStore = new Model({
  initialState: {
    isSigned: false,
  },
  actions: {
    onChange(bool) {
      return { isSigned: bool };
    },
  },
});

export const emailStore = new Model({
  initialState: {
    email: null,
  },
  actions: {
    setEmail(email) {
      return { email };
    },
  },
});
