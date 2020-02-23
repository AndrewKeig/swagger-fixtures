const types = {
  object: 'object',
  array: 'array',
  boolean: 'boolean',
  string: 'string',
  number: 'number',
  integer: 'integer',
};

module.exports = function swaggerFixtures(swagger, type) {
  let definition = swagger;

  if (type) {
    definition = swagger.definitions[type];
  }

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

  function onHandleBoolean(value) {
    if (value !== undefined && value !== null && value.toString() === 'true') {
      return true;
    }

    if (value !== undefined && value !== null && value.toString() === 'false') {
      return false;
    }

    return null;
  }

  function onHandleRef(ref) {
    const definitionType = ref.replace('#/definitions/', '');

    if (swagger.definitions[definitionType].properties) {
      return processDefinition(swagger.definitions[definitionType]);
    }

    return getValueForType(swagger.definitions[definitionType]);
  }

  function onHandleArray(def) {
    return [processDefinition(def)];
  }

  function getValueForType(property) {
    if (property.$ref) return onHandleRef(property.$ref);
    if (property.type === types.object) return processDefinition(property);
    if (property.type === types.array) return onHandleArray(property.items);
    if (property.type === types.boolean) return onHandleBoolean(property.example);
    if (property.type === types.string) return property.example || null;
    if (property.type === types.number) return property.example || null;
    if (property.type === types.integer) return property.example || null;
    return null;
  }

  return processDefinition(definition);
};
