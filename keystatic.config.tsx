// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

const seoSchema = {
    label: 'seoSchema',
    slugField: 'title',
    path: 'src/content/seoSchema/*',
    schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
            label: 'seoSchema Description',
            multiline: true,
            validation: {
                isRequired: false,
                length: {
                    min: 5,
                    max: 120
                }
            },
            defaultValue: ''
        }),
        image: fields.image({
            label: 'Image',
            directory: 'src/assets/images/pages',
            publicPath: '../../assets/images/pages/'
        }),
        alt: fields.text({
            label: 'Alt',
            validation: {
                isRequired: false
            },
            defaultValue: ''
        }),
        pageType: fields.select({
            label: 'Page Type',
            description: 'Type of this page',
            options: [
                { label: 'Website', value: 'website' },
                { label: 'Article', value: 'article' }
            ],
            defaultValue: 'website'
        })
    }
};

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
        blog: {
            label: 'Blog',
            slugField: 'title',
            path: 'src/content/blog/*',
            entryLayout: 'content',
            columns: ['title', 'publishDate'],
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Title', defaultValue: '' }),
                excerpt: fields.text({
                    label: 'Excerpt',
                    multiline: true
                }),
                description: fields.text({
                    label: 'Description',
                    multiline: true
                }),
                publishDate: fields.date({ label: 'Publish Date', defaultValue: '' }),
                updatedDate: fields.date({
                    label: 'Updated date',
                    description: 'Date when the article was updated',
                    validation: {
                        isRequired: false
                    }
                }),
                isFeatured: fields.checkbox({ label: 'Is Featured?', defaultValue: false }),
                tags: fields.array(
                    fields.text({ label: 'Tags' }),
                    // Labelling options
                    {
                        label: 'Tags',
                        itemLabel: (props) => props.value
                    }
                ),
                content: fields.markdoc({
                    label: 'Content',
                    extension: 'md'
                    // formatting: true,
                    // dividers: true,
                    // links: true,
                    // images: true,
                }),
                seo: fields.relationship({ label: 'SEO', collection: 'seoSchema' })
            }
        },
        pages: {
            label: 'Pages',
            slugField: 'title',
            path: 'src/content/pages/*',
            entryLayout: 'content',
            columns: ['title', 'description'],
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Title', defaultValue: '' }),
                description: fields.text({
                    label: 'SEO Description',
                    multiline: true
                }),
                ogImage: fields.image({
                    label: 'Image',
                    directory: 'src/assets/images/pages',
                    publicPath: '../../assets/images/pages/'
                }),
                content: fields.markdoc({
                    label: 'Content',
                    extension: 'md',
                    options: {
                        image: {
                            directory: 'src/assets/images/pages',
                            publicPath: '../../assets/images/pages/'
                        }
                    }
                }),
                seo: fields.relationship({ label: 'SEO', collection: 'seoSchema' })
            }
        },
        projects: {
            label: 'Projects',
            slugField: 'title',
            path: 'src/content/projects/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Title', defaultValue: '' }),
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
                seo: fields.relationship({ label: 'SEO', collection: 'seoSchema' })
            }
        }
    }
});
