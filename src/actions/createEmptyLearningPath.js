import { setLearningPath } from '.';

export default function createEmptyLearningPath () {
  return setLearningPath({
    title: [],
    description: [],
    learningsteps: [],
    duration: 1 // TODO: implement way for the user to set this value when creating a path
  });
}
