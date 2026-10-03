export function createRenderer(container) {
  const elements = new Map();

  function createElement(attachment) {
    if (attachment.asset.type !== "image") {
      throw new Error(
        `Unsupported asset type: ${attachment.asset.type}`,
      );
    }

    const image = document.createElement("img");

    image.src = attachment.asset.src;
    image.alt = "";

    image.style.position = "absolute";
    image.style.width = `${attachment.width ?? 100}px`;
    image.style.height = `${attachment.height ?? 100}px`;
    image.style.pointerEvents = "none";

    container.appendChild(image);

    return image;
  }

  return {
    render(id, attachment) {
      let element = elements.get(id);

      if (!element) {
        element = createElement(attachment);
        elements.set(id, element);
      }

      element.style.display =
        attachment.visible && attachment.active
          ? "block"
          : "none";

      if (!attachment.visible || !attachment.active) {
        return;
      }

      const width = attachment.width ?? 100;
      const height = attachment.height ?? 100;

      if (attachment.position) {
        element.style.left =
          `${attachment.position.x - width / 2}px`;

        element.style.top =
          `${attachment.position.y - height / 2}px`;
      } else {
        element.style.left =
          `calc(50% - ${width / 2}px)`;

        element.style.top =
          `calc(50% - ${height / 2}px)`;
      }
    },

    remove(id) {
      const element = elements.get(id);

      if (!element) {
        return;
      }

      element.remove();
      elements.delete(id);
    },

    clear() {
      elements.forEach((element) => {
        element.remove();
      });

      elements.clear();
    },
  };
}
