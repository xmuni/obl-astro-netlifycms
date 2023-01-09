import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";

// Remark plugins
import remarkExternalLinks from 'remark-external-links';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';

const imageConfig = {
  serviceEntryPoint: '@astrojs/image/sharp'
};

// https://astro.build/config

// https://astro.build/config
export default defineConfig({

  // https://vitejs.dev/config/build-options.html#build-rollupoptions
  vite: {
    build: {
      rollupOptions: {
        external: ['src/styles/blog.css?used&raw'],
      }
    }
  },

  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkExternalLinks,
      remarkGfm,
    ],
    // rehypePlugins: [

    // ],
  },

  integrations: [NetlifyCMS({
    config: {
      // Use Netlify’s “Git Gateway” authentication and target our default branch
      backend: {
        name: 'git-gateway',
        branch: 'latest'
      },
      // Configure where our media assets are stored & served from
      media_folder: 'public',
      public_folder: '/',
      // Configure the content collections
      // https://www.netlifycms.org/docs/collection-types/
      collections: [
      // (repeatable) Homepage sections
      {
        name: 'homepage',
        label: 'Sezioni homepage',
        label_singular: 'Sezione homepage',
        folder: 'src/content/homepage',
        slug: '{{title}}',
        create: true,
        delete: true,
        // https://www.netlifycms.org/docs/widgets/
        fields: [
        // { name: 'ordine', label: 'Ordine (1, 2, 3...)', widget: 'number', default: 1, min: 1, },
        {
          name: 'title',
          widget: 'string',
          label: 'Nome sezione'
        },
        // { name: 'title', widget: 'string', label: 'Titolo', required: false, },
        {
          name: 'image',
          widget: 'image',
          label: 'Immagine'
        }, {
          name: 'body',
          widget: 'markdown',
          label: 'Testo',
          modes: ['raw']
        }]
      },
      // (single) Pages
      {
        label: 'Pagine',
        name: 'pages',
        files: [
        // Home
        /*
        {
          label: 'Home',
          name: 'home',
          file: 'src/content/home.md',
          fields: [
            { name: 'header', widget: 'string', label: 'Header', required: false },
            { name: 'body', widget: 'markdown', label: 'Post Body', modes: ['raw'] },
          ],
        },
        */
        // Info
        {
          label: 'Info',
          name: 'info',
          file: 'src/content/info.md',
          fields: [{
            name: 'title',
            widget: 'string',
            label: 'Titolo',
            required: false
          }, {
            name: 'body',
            widget: 'markdown',
            label: 'Post Body',
            modes: ['raw']
          }]
        }]
      },
      // (repeatable) Blog posts
      {
        name: 'opuscoli',
        label: 'Opuscoli',
        label_singular: 'Opuscolo',
        folder: 'src/content/opuscoli',
        create: true,
        delete: true,
        slug: '{{url}}',
        extension: 'mdx',
        fields: [{
          name: 'url',
          widget: 'string',
          label: 'URL (per esempio: piante-aromatiche-in-italia)'
        }, {
          name: 'title',
          widget: 'string',
          label: 'Titolo'
        }, {
          name: 'publishDate',
          widget: 'datetime',
          format: 'DD MMM YYYY',
          date_format: 'DD MMM YYYY',
          time_format: false,
          label: 'Data di pubblicazione opuscolo'
        },
        // { name: 'author', widget: 'string', label: 'Author Name', required: false },
        // { name: 'authorURL', widget: 'string', label: 'Author URL', required: false },
        {
          name: 'description',
          widget: 'string',
          label: 'Descrizione breve',
          required: false
        }, {
          name: 'body',
          widget: 'markdown',
          label: 'Testo dell opuscolo',
          modes: ['raw']
        }
        // {
        //   name: 'layout',
        //   widget: 'select',
        //   default: '../../layouts/BlogPost.astro',
        //   options: [
        //     { label: 'Blog Post', value: '../../layouts/BlogPost.astro' },
        //   ],
        // },
        ]
      }]
    },

    previewStyles: ['src/styles/blog.css']
  }),
  image(imageConfig),
  mdx(),
]
});