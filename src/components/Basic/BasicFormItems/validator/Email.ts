import isEmpty from 'validator/es/lib/isEmpty';
import isEmail from 'validator/es/lib/isEmail';

export const Email = {
  validator: (rule: any, value: any, callback: any, source?: any, options?: any) => {
    if (!isEmpty(value)) {
      isEmail(value) ? callback() : callback('邮箱的格式不正确哟~~');
    } else {
      callback();
    }
  },
};
