import { MdChromeReaderMode } from "react-icons/md";

export default {
  name: "preview",
  title: "Preview",
  type: "object",
  icon: MdChromeReaderMode,
  liveEdit: false,
  fields: [
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "header",
      title: "Header",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "blockText",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: 'link',
      title: 'Internal link',
      type: 'object',
      fieldsets: [
        {name: 'link', title: 'Link'}
      ],
      fields: [
        {
          title: 'Internal link',
          name: 'internalLink',
          description: 'Use this to link between pages on the website',
          type: 'internalLink',
          fieldset: 'link'
        },
        {
          title: 'External link',
          name: 'externalLink',
          type: 'url',
          fieldset: 'link'
        },
      ],
      validation: Rule =>
        Rule.custom(
          (fields = {}) =>
            [!!fields.route, !!fields.link, !!fields.anchorLink].filter(link => link).length <= 1 ||
            'Only one link type is allowed'
        ),
    },
  ]
};
