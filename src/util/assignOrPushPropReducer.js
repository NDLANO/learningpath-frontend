import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import assign from 'lodash/assign';
import get from 'lodash/get';

export default function assignOrPushPropReducer (propertyName) {
  return function next(state, action) {
    let nextState = cloneDeep(state);
    let properties = get(nextState, propertyName, []);
    let index = findIndex(properties, ['language', action.payload.language]);

    if (index === -1) {
      properties.push(action.payload);
    } else {
      assign(properties[index], action.payload);
    }

    nextState[propertyName] = properties;

    return nextState;
  };
}
