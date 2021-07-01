export const stageItems = [
  {
    id: 'ihIBUeDUcj6kT29lkL-0i',
    name: 'TextInput',
    props: { name: 'nlihcMLGWT0ehoGt5A_lO', label: '用户名', value: '小明', rules: ['Required'], placeholder: '请输入用户名' },
  },
  {
    id: 'fOJJimdyZyOu6vxx9P_8u',
    name: 'TextInput',
    props: { name: 'ey46oNK1L7X3S4osyLo5x', label: '密码', value: '', rules: ['Required'], placeholder: '请输入密码' },
  },
  {
    id: 'fOJJimdyZyOer0234u',
    name: 'NumInput',
    props: { name: 'ey46oNKwiuw3dva', label: '年龄', value: 20, rules: ['Required'], placeholder: '请输入年龄' },
  },
  {
    id: '1AKBqOE37xdLZ1o4yohMG',
    name: 'Notes',
    props: {
      name: '_jE-KBOl8DvA56yYeqjwE',
      label: '标题',
      value:
        "<div>1、注释内容1</div><div>2、注释内容2，<a href='https://www.baidu.com' target='_blank'>百度</a></div><div>3、注释内容3</div><div>4、注释内容4</div><div style='color:#f5222d;'>注：直接支持 html 哟</div>",
      notesHtml:
        "<div>1、注释内容1</div><div>2、注释内容2，<a href='https://www.baidu.com' target='_blank'>百度</a></div><div>3、注释内容3</div><div>4、注释内容4</div><div style='color:#f5222d;'>注：直接支持 html 哟</div>",
      mode: 'stage',
    },
  },
  {
    id: 'lBtgvSDUR-jUiQUOsEBuu',
    name: 'Selector',
    props: {
      name: 'xBwf1sKiJuXZUvMn-y4by',
      label: '国籍',
      placeholder: '请选择',
      rules: [],
      value: 'option1',
      options: '选项1,option1;选项2,option2;选项3,option3',
    },
  },
  {
    id: '0gwQeNuHN6-AXhmEBba6N',
    name: 'Selector',
    props: {
      name: 'GtEv4v3PdBk7BlzTFY-sW',
      label: '下拉框label',
      placeholder: '请选择',
      rules: [],
      options: '选项1,option1;选项2,option2;选项3,option3',
    },
  },
  {
    id: 'u_U3k61YRe6DgIn8crEXu',
    name: 'SortableContainer',
    props: { name: 'DN2_HQfYb07RCQ-pkL3Ny', label: '用户基本信息' },
    children: [
      {
        id: 'YOUFn-1nwKtkcmXQkiJKL',
        name: 'RadioGroup',
        props: {
          name: 'RljvVR696HpvgnX-pwj7_',
          label: '性别',
          value: 'option3',
          rules: ['Required'],
          options: '选项1,option1;选项2,option2;选项3,option3',
        },
      },
      {
        id: 'iKkVizs3yFGRYslPYxtPj',
        name: 'CheckboxGroup',
        props: {
          name: 'kFNDZBdBTXdgi8fJvo7u8',
          label: '兴趣爱好',
          value: ['option1', 'option2'],
          rules: ['Required'],
          options: '选项1,option1;选项2,option2;选项3,option3',
        },
      },
      {
        id: 'kS_xOVSTd5T6VOv5g3NkY',
        name: 'DateTimeSelect',
        props: { name: 'G7UaBtH6Y8BHHmAalCBnR', label: '出生日期', value: '2021-06-18T06:34:31.498Z', placeholder: '请选择' },
      },
      {
        id: 'UFpgR0x_6cEVQVM9aBLmr',
        name: 'TextArea',
        props: {
          name: 'SKBLYepVwOgwosuXTGZ49',
          label: '自我介绍',
          value:
            '自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍',
          rules: [],
          rows: 5,
          placeholder: '请输入自我介绍',
        },
      },
      {
        id: 'Bg2g_DGkHaw3GfkXplx4k',
        name: 'SortableContainer',
        props: { name: 'sCXkT69jKvzPJo-4eShoW', label: '家庭情况' },
        children: [
          {
            id: 'KvWymdz3-IZvGG7p9Djj_',
            name: 'TextInput',
            props: { name: 'Hp-sla--eXptRXbyzvjjD', label: '父亲', value: '', rules: ['Required'], placeholder: '请输入' },
          },
          {
            id: 'VwnHGJpG7k5LyH5FfWdHg',
            name: 'TextInput',
            props: { name: '8ZY3y4xptdu9pqUCdOpEr', label: '母亲', value: '', rules: ['Required'], placeholder: '请输入' },
          },
        ],
      },
    ],
  },
];
