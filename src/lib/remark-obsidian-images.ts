import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Text, Paragraph, Image } from 'mdast';

/**
 * Remark plugin to transform Obsidian wiki-link images to standard markdown images.
 * Converts: ![[image.png]] -> ![image.png](/content/posts/image.png)
 * Also handles: ![[image.png|alt text]] -> ![alt text](/content/posts/image.png)
 */
export const remarkObsidianImages: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (!parent || typeof index !== 'number') return;

      const newChildren: (typeof node.children[number] | Image)[] = [];
      let hasChanges = false;

      for (const child of node.children) {
        if (child.type === 'text') {
          const text = (child as Text).value;
          // Match Obsidian image embeds: ![[filename.ext]] or ![[filename.ext|alt]]
          const regex = /!\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]/g;
          
          let lastIndex = 0;
          let match;

          while ((match = regex.exec(text)) !== null) {
            hasChanges = true;
            
            // Add any text before the match
            if (match.index > lastIndex) {
              newChildren.push({
                type: 'text',
                value: text.slice(lastIndex, match.index),
              } as Text);
            }

            const filename = match[1].trim();
            const altText = match[2]?.trim() || filename;

            // Create a standard markdown image node
            // Images will be served from /images/posts/ in the public folder
            const imagePath = `/images/posts/${encodeURIComponent(filename)}`;

            newChildren.push({
              type: 'image',
              url: imagePath,
              alt: altText,
              title: altText,
            } as Image);

            lastIndex = match.index + match[0].length;
          }

          // Add any remaining text after the last match
          if (lastIndex < text.length) {
            newChildren.push({
              type: 'text',
              value: text.slice(lastIndex),
            } as Text);
          }

          // If no matches, keep the original text node
          if (lastIndex === 0) {
            newChildren.push(child);
          }
        } else {
          newChildren.push(child);
        }
      }

      if (hasChanges) {
        node.children = newChildren as typeof node.children;
      }
    });
  };
};
