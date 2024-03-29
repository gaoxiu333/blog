import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

export default function rehypeToc(options: any) {
  const settings = options || { TOC: [] };

  return function (tree: any) {
    visit(tree, "element", function (node) {
      if (headingRank(node) && node.properties.id) {
        console.log("node", node, toString(node as any));
        const id = node.properties.id;
        const text = toString(node);
        const depth = parseInt(node.tagName.slice(1));
        settings.TOC.push({ id, text, depth });
      }
    });
  };
}
