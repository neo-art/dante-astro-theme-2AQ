// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

import { z } from 'zod';

export default config({
    storage: {
        kind: 'local'
    },
    ui: {
        brand: {
            name: '2 Aquarius' // NAME OF YOUR SITE
        }
    },
    collections: {
        blog: collection({
            label: 'Blog',
            slugField: 'title',
            path: 'src/content/blog/*',
            entryLayout: 'content',
            columns: ['title', 'publishDate'],
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                excerpt: fields.text({
                    label: 'Excerpt',
                    multiline: true
                }),
                description: fields.text({
                    label: 'Description',
                    multiline: true
                }),
                publishDate: fields.date({
                    defaultValue: { kind: 'today' },
                    label: 'Date of the publication'
                }),
                updatedDate: fields.date({
                    label: 'Updated date',
                    description: 'Date when the article was updated',
                    validation: {
                        isRequired: false
                    }
                }),
                isFeatured: fields.checkbox({
                    label: 'Is featured?',
                    defaultValue: false
                }),
                tags: fields.array(
                    fields.text({ label: 'Tags' }),
                    // Labelling options
                    {
                        label: 'Tags',
                        itemLabel: (props) => props.value
                    }
                ),
                // tags: fields.multiselect({
                //     label: 'Tags',
                //     options: [
                //         { label: 'Video', value: 'video' },
                //         { label: 'Article', value: 'article' },
                //         { label: 'Recipe', value: 'recipe' }
                //     ],
                //     defaultValue: ['article']
                // }),
                // seoSchema: fields.text({
                //     label: 'seoSchema',
                //     multiline: true,
                //     description: 'seoSchema',
                //     validation: {
                //         isRequired: true,
                //         length: {
                //             min: 5,
                //             max: 120
                //         }
                //     }
                // }),
                seo: fields.array(
                    fields.relationship({
                        label: 'Seo',
                        collection: 'seoSchema',
                        validation: {
                            isRequired: false
                        }
                    })
                ),
                content: fields.markdoc({
                    label: 'Content',
                    extension: 'md'
                    // formatting: true,
                    // dividers: true,
                    // links: true,
                    // images: true,
                })
            }
        }),

        seoSchema: collection({
            label: 'seoSchema',
            slugField: 'title',
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                description: fields.text({
                    label: 'seoSchema Description',
                    multiline: true,
                    validation: {
                        isRequired: true,
                        length: {
                            min: 5,
                            max: 120
                        }
                    }
                }),
                image: fields.image({
                    label: 'Image',
                    directory: 'src/assets/images/pages',
                    publicPath: '../../assets/images/pages/'
                }),
                pageType: fields.select({
                    label: 'Page Type',
                    options: [
                        { label: 'Website', value: 'website' },
                        { label: 'Article', value: 'article' }
                    ],
                    defaultValue: 'website'
                })
            }
        }),

        projects: collection({
            label: 'Projects',
            slugField: 'title',
            path: 'src/content/projects/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Projects headline' }),
                description: fields.text({
                    label: 'Description',
                    multiline: true
                }),
                publishDate: fields.date({
                    defaultValue: { kind: 'today' },
                    label: 'Date of the publication'
                }),
                isFeatured: fields.checkbox({
                    label: 'Is featured?',
                    defaultValue: false
                }),
                content: fields.markdoc({
                    label: 'Content',
                    extension: 'md'
                    // formatting: true,
                    // dividers: true,
                    // links: true,
                    // images: true,
                }),
                seo: fields.relationship({
                    label: 'SEO',
                    collection: 'seoSchema'
                })
            }
        }),

        pages: collection({
            label: 'Pages',
            slugField: 'title',
            path: 'src/content/pages/*',
            entryLayout: 'content',
            columns: ['title', 'description'],
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'SEO Title' } }),
                description: fields.text({
                    label: 'SEO Description',
                    multiline: true
                }),
                seo: fields.relationship({
                    label: 'SEO',
                    collection: 'seoSchema',
                    validation: {
                        isRequired: false
                    }
                }),
                ogImage: fields.image({
                    label: 'Image',
                    directory: 'src/assets/images/pages',
                    publicPath: '../../assets/images/pages/'
                }),
                // noIndex: fields.checkbox({
                //   label: "Don't index the page",
                //   defaultValue: false,
                // }),
                content: fields.markdoc({
                    label: 'Content',
                    extension: 'md',
                    options: {
                        image: {
                            directory: 'src/assets/images/pages',
                            publicPath: '../../assets/images/pages/'
                        }
                    }
                })
            }
        })
    }
});
