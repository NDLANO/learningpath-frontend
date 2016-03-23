import { setLearningPath } from '.';

export default function createEmptyLearningPath () {
  return setLearningPath({
    title: [],
    description: [],
    learningsteps: []
  });
}
