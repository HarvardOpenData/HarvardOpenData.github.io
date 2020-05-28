export default {
  name: 'reactComponent',
  title: 'React Component',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Component Name',
      type: 'string',
      options: {
        list: [
          { title: 'Wheel of Fortune', value: 'wheelOfFortune' },
          { title: 'Failing option', value: 'failed' },
        ]
      }
    },
  ],
  liveEdit: true
}