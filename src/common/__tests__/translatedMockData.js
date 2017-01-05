const translatedLearningPaths = [
  {
    id: '1',
    title: 'Hva er kunst og kultur?',
    description: `Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden.
        Kurset fokuserer på kunst og kultur på et verdensperspektiv.`,
    metaUrl: 'http://api.test.ndla.no/learningpaths/1',
    duration: 1080,
    status: 'PUBLISHED',
    author: { type: 'Forfatter', name: 'Snurre Sprett' },
    lastUpdated: new Date('2015-03-07T14:00:00+01:00'),
  },
  {
    id: '2',
    title: 'Leselighet og skrift',
    description: 'Uttrykkene "leselighet" og "lesbarhet" brukes om hverandre i norsk fagterminologi, og ofte uten klare forestillinger om hva begrepene står for.',
    metaUrl: 'http://api.test.ndla.no/learningpaths/2',
    duration: 45,
    status: 'PRIVATE',
    author: { type: 'Forfatter', name: 'Kaptein Sabeltann' },
    lastUpdated: new Date('2016-02-01T12:00:00+01:00'),
  },
];

const translatedLearningPath = {
  id: 4,
  title: 'Kristofers private bokmål',
  description: 'Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden. Kurset fokuserer på kunst og kultur på et verdensperspektiv.',
  metaUrl: 'http://api.test.ndla.no/learningpaths/4',
  learningsteps: [
    {
      id: 7,
      seqNo: 1,
      title: 'Tittel her',
      type: 'TEXT',
      license: 'by-nc-sa',
      metaUrl: 'http://api.test.ndla.no/learningpaths/4/learningsteps/7',
    },
    {
      id: 8,
      seqNo: 2,
      title: 'En annen tittel her',
      type: 'TEXT',
      metaUrl: 'http://api.test.ndla.no/learningpaths/4/learningsteps/8',
    },
  ],
  isBasedOnTitle: undefined,
  learningstepUrl: 'http://api.test.ndla.no/learningpaths/4/learningsteps',
  coverPhotoUrl: 'http://api.ndla.no/images/full/sy2fe75b.jpg',
  duration: 1080,
  verificationStatus: 'VERIFIED_BY_NDLA',
  lastUpdated: '2016-02-02T10:44:06Z',
  canEdit: true,
  tags: ['kristofer'],
  author: {
    type: 'Forfatter',
    name: 'KristoferForfatter',
  },
};


const translatedLearningPathNotEditable = {
  id: 4,
  title: 'Kristofers private bokmål',
  description: 'Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden. Kurset fokuserer på kunst og kultur på et verdensperspektiv.',

  metaUrl: 'http://api.test.ndla.no/learningpaths/4',
  learningsteps: [
    {
      id: 7,
      seqNo: 1,
      title: 'Tittel her',
      description: 'Beskrivelse',
      embedUrl: [
        {
          url: 'http://ndla.no/nb/node/24049',
        },
      ],
      oembed: {
        title: 'NDLA',
        url: 'http://ndla.no/nb/node/24049',
        html: '<iframe src="http://ndla.no/nb/node/24049/oembed" allowfullscreen></iframe>',
      },
      type: 'TEXT',
      license: 'by-nc-sa',
      metaUrl: 'http://api.test.ndla.no/learningpaths/4/learningsteps/7',
    },
    {
      id: 8,
      seqNo: 2,
      title: 'En annen tittel her',
      description: 'Beskrivelse',
      embedUrl: [
        {
          url: 'http://ndla.no/nb/node/24049',
        },
      ],
      oembed: {
        title: 'NDLA',
        url: 'http://ndla.no/nb/node/24049',
        html: '<iframe src="http://ndla.no/nb/node/24049/oembed" allowfullscreen></iframe>',
      },
      type: 'TEXT',
      metaUrl: 'http://api.test.ndla.no/learningpaths/4/learningsteps/8',
    },
  ],
  learningstepUrl: 'http://api.test.ndla.no/learningpaths/4/learningsteps',
  coverPhotoUrl: 'http://api.ndla.no/images/full/sy2fe75b.jpg',
  duration: 1080,
  verificationStatus: 'VERIFIED_BY_NDLA',
  lastUpdated: '2016-02-02T10:44:06Z',
  canEdit: false,
  tags: ['kristofer'],
  author: {
    type: 'Forfatter',
    name: 'KristoferForfatter',
  },
};

const translatedLearningStep = {
  id: 8,
  seqNo: 2,
  title: 'En annen tittel her',
  description: '<h1>Beskrivelse</h1>',
  embedUrl: [
    {
      url: 'https://www.youtube.com/watch?v=RYLlSFmGfm0',
    },
  ],
  oembed: {
    title: 'NDLA',
    url: 'https://www.youtube.com/watch?v=RYLlSFmGfm0',
    html: '<iframe src="https://www.youtube.com/embed/RYLlSFmGfm0?feature=oembed" allowfullscreen></iframe>',
  },
  type: 'TEXT',
  metaUrl: 'http://api.test.ndla.no/learningpaths/4/learningsteps/8',
};

const translatedNdlaLearningStep = {
  id: 9,
  seqNo: 3,
  title: 'En annen tittel her',
  description: 'Beskrivelse',
  embedUrl: [
    {
      url: 'http://ndla.no/nb/node/24049',
    },
  ],
  oembed: {
    title: 'NDLA',
    url: 'http://ndla.no/nb/node/24049',
    html: '<iframe src="http://ndla.no/nb/node/24049/oembed" allowfullscreen></iframe>',
  },
  type: 'TEXT',
  metaUrl: 'http://api.test.ndla.no/learningpaths/4/learningsteps/9',
};

export { translatedLearningPaths, translatedLearningPath, translatedLearningPathNotEditable, translatedLearningStep, translatedNdlaLearningStep };
