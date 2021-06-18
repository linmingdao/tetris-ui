import isEmpty from 'validator/es/lib/isEmpty';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

// 书写 validator 的注意点： callback 必须被调用

export const MESSAGE = {
  REQUIRED: '该字段不可放空哟~~',
  EMAIL_ERR_FORMAT: '邮箱的格式不正确哟~~',
  MOBILE_PHONE_ERR_FORMAT: '手机号码的格式不正确哟~~',
};

export const rules: {
  [key: string]: any;
  [index: number]: any;
} = {
  Required: { required: true, message: MESSAGE.REQUIRED },
  Email: {
    validator: (rule: any, value: any, callback: any, source?: any, options?: any) => {
      if (!isEmpty(value)) {
        isEmail(value) ? callback() : callback(MESSAGE.EMAIL_ERR_FORMAT);
      } else {
        callback();
      }
    },
  },
  MobilePhone: {
    validator: (rule: any, value: any, callback: any, source?: any, options?: any) => {
      if (!isEmpty(value)) {
        isMobilePhone(value, 'zh-CN') ? callback() : callback(MESSAGE.MOBILE_PHONE_ERR_FORMAT);
      } else {
        callback();
      }
    },
  },
};

export const allRules = Object.keys(rules);
