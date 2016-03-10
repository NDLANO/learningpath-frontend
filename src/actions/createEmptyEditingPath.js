import { setEditingLearningPath } from '.';

export default function createEmptyEditingPath () {
  return setEditingLearningPath({
    title: [],
    description: [],
    learningsteps: []
  });
}
