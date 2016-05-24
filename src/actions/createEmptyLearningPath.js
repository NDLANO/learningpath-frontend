import { setLearningPath } from '.';

export default function createEmptyLearningPath() {
  return setLearningPath({
    title: [],
    description: [],
    learningsteps: [],
    duration: 1 // https://support.knowit.no/support/browse/NDLA-198
  });
}
