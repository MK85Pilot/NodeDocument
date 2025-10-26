import type { Config } from '@markdoc/markdoc';
import { Callout } from '@/components/markdoc/Callout';
import { CodeBlock } from '@/components/markdoc/CodeBlock';

const config: Config = {
  nodes: {
    fence: {
      render: 'CodeBlock',
      attributes: {
        language: {
          type: String
        }
      }
    },
  },
  tags: {
    callout: {
      render: 'Callout',
      attributes: {
        type: {
          type: String,
          default: 'info',
          matches: ['info', 'warning', 'success', 'destructive'],
        },
        title: {
          type: String,
        },
      },
    },
  },
};

export const components = {
  Callout,
  CodeBlock,
};

export default config;
