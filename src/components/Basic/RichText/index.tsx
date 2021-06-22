import RichText from './RichText';
export * from './types';
export default RichText;

export const richTextRequired = function (requiredMsg = '该内容必填') {
  return (_: unknown, value: string) => {
    if (!value || value === '<p></p>') {
      return Promise.reject(new Error(requiredMsg));
    }
    return Promise.resolve();
  };
};
