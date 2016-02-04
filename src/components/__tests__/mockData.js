const learningPaths = [
  {
    id: '1',
    title: [
      { title: 'Hva er kunst og kultur?', language: 'nb' },
      { title: 'Kva er kunst og kultur?', language: 'nn' },
      { title: 'What is art and culture?', language: 'en' }
    ],
    description: [
      { description: 'Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden. Kurset fokuserer på kunst og kultur på et verdensperspektiv.', language: 'nb' },
      { description: 'Kurset dekker innføring og vil gje deg grunnleggjande forståing for vanlege omgrep i kunst og kultur verda. Kurset fokuserer på kunst og kultur på eit verdsperspektiv.', language: 'nn' },
      { description: 'The course covers the introduction and will give you a basic understanding of common concepts in the arts world. The course focuses on art and culture in a world perspective', language: 'en' }
    ],
    metaUrl: 'http://api.test.ndla.no/learningpaths/1',
    duration: 1080,
    status: 'PUBLISHED',
    author: { type: 'Forfatter', name: 'Snurre Sprett' },
    lastUpdated: new Date('2015-03-07T14:00:00+01:00')
  },
  {
    id: '2',
    title: [
      { title: 'Leselighet og skrift', language: 'nb' },
      { title: 'Leselighet og skrift', language: 'nn' }
    ],
    description: [
      { description: 'Uttrykkene "leselighet" og "lesbarhet" brukes om hverandre i norsk fagterminologi, og ofte uten klare forestillinger om hva begrepene står for.', language: 'nb' },
      { description: 'Uttrykka "leselighet" og "lesbarhet" vert brukt om kvarandre i norsk fagterminologi, og ofte utan klåre førestillingar om kva omgrepa står for.', language: 'nn' }
    ],
    metaUrl: 'http://api.test.ndla.no/learningpaths/2',
    duration: 45,
    status: 'PRIVATE',
    author: { type: 'Forfatter', name: 'Kaptein Sabeltann' },
    lastUpdated: new Date('2016-02-01T12:00:00+01:00')
  }
];

const learningPath = {
  id: 4,
  title: [
    {
      title: 'Kristofers private bokmål',
      language: 'nb'
    },
    {
      title: 'Kristofers private nynorsk',
      language: 'nn'
    },
    {
      title: 'Kristofers private english',
      language: 'en'
    }
  ],
  description: [
    {
      description: 'Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden. Kurset fokuserer på kunst og kultur på et verdensperspektiv.',
      language: 'nb'
    },
    {
      description: 'Kurset dekker innføring og vil gje deg grunnleggjande forståing for vanlege omgrep i kunst og kultur verda. Kurset fokuserer på kunst og kultur på eit verdsperspektiv.',
      language: 'nn'
    },
    {
      description: 'The course covers the introduction and will give you a basic understanding of common concepts in the arts world. The course focuses on art and culture in a world perspective',
      language: 'en'
    }
  ],
  metaUrl: 'http://api.test.ndla.no/learningpaths/private/4',
  learningsteps: [
    {
      id: 7,
      seqNo: 1,
      title: [
        {
          title: 'Tittel her',
          language: 'nb'
        }
      ],
      description: [
        {
          description: 'Beskrivelse',
          language: 'nb'
        }
      ],
      embedUrl: [
        {
          url: 'http://www.vg.no',
          language: 'nb'
        }
      ],
      type: 'TEXT',
      license: 'by-nc-sa',
      metaUrl: 'http://api.test.ndla.no/learningpaths/private/4/learningsteps/7'
    },
    {
      id: 8,
      seqNo: 2,
      title: [
        {
          title: 'En annen tittel her',
          language: 'nb'
        }
      ],
      description: [
        {
          description: 'Beskrivelse',
          language: 'nb'
        }
      ],
      embedUrl: [
        {
          url: 'http://www.vg.no',
          language: 'nb'
        }
      ],
      type: 'TEXT',
      metaUrl: 'http://api.test.ndla.no/learningpaths/private/4/learningsteps/8'
    }
  ],
  learningstepUrl: 'http://api.test.ndla.no/learningpaths/private/4/learningsteps',
  coverPhotoUrl: 'http://api.ndla.no/images/full/sy2fe75b.jpg',
  duration: 1080,
  status: 'PRIVATE',
  verificationStatus: 'VERIFIED_BY_NDLA',
  lastUpdated: '2016-02-02T10:44:06Z',
  tags: [
    {
      tag: 'kristofer',
      language: 'nb'
    }
  ],
  author: {
    type: 'Forfatter',
    name: 'Kristofer'
  }
};

export { learningPaths, learningPath };
