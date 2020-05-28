import { MdInfo } from 'react-icons/md'

export default {
  name: 'companyInfo',
  title: 'Organization Info',
  type: 'document',
  // You probably want to uncomment the next line once you've made a companyInfo document in the Studio. This will remove the companyInfo document type from the create-menus.
  __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  icon: MdInfo,
  fields: [
    {
      name: 'name',
      title: 'Organization name',
      type: 'string'
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email'
    },
    {
      name: 'github',
      title: 'GitHub',
      type: 'url'
    },
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    },
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'url',
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
    },
    {
      name: 'address1',
      title: 'Address 1',
      type: 'string'
    },
    {
      name: 'address2',
      title: 'Address 2',
      type: 'string'
    },
    {
      name: 'zipCode',
      title: 'ZIP Code',
      type: 'string'
    },
    {
      name: 'city',
      title: 'City',
      type: 'string'
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string'
    }
  ]
}
