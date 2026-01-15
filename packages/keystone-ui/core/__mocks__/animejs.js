const animeMock = function (options) {
  if (options && typeof options.begin === 'function') {
    options.begin();
  }

  if (options && typeof options.complete === 'function') {
    if (options.complete.constructor.name === 'AsyncFunction') {
      Promise.resolve().then(() => {
        if (options && typeof options.complete === 'function') {
          options.complete();
        }
      });
    }

    options.complete();
  }

  return this;
};

animeMock.timeline = animeMock;
animeMock.add = () => animeMock;

module.exports = animeMock;
