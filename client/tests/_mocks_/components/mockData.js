import sinon from 'sinon';

export const user = {
  detail: {
    firstname: 'john',
    lastname: 'grace',
    role: 'user'
  }
};
export const event = {
  preventDefault: () => {},
  target: {
    name: 'body',
    value: 'come',
    matches: () => true,
  },
};
export const spyResolve = sinon.spy(() => Promise.resolve({ success: true }));
export const requests = [{
  id: 1, title: 'fault', description: 'it is bad', dated: '20180723'
}, { id: 2, title: 'faulty stuff', description: 'it is bad reallya' }];
