const makeName = (name, to) => {
  const chatBoxName = [name, to].sort().join('_');
  return chatBoxName;
}

const Subscription = {
  message: {
    subscribe: (parent, { from, to }, { pubsub }) => {
      const chatBoxName = makeName(from, to);
      return pubsub.subscribe(`chatBox ${chatBoxName}`);
    },
  },
};

export { Subscription as default };
