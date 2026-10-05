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

      if (
        attachment.asset?.type === "image" &&
        attachment.asset.src !== element.src
      ) {
        element.src = attachment.asset.src;
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
          `${attachment.position.x}px`;

        element.style.top =
          `${attachment.position.y}px`;

        element.style.transform =
          "translate(-50%, -50%)";
      } else {
        element.style.left = "50%";
        element.style.top = "50%";
        element.style.transform =
          "translate(-50%, -50%)";
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
