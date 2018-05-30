import validator from 'validator';

const queryValidator = (value) => {
  value = value.toLowerCase();
  value = validator.trim(value);
  return value;
};
export default queryValidator;
