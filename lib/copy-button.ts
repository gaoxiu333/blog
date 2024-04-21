// @ts-nocheck
export function addCopyButton(options: any = {}) {
  const toggleMs = options.toggle || 3000;
  const self: any = this 
  return {
    name: "shiki-transformer-copy-button",
    pre(node: any) {
      const button = h(
        "button",
        {
          class: "copy",
          "data-code": self.source,
          onclick: `
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add('copied');
          setTimeout(() => this.classList.remove('copied'), ${toggleMs})
        `,
        },
        [h("span", { class: "ready" }), h("span", { class: "success" })]
      );

      node.children.push(button);
    },
  };
}
