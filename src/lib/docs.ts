import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), 'docs');

export interface Doc {
  slug: string[];
  content: string;
  data: {
    title: string;
    order: number;
    description?: string;
  };
}

export interface NavItem {
  title: string;
  slug: string;
  order: number;
}

export interface NavCategory {
  title: string;
  order: number;
  items: NavItem[];
}

export function getNavigation(): NavCategory[] {
  const categories: { [key: string]: NavCategory } = {};

  const traverse = (dir: string, relativePath: string[] = []) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        traverse(fullPath, [...relativePath, file.name]);
      } else if (file.name.endsWith('.md')) {
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContent);

        if (data.title && typeof data.order === 'number') {
          const categoryTitle = relativePath.length > 0
            ? (relativePath[0].split('-').slice(1).join(' '))
            : 'General';
          
          const categoryKey = relativePath.length > 0 ? relativePath[0] : 'general';
          const categoryOrder = relativePath.length > 0 ? parseInt(relativePath[0].split('-')[0], 10) : 99;


          if (!categories[categoryKey]) {
            categories[categoryKey] = {
              title: categoryTitle,
              order: categoryOrder,
              items: [],
            };
          }

          categories[categoryKey].items.push({
            title: data.title,
            slug: [...relativePath, file.name.replace('.md', '')].join('/'),
            order: data.order,
          });
        }
      }
    });
  };

  traverse(docsDirectory);

  const sortedCategories = Object.values(categories)
    .sort((a, b) => a.order - b.order)
    .map(category => {
      category.items.sort((a, b) => a.order - b.order);
      return category;
    });

  return sortedCategories;
}

export function getDocBySlug(slug: string[]): Doc | null {
  const fullPath = path.join(docsDirectory, ...slug) + '.md';

  try {
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      content,
      data: {
        title: data.title || '无标题',
        order: data.order || 0,
        description: data.description || '',
      },
    };
  } catch (error) {
    console.error(`Error reading doc by slug ${slug.join('/')}:`, error);
    return null;
  }
}

export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = [];
  const traverse = (dir: string, relativePath: string[] = []) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    files.forEach(file => {
      const currentPath = [...relativePath, file.name];
      if (file.isDirectory()) {
        traverse(path.join(dir, file.name), currentPath);
      } else if (file.name.endsWith('.md')) {
        slugs.push(currentPath.map((p, i) => i === currentPath.length - 1 ? p.replace('.md', '') : p));
      }
    });
  };
  traverse(docsDirectory);
  return slugs;
}

export function getFirstDocSlug(): string {
  const navigation = getNavigation();
  if (navigation.length > 0 && navigation[0].items.length > 0) {
    return navigation[0].items[0].slug;
  }
  return '';
}
