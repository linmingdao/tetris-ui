export const stageItems = [
  {
    id: 'ihIBUeDUcj6kT29lkL-0i',
    name: 'TextInput',
    props: { name: 'nlihcMLGWT0ehoGt5A_lO', label: '用户名', value: '小明', rules: ['Required'], placeholder: '请输入用户名', mode: 'stage' },
  },
  {
    id: 'fOJJimdyZyOu6vxx9P_8u',
    name: 'TextInput',
    props: { name: 'ey46oNK1L7X3S4osyLo5x', label: '密码', value: '', rules: ['Required'], placeholder: '请输入密码', mode: 'stage' },
  },
  {
    id: 'fOJJimdyZyOer0234u',
    name: 'NumInput',
    props: { name: 'ey46oNKwiuw3dva', label: '年龄', value: 20, rules: ['Required'], placeholder: '请输入年龄', mode: 'stage' },
  },
  {
    id: 'czHJ1CbMzd_rKDpZ3jrQN',
    name: 'Selector',
    props: {
      name: 'Qe8dD5hV77ylwVfhHZbFM',
      label: '国籍',
      placeholder: '请选择国籍',
      rules: [],
      value: 'China',
      optionList: [
        { label: '中国', value: 'China' },
        { label: '美国', value: 'America' },
        { label: '日本', value: 'Japan' },
      ],
    },
  },
  {
    id: 'pBkkTdA4G08Ksy-s05G5N',
    name: 'Notes',
    props: {
      name: '-3bU0j1oKFzpie3hpvicj',
      label: '个人简历',
      notesHtml:
        '<p>1、注释内容1</p><p>2、注释内容2，<a href="https://www.baidu.com" target="_blank">百度</a></p><p>3、注释内容3</p><p>4、注释内容4</p><p>5、哈哈哈哈哈哈</p>',
    },
  },
  {
    id: 'u_U3k61YRe6DgIn8crEXu',
    name: 'SortableContainer',
    props: { name: 'DN2_HQfYb07RCQ-pkL3Ny', label: '用户基本信息' },
    children: [
      {
        id: 's0OLJD9YMjY6_cdT7O1Oa',
        name: 'RadioGroup',
        props: {
          name: 'qj6Mu1oWAtGMCHv_BW4tp',
          label: '性别',
          value: 'man',
          optionList: [
            { label: '男', value: 'man' },
            { label: '女', value: 'female' },
          ],
        },
      },
      {
        id: '3mtF1wZLYeWe22yw9QhMz',
        name: 'CheckboxGroup',
        props: {
          name: 'USnkCRkYgRRLQttKjUhTs',
          label: '爱好',
          value: [],
          optionList: [
            { label: '篮球', value: 'basketball' },
            { label: '足球', value: 'football' },
            { label: '乒乓球', value: 'pingpong' },
          ],
        },
      },
      {
        id: 'KZbh8FxTdPf1Es7ZnQS1r',
        name: 'DateTimeSelect',
        props: { name: '0ZGR7aMYzalYg0gEcZEZe', label: '出生日期', placeholder: '请选择日期', value: null },
      },
      {
        id: 'zl6--2L8XJkBIhwd-PZqm',
        name: 'DateRangeSelect',
        props: { name: '9pZG3yJy4B5-CyBElslkl', label: '大学期间', startPlaceholder: '开始日期', endPlaceholder: '结束日期', value: null },
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
          mode: 'stage',
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
            props: { name: 'Hp-sla--eXptRXbyzvjjD', label: '父亲', value: '', rules: ['Required'], placeholder: '请输入', mode: 'stage' },
          },
          {
            id: 'VwnHGJpG7k5LyH5FfWdHg',
            name: 'TextInput',
            props: { name: '8ZY3y4xptdu9pqUCdOpEr', label: '母亲', value: '', rules: ['Required'], placeholder: '请输入', mode: 'stage' },
          },
        ],
      },
    ],
  },
];
