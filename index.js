function getValue(def, property) {
  if (def && property && def.properties[property]) {
    return getValueForType(def.properties[property]);
  }

  return null;
}

function processDefinition(definitionSelected) {
  if (!definitionSelected || !definitionSelected.properties) {
    return {};
  }

  const keys = Object.keys(definitionSelected.properties);

  if (!keys || keys.length === 0) {
    return {};
  }

  return keys.reduce((a, b) => Object.assign(a, { [b]: getValue(definitionSelected, b) }), {});
}

function getValueForType(property) {
  if (property.type === 'object') return processDefinition(property, property.properties);
  if (property.type === 'array') return [processDefinition(property.items, property.items)];
  return property.example || null;
}

module.exports = function swaggerFixtures(definition) {
  return processDefinition(definition);
};
