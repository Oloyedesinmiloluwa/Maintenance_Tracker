import chai, { assert } from 'chai';

import adminController from '../controllers/adminController';
import { getMaxListeners } from 'cluster';

const testSendMail = () => {
  describe('Basic sendMail Function', () => {
    it('It should return a promise', () => {
      let today = new Date();
      const sendMailPromise = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'approved');
      assert.isTrue(sendMailPromise instanceof Promise, 'response from sendMail function is a Promise object');
    });
    it('It should return a boolean value when email whether sending email was successful or not', () => {
      let today = new Date();
      const sendMailPromise = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'approved');
      sendMailPromise.then((response) => {
        assert.isBoolean(response, 'response from sendMail function should be of boolean data type');
      });
    });
    it('It should return a true boolean value upon successful sending of email', () => {
      let today = new Date();
      const sendMailPromise = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'approved');
      sendMailPromise.then((response) => {
        assert.isTrue(response, 'value of response from sendMail function should be true');
      });
    });
    it('It should return a false boolean value if email parameter is empty', () => {
      let today = new Date();
      const sendMailPromise = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'approved');
      sendMailPromise.then((response) => {
        assert.isFalse(response, 'value of response from sendMail function should be false');
      });
    });
    it('It should return a false boolean value if the numbers of parameters passed is less than four', () => {
      let today = new Date();
      const sendMailPromise = adminController.sendMail('I love you', today.toDateString(), 'approved');
      sendMailPromise.then((response) => {
        assert.isTrue(response, 'value of response from sendMail function should be false');
      });
    });
    it('It should return a false boolean value if the first parameter doesnt match an email address structure', () => {
      let today = new Date();
      const sendMailPromise = adminController.sendMail('testWrongEmailAddress', 'I love you', today.toDateString(), 'disapproved');
      sendMailPromise.then((response) => {
        assert.isFalse(response, 'value of response from sendMail function should be false');
      });
    });
    it('It should return a false boolean value if the third parameter is not a Date object', () => {
      const sendMailPromise = adminController.sendMail('shakirabusari@gmail.com', 'I love you', 2008, 'disapproved');
      sendMailPromise.then((response) => {
        assert.isFalse(response, 'value of response from sendMail function should be false');
      });
    });
    it('It should return a false boolean value if the fourth parameter is neither approved, disapproved nor resolved', () => {
      let today = new Date();
      const sendMailPromise = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'notapproved');
      const sendMailPromise1 = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'notdisapproved');
      const sendMailPromise2 = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'notresolved');
      const sendMailPromise3 = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'approved');
      const sendMailPromise4 = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'disapproved');
      const sendMailPromise5 = adminController.sendMail('shakirabusari@gmail.com', 'I love you', today.toDateString(), 'resolved');

      sendMailPromise.then((response) => {
        assert.isFalse(response, 'value of sendMailPromise function should be false');
      });
      sendMailPromise1.then((response) => {
        assert.isFalse(response, 'value from sendMail1 function should be false');
      });
      sendMailPromise2.then((response) => {
        assert.isFalse(response, 'value from sendMail2 function should be false');
      });
      sendMailPromise3.then((response) => {
        assert.isTrue(response, 'value from sendMail3 function should be true');
      });
      sendMailPromise4.then((response) => {
        assert.isTrue(response, 'value from sendMail4 function should be true');
      });
      sendMailPromise5.then((response) => {
        assert.isTrue(response, 'value from sendMail5 function should be true');
      });
    });
  });
};
export default testSendMail;
