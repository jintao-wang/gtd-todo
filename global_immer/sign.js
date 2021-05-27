import produce from 'immer';

export const baseStateRef = {
  baseState: {
    isSigned: false,
  },
};

const signImmer = {
  state: baseStateRef.baseState,
  onUpdate: (isSigned) => {
    produce(baseStateRef.baseState, (draftState) => {
      draftState.isSigned = isSigned;
    });
  },
};

export default signImmer;
