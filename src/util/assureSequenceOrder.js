import sortBy from 'lodash/sortBy';

export default function assureSequenceOrder(objects) {
  return sortBy(objects, 'seqNo').map((obj, seqNo) => Object.assign(obj, {seqNo}));
}
