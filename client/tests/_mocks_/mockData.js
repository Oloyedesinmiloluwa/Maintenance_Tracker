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
    textContent: 'nothing',
    valueAsDate: {
      toDateString: () => 'October 12, 2010',
    },
    files: ['.png', 'jpeg'],
    matches: () => true,
  },
};
export const spyResolve = sinon.spy(() => Promise.resolve({ success: true }));
export const spyImageFailed = sinon.spy(() => Promise.resolve({ message: 'Image failed to upload' }));
export const spyAuthFailed = sinon.spy(() => Promise.resolve({ message: 'Authentication failed' }));
export const spyRequestAdded = sinon.spy(() => Promise.resolve({ message: 'Request Added Successfully' }));
export const requests = [{
  id: 1, title: 'fault', description: 'it is bad', dated: '20180723', status: 'approved'
}, { id: 2, title: 'faulty stuff', description: 'it is bad reallya', status: 'resolved' }];
