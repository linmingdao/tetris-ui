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
    id: 'u_U3k61YRe6DgIn8crEXu',
    name: 'SortableContainer',
    props: { name: 'DN2_HQfYb07RCQ-pkL3Ny', label: '用户基本信息' },
    children: [
      {
        id: 'YOUFn-1nwKtkcmXQkiJKL',
        name: 'RadioGroup',
        props: { name: 'RljvVR696HpvgnX-pwj7_', label: '性别', value: '', rules: ['Required'], options: '选项1,option1;选项2,option2;选项3,option3' },
      },
      {
        id: 'iKkVizs3yFGRYslPYxtPj',
        name: 'CheckboxGroup',
        props: {
          name: 'kFNDZBdBTXdgi8fJvo7u8',
          label: '兴趣爱好',
          value: [],
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
        props: { name: 'SKBLYepVwOgwosuXTGZ49', label: '自我介绍', rules: [], rows: 5, placeholder: '请输入自我介绍' },
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
