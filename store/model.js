import { useEffect, useState } from 'react';
import produce from 'immer';

class Model {
  constructor({ initialState, actions }) {
    this.queue = [];
    this.state = initialState;
    this.actions = {};
    Object.keys(actions).forEach((name) => {
      this.actions[name] = (...args) => {
        const changedState = actions[name].apply(this, args);
        const nextState = produce(this.state, (draftState) => {
          Object.keys(changedState).forEach((changedStateKey) => {
            draftState[changedStateKey] = changedState[changedStateKey];
          });
        });
        this.state = nextState;
        this.onDataChange();
      };
    });
  }

  useModel() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [, setState] = useState();
    // 使用useEffect实现发布订阅
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const index = this.queue.length;
      this.queue.push(setState); // 订阅
      return () => { // 组件销毁时取消
        this.queue.splice(index, 1);
      };
    });
    return [this.state, this.actions];
  }

  onDataChange() {
    const queues = [...this.queue];
    this.queue.length = 0;
    queues.forEach((setState) => {
      setState(this.state); // 通知所有的组件数据变化
    });
  }
}

export default Model;
