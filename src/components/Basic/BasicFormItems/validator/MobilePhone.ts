import isEmpty from 'validator/es/lib/isEmpty';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

export const MobilePhone = {
  validator: (rule: any, value: any, callback: any, source?: any, options?: any) => {
    if (!isEmpty(value)) {
      isMobilePhone(value, 'zh-CN') ? callback() : callback('手机号码的格式不正确哟~~');
    } else {
      callback();
    }
  },
};
