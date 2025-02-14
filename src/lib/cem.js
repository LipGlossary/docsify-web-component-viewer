import { isControlsReady } from "./utilities.js";

const configPrefix = window.$docsify.componentDocs.prefix;

export const TAG_PREFIX = configPrefix ? `${configPrefix}-` : "";

export const customElements =
  isControlsReady &&
  fetch(window.$docsify.componentDocs?.manifestPath)
    .then((res) => res.json())
    .catch((err) => console.error(err));

export const getAllComponents = (metadata) => {
  const components = [];

  metadata.modules?.map((module) => {
    module.declarations?.map((declaration) => {
      if (declaration.customElement) {
        components.push(declaration);
      }
    });
  });

  return components;
};

export const getComponent = (metadata, tagName) => {
  return getAllComponents(metadata).find(
    (component) => component.tagName === tagName
  );
};
