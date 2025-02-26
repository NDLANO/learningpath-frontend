/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const learningPaths = [
  {
    id: "1",
    title: { title: "Hva er kunst og kultur?", language: "nb" },
    introduction: {
      introduction: "<p>Norsk test id 1</p>",
      language: "nb",
    },
    description: {
      description:
        "Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden. Kurset fokuserer på kunst og kultur på et verdensperspektiv.",
      language: "nb",
    },
    tags: {
      tags: ["kristofer"],
      language: "nb",
    },
    isBasedOnTitle: undefined,
    metaUrl: "http://api.test.ndla.no/learningpaths/1",
    duration: 1080,
    status: "PUBLISHED",
    author: { type: "writer", name: "Snurre Sprett" },
    lastUpdated: new Date("2015-03-07T14:00:00+01:00"),
  },
  {
    id: "2",
    title: { title: "Leselighet og skrift", language: "nb" },
    description: {
      description:
        'Uttrykkene "leselighet" og "lesbarhet" brukes om hverandre i norsk fagterminologi, og ofte uten klare forestillinger om hva begrepene står for.',
      language: "nb",
    },
    introduction: {
      introduction: "<p>Norsk test</p>",
      language: "nb",
    },
    tags: {
      tags: ["kristofer"],
      language: "nb",
    },
    isBasedOnTitle: undefined,
    metaUrl: "http://api.test.ndla.no/learningpaths/2",
    duration: 45,
    status: "PRIVATE",
    author: { type: "writer", name: "Kaptein Sabeltann" },
    lastUpdated: new Date("2016-02-01T12:00:00+01:00"),
  },
];

const learningPath = {
  id: 4,
  title: {
    title: "Kristofers private bokmål",
    language: "nb",
  },
  isBasedOnTitle: undefined,
  description: {
    description:
      "Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden. Kurset fokuserer på kunst og kultur på et verdensperspektiv.",
    language: "nb",
  },
  metaUrl: "http://api.test.ndla.no/learningpaths/4",
  learningsteps: [
    {
      id: 7,
      seqNo: 1,
      title: {
        title: "Tittel her",
        language: "nb",
      },
      type: "TEXT",
      license: "by-nc-sa",
      metaUrl: "http://api.test.ndla.no/learningpaths/4/learningsteps/7",
    },
    {
      id: 8,
      seqNo: 2,
      title: {
        title: "En annen tittel her",
        language: "nb",
      },
      type: "TEXT",
      metaUrl: "http://api.test.ndla.no/learningpaths/4/learningsteps/8",
    },
  ],
  learningstepUrl: "http://api.test.ndla.no/learningpaths/4/learningsteps",
  coverPhotoUrl: "http://api.ndla.no/images/full/sy2fe75b.jpg",
  duration: 1080,
  verificationStatus: "VERIFIED_BY_NDLA",
  lastUpdated: "2016-02-02T10:44:06Z",
  canEdit: true,
  tags: {
    tags: ["kristofer"],
    language: "nb",
  },
  author: {
    type: "writer",
    name: "KristoferForfatter",
  },
};

const learningPathNotEditable = {
  id: 4,
  title: {
    title: "Kristofers private bokmål",
    language: "nb",
  },
  description: {
    description:
      "Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden. Kurset fokuserer på kunst og kultur på et verdensperspektiv.",
    language: "nb",
  },
  metaUrl: "http://api.test.ndla.no/learningpaths/4",
  learningsteps: [
    {
      id: 7,
      seqNo: 1,
      title: {
        title: "Tittel her",
        language: "nb",
      },
      description: {
        description: "Beskrivelse",
        language: "nb",
      },
      embedUrl: [
        {
          url: "http://ndla.no/nb/node/24049",
          language: "nb",
        },
      ],
      oembed: {
        title: "NDLA",
        url: "http://ndla.no/nb/node/24049",
        html: '<iframe src="http://ndla.no/nb/node/24049/oembed" allowfullscreen></iframe>',
      },
      type: "TEXT",
      license: "by-nc-sa",
      metaUrl: "http://api.test.ndla.no/learningpaths/4/learningsteps/7",
    },
    {
      id: 8,
      seqNo: 2,
      title: {
        title: "En annen tittel her",
        language: "nb",
      },
      description: {
        description: "Beskrivelse",
        language: "nb",
      },
      embedUrl: [
        {
          url: "http://ndla.no/nb/node/24049",
          language: "nb",
        },
      ],
      oembed: {
        title: "NDLA",
        url: "http://ndla.no/nb/node/24049",
        html: '<iframe src="http://ndla.no/nb/node/24049/oembed" allowfullscreen></iframe>',
      },
      type: "TEXT",
      metaUrl: "http://api.test.ndla.no/learningpaths/4/learningsteps/8",
    },
  ],
  learningstepUrl: "http://api.test.ndla.no/learningpaths/4/learningsteps",
  coverPhotoUrl: "http://api.ndla.no/images/full/sy2fe75b.jpg",
  duration: 1080,
  verificationStatus: "VERIFIED_BY_NDLA",
  lastUpdated: "2016-02-02T10:44:06Z",
  canEdit: false,
  tags: {
    tag: "kristofer",
    language: "nb",
  },
  author: {
    type: "writer",
    name: "KristoferForfatter",
  },
};

const learningStep = {
  id: 8,
  seqNo: 2,
  title: {
    title: "En annen tittel her",
    language: "nb",
  },
  description: {
    description: "<h1>Beskrivelse</h1>",
    language: "nb",
  },
  embedUrl: {
    url: "https://www.youtube.com/watch?v=RYLlSFmGfm0",
    embedType: "oembed",
  },
  oembed: {
    title: "NDLA",
    url: "https://www.youtube.com/watch?v=RYLlSFmGfm0",
    html: '<iframe src="https://www.youtube.com/embed/RYLlSFmGfm0?feature=oembed" allowfullscreen></iframe>',
  },
  type: "TEXT",
  metaUrl: "http://api.test.ndla.no/learningpaths/4/learningsteps/8",
};

const ndlaLearningStep = {
  id: 9,
  seqNo: 3,
  title: {
    title: "En annen tittel her",
    language: "nb",
  },
  description: {
    description: "Beskrivelse",
    language: "nb",
  },
  embedUrl: [
    {
      url: "http://ndla.no/nb/node/24049",
      language: "nb",
    },
  ],
  oembed: {
    title: "NDLA",
    url: "http://ndla.no/nb/node/24049",
    html: '<iframe src="http://ndla.no/nb/node/24049/oembed" allowfullscreen></iframe>',
  },
  type: "TEXT",
  metaUrl: "http://api.test.ndla.no/learningpaths/4/learningsteps/9",
};

const oembedPreview = {
  oembedContent: [
    {
      type: "rich",
      version: "1.0",
      title: "Klart du bør bli journalist",
      width: 800,
      height: 800,
      html: '<iframe src="http://api.test.ndla.no/article-converter/html/nb/60" frameborder="0" />',
      url: "http://api.test.ndla.no:8082/article/60",
      language: "nb",
    },
    {
      type: "rich",
      version: "1.0",
      title: "You should become journalist",
      width: 800,
      height: 800,
      html: '<iframe src="http://api.test.ndla.no/article-converter/html/en/60" frameborder="0" />',
      url: "http://api.test.ndla.no:8082/article/60",
      language: "en",
    },
  ],
};

export { learningPaths, learningPath, learningPathNotEditable, learningStep, ndlaLearningStep, oembedPreview };
