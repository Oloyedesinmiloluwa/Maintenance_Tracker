import validator from 'validator';

const checkName = (name) => {
  if (name && name.indexOf('-') !== -1) {
    let test = name;
    for (let i = 0; i < test.length; i += 1) {
      test = test.replace('-', '');
    }
    if (!validator.isAlpha(test)) {
      return true;
    }
  } else if (!validator.isAlpha(name)) {
    return true;
  }
};
export default checkName;
