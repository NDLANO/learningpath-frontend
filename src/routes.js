import Welcome from './main/Welcome';
import LoginProviders from './session/LoginProviders';
import NotFound from './main/NotFound';
import Forbidden from './main/Forbidden';
import LearningPathSearch from './learningPath/search/LearningPathSearch';
import LearningPath from './learningPath/LearningPath';
import LearningPathStep from './learningPath/step/LearningPathStep';

export const routes = [
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
    exact: false,
    component: LearningPathStep,
  },
  { path: '/learningpaths/:pathId',
    exact: false,
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
    component: NotFound,
  },
];