/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const phrases = {
  searchForm: {
    placeholder: 'Search learning paths',
    btn: 'Search',
    hideIntroduction: 'Hide introduction',
    showIntroduction: 'Show introduction',
    order: {
      relevance: 'Relevance',
      newest: 'Newest',
      oldest: 'Oldest',
      longest: 'Longest',
      shortest: 'Shortest',
      title: 'Alphabetical',
    },
  },
  loginFailure: {
    errorMessage: 'Sorry. Login failed.',
    loginLink: 'Log in',
  },
  loginProviders: {
    description: 'Log in with',
  },
  logo: {
    altText: 'The Norwegian Digital Learning Arena',
  },
  myPage: {
    order: {
      title: 'Alphabetical',
      newest: 'Newest',
      oldest: 'Oldest',
      status: 'Published',
    },
    pageHeader: 'My learning paths',
    newBtn: 'Create new learning path',
    path: {
      duration: 'Duration',
      status: 'Visibility',
      statusValue: {
        PRIVATE: 'Private',
        PUBLISHED: 'Searchable',
        NOT_LISTED: 'Open',
      },
    },
  },
  pathDropDown: {
    PRIVATE: {
      publish: 'Publish',
    },
    PUBLISHED: {
      unpublish: 'Make private',
    },
    delete: 'Delete',
    makeCopy: 'Make copy',
  },
  requireAuthentication: {
    errorMessage: 'This page requires you to be logged in.',
  },
  welcomePage: {
    placeholder: 'Search for learning paths',
    title1: 'Learning paths',
    title2: 'The Norwegian Digital Learning Arena',
    explanationBtn: 'What is a learning path?',
    newBtn: 'Make your own learning path',
    searchBtn: 'Search',
    feature1Title: 'Learningpath by NDLA',
    feature1Content: `Learning paths organizes subject matter in a certain order.
      You can find editorial quality assured learning paths from NDLA, where learning activities are educational organized.
      Paths can also be adapted to different learning situations. Learning paths can be built up from scratch,
      but learning material can also be removed or added to existing learning paths.
      Resources are obtained easily from NDLA and elsewhere online.`,
  },
  learningPath: {
    pageName: 'Learning path details',
    previous: 'Previous: %{title}',
    next: 'Next: %{title}',
    of: 'of',
    description: 'Description',
    descriptionPlaceholder: 'Write a short description for the learning path.',
    descriptionInformation: 'Max 150 characters. You have %{remainingDescriptionLength} remaining. Description will be shown in search results.',
    title: 'Learning path title',
    imagePick: 'Search and choose picture for learning path',
    duration: 'Duration',
    tags: 'Tags',
    copy: 'Copy',
    isBasedOn: 'based on ',
    isBasedOnPath: 'another learningpath',
    copyright: {
      license: 'License',
      contributors: 'Authors',
    },
    image: {
      title: 'Illustrative picture',
      changeImage: 'Change picture',
      copyright: 'License',
      authors: 'Copyright',
      tags: 'Tags',
      searchAndChose: 'Search and choose picture for learning path',
      search: 'Search pictures',
      searchPlaceholder: 'Search and find an illustrative picture',
      choseImage: 'Use picture',
      imageInformation: 'Picture will be shown in search results.',
      imageSearchTotalCount: 'Search for "%{textQuery}" yielded %{totalCount} results',
      imageSearchOneTotalCount: 'Search for "%{textQuery}" yielded 1 result',
    },
  },
  editPage: {
    learningpathShortDescriptionTitle: 'Introduction',
    savePathBtn: 'Save',
    addStepBtn: 'Add new learning step',
    shortDescriptionPlaceholder: 'Write a short description (max 150 characters)',
    titlePlaceHolder: 'Write title here',
    oneLineEditorDefaultPlaceholder: 'Write here',
    deletePathBtn: 'Delete',
    cancelBtn: 'Cancel',
    saveDraft: 'Save as draft',
    saveAndPublish: 'Save and publish',
    edit: 'Edit details',
    publish: 'Publish',
  },
  editPathStep: {
    urlLabel: 'Paste link (URL) from ndla.no or youtube.com',
    mediatype: {
      introduction: 'Introduction',
      text: 'Text',
      multimedia: 'Multimedia',
      quiz: 'Quiz',
      task: 'Task',
      summary: 'Summary',
    },
    validation: {
      oneOfDescriptionOrUrlIsRequired: 'Either Description and Url must be provided.',
    },
    edit: 'Edit learning path step',
    urlPlaceholder: 'Paste link',
    stepDescriptionPlaceholder: 'Write a description here',
    titlePlaceHolder: 'Write a title here',
    previewOembed: 'Preview whole article',
    noLicenseChosen: 'No license chosen',

  },
  sortSteps: {
    sortOrDelete: 'Sort or delete learning step',
    finish: 'Save sorting',
    cancel: 'Cancel',
  },
  siteNav: {
    login: 'Log in',
    search: 'Find learning path',
    myPage: 'My learning paths',
    logout: 'Log out %{name}',
  },
  footer: {
    aboutNDLA: 'About NDLA',
    aboutLearningPath: 'About learning paths',
    privacy: 'Privacy',
    feedback: 'Feedback',
    footerInfo: 'This webapplication is developed by NDLA as Open Source code.',
    footerEditiorInChief: 'Editor in chief: ',
    footerManagingEditor: 'Managing editor: ',
    selectLanguage: 'Choose language (språk): ',
  },
  duration: {
    zero: 'Unknown length',
    hours: '%{smart_count} hour |||| %{smart_count} hours',
    minutes: '%{smart_count} minute |||| %{smart_count} minutes',
  },
  createLearningPath: {
    createdMsg: 'Saved OK',
    createNew: 'Create new learning path',
    title: 'Title',
    titleMaxLength: 'Max 75 characters.',
    description: 'Description',
    descriptionPlaceholder: 'Write a short description for the learning path.',
    descriptionMaxLength: 'Max 150 characters.',
    createButton: 'Create new learning path',
  },
  copyLearningPath: {
    makeCopy: 'Make copy',
    copyText: 'Do you wish to base a new learning path og this learning path? We will make a copy which will be saved with your learning paths',
    createCopy: 'Copy learning path',
    abortCopy: 'Cancel',
    copyTitle: 'Copy another\'s learning paths',
    copy: 'COPY: ',
    copiedMessage: 'Learning path was copied.',
  },
  learningPathStep: {
    messages: {
      delete: {
        title: 'Deleted «%{stepTitle}»',
        action: 'Undo',
      },
    },
    license: 'License: %{license}',
  },
  updateLearningPath: {
    updatedMsg: 'Saved OK',
  },
  tagInput: {
    createNew: 'Create new tag',
    emptyList: 'No tags available',
    emptyFilter: 'No matching tags found',
  },
  copyrightInput: {
    createNew: 'Create a new contributer',
    emptyFilter: 'No contributers found. Add a contributer',
  },
  updateLearningPathStatus: {
    updateStatusMsg: 'Status updated',
  },
  htmlTitleTemplates: {
    learningPathStep: '%{title} (learning path from NDLA.no)',
  },
  validation: {
    required: 'The field is required.',
    integer: 'Must be a number.',
    max: 'Cannot contain more than %{max} characters.',
    min: 'Must contain at least %{min} characters.',
    oembed: 'The field has an invalid URL.',
  },
  errors: {
    title: 'Title required.',
    description: 'Description required.',
    duration: 'Duration required.',
    durationMinus: 'Duration must be bigger then zero.',
    durationNaN: 'Invalid duration. Must be in number of hours.',
    durationDecimals: 'Max two decimals.',
  },
  ltiSearch: {
    ltiAdded: 'LTI Resource is saved',
  },
  embedSearch: {
    form: {
      ndlaTitle: 'Add content from NDLA',
      externalTitle: 'Add content from an external source',
      placeholder: 'Search and find source',
      allFilter: 'All',
    },
    results: {
      noResults: 'No results found',
      useInPath: 'Use in learningpath',
      preview: 'Preiview',
    },
    preview: {
      title: 'Preview for oembed',
      error: 'An error has occured',
    },
    ndlaButton: 'Search for NDLA resources',
    externalButton: 'Search for external resources',
  },
  pintrest: {
    importFrom: 'Get learning steps from Pintrest',
    lightbox: {
      heading: 'Get learning steps from Pintrest',
    },
    form: {
      placeholder: 'username/board',
      submit: 'Fetch pins',
    },
    pinForm: {
      create: 'Create learning step',
      viewSource: 'View source link',
    },
  },
  htmlStatus: {
    notFound: 'The page cannot be found',
    forbidden: 'You do not have access to this page',
    backToFrontpage: 'Go to frontpage',
  },
};

export default phrases;
