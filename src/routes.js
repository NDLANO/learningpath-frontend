import App from './main/App';
import Welcome from './main/Welcome';
import LoginProviders from './session/LoginProviders';
import LogoutSession from './session/LogoutSession';
import LearningPathContainer from './learningPath/LearningPathContainer';
import LTIEmbedded from './ltiSearch/LTIEmbedded';
import NotFound from './main/NotFound';
import Forbidden from './main/Forbidden';
import LearningPathSearch from './learningPath/search/LearningPathSearch';
import LearningPath from './learningPath/LearningPath';
import CreateLearningPath from './learningPath/new/CreateLearningPath';

export const routes = [
  { path: '/',
    exact: true,
    component: Welcome,
  },
  { path: '/login',
    exact: true,
    component: LoginProviders,
  },
  { path: '/logout',
    exact: true,
    component: LTIEmbedded,
  },
  { path: '/lti/:pathId/step/:stepId',
    exact: true,
    private: true,
    component: LTIEmbedded,
  },
  { path: '/lti/:pathId/step/:stepId',
    exact: true,
    private: true,
    component: LogoutSession,
  },

  { path: '/learningpaths',
    exact: true,
    component: LearningPathSearch,
  },
  { path: '/learningpaths/:pathId/first-step',
    exact: true,
    component: LearningPath,
  },
  { path: '/learningpaths/new',
    exact: true,
    component: CreateLearningPath,
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
    component: NotFound,
  },

];
