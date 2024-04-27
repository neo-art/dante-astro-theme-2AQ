// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      entryLayout: "content",
			columns: ["title", "datePublished"],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
				description: fields.text({
					label: "Description",
					multiline: true,
				}),
				datePublished: fields.datetime({
					defaultValue: { kind: "now" },
					label: "Date of the publication",
				}),
        tags: fields.multiselect({
					label: "Tags",
					options: [{ label: "Tag", value: "Tag" }],
				}),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});

pages: collection({
  label: "Pages",
  slugField: "title",
  path: "src/content/pages/*",
  entryLayout: "content",
  columns: ["title", "description", "noIndex"],
  format: { contentField: "content" },
  schema: {
    title: fields.slug({ name: { label: "SEO Title" } }),
    description: fields.text({
      label: "SEO Description",
      multiline: true,
    }),
    ogImage: fields.image({
      label: "Image",
      directory: "src/assets/images/pages",
      publicPath: "../../assets/images/pages/",
    }),
    noIndex: fields.checkbox({
      label: "Don't index the page",
      defaultValue: false,
    }),
    // content: fields.mdx({
    //   label: "Content",
    //   options: {
    //     image: {
    //       directory: "src/assets/images/pages",
    //       publicPath: "../../assets/images/pages/",
    //     },
    //   },
    // }),
  },
})