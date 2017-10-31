import Welcome from '../src/main/Welcome';
import LoginProviders from '../src/session/LoginProviders';
import NotFound from '../src/main/NotFound';
import Forbidden from '../src/main/Forbidden';
import LearningPathSearch from '../src/learningPath/search/LearningPathSearch';
import LearningPath from '../src/learningPath/LearningPath';
import LearningPathStep from '../src/learningPath/step/LearningPathStep';

export const serverRoutes = [
  { path: '/',
    exact: true,
    component: Welcome,
  },
  { path: '/login',
    exact: true,
    component: LoginProviders,
  },
  { path: '/learningpaths',
    exact: true,
    component: LearningPathSearch,
  },
  { path: '/learningpaths/:pathId/step/:stepId',
    exact: true,
    component: LearningPathStep,
  },
  { path: '/learningpaths/:pathId/step/:stepId',
    exact: true,
    component: LearningPath,
  },
  { path: '/learningpaths/:pathId',
    exact: true,
    component: LearningPath,
  },
  { path: '/forbidden',
    exact: true,
    component: Forbidden,
  },
  { path: '/notfound',
    exact: true,
    component: NotFound,
  },
  { path: '*',
    exact: true,
    notFound: true,
    component: NotFound,
  },
];
