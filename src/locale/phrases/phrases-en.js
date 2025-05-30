/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const titleTemplate = " - Læringssti NDLA";

const phrases = {
  htmlTitles: {
    titleTemplate,
    welcomePage: `Frontpage${titleTemplate}`,
    learningPathSearch: `Search${titleTemplate}`,
    sessionInitializer: `Logged in${titleTemplate}`,
    loginFailure: `Login failed${titleTemplate}`,
    logoutSession: `Logout${titleTemplate}`,
    loginProviders: `Log in${titleTemplate}`,
    adminPage: `Admin page${titleTemplate}`,
    myPage: `My page${titleTemplate}`,
    forbidden: `No access${titleTemplate}`,
    notFound: `Not found${titleTemplate}`,
    editLearningPath: `Edit learning path${titleTemplate}`,
    editLearningPathStep: `Edit learning path step${titleTemplate}`,
    createLearningPathStep: `Create learning path step${titleTemplate}`,
    sortLearningPathSteps: `Sort or delete learning path steps${titleTemplate}`,
  },
  errorPage: {
    title: "Ops, something went wrong",
    subTitle: "Sorry, something went wrong.",
    imageAlt: "Something went wrong.",
  },
  askNDLA: "Ask NDLA",
  searchForm: {
    placeholder: "Search learning paths",
    btn: "Search",
    hideIntroduction: "Hide introduction",
    showIntroduction: "Show introduction",
    order: {
      relevance: "Relevance",
      newest: "Newest",
      oldest: "Oldest",
      longest: "Longest",
      shortest: "Shortest",
      title: "Alphabetical",
    },
  },
  loginFailure: {
    errorMessage: "Sorry. Login failed.",
    loginLink: "Log in",
  },
  loginProviders: {
    description: "Log in with",
    privacyFirstPart: "By signing in to this service I am hereby accepting the principles in the NDLA ",
    privacyLinkText: "privacy policy",
    privacySecondPart: " and I am giving my consent to NDLA’s use of my personal information.",
    missingFacebook: {
      title: "Do you miss Facebook login?",
      description:
        "Login with Facebook is removed because of low usage. You can still log in with Google to access your learningpaths, as long as you use the same email address as before. You can create a free Google account with <strong>your existing</strong> email address at google.com.",
    },
  },
  logoutSession: {
    title: "Logout",
    logutLearningpathSite: "Logout from learningpaths",
  },
  logo: {
    altText: "The Norwegian Digital Learning Arena",
  },
  adminPage: {
    pageHeader: "Adminpanel",
    noPaths: {
      submitted: "There are no learningpaths with status submitted",
      unlisted: "There are no learningpaths with status unlisted",
    },
    statusHeader: {
      submitted: "Submitted learningpaths",
      unlisted: "Unlisted learningpaths",
    },
    rejectedPathMessage: {
      message: "Feedback on rejected learningpath",
      placeholder: "Explain why the learningpath was not accepted",
      button: "Send message and change status",
    },
  },
  myPage: {
    pageHeader: "My learning paths",
    newBtn: "Create new learning path",
    rejectedMessageAlert: {
      message: "Learningpath with title %{title} was rejected. See the message: %{message}",
      action: "Delete message",
      messageRemoved: "Message deleted for learningpath with title: %{title}",
    },
  },
  tilePage: {
    order: {
      title: "Alphabetical",
      newest: "Newest",
      oldest: "Oldest",
      status: "Published",
    },
    path: {
      duration: "Duration",
      status: "Visibility",
      owner: {
        name: "Name",
        email: "Email",
      },
      statusValue: {
        PRIVATE: "Draft",
        PUBLISHED: "Public",
        UNLISTED: "Private",
        SUBMITTED: "Submitted for public",
      },
    },
  },
  pathDropDown: {
    PRIVATE: {
      unlist: "Make unlisted",
      submit: "Make public",
    },
    PUBLISHED: {
      unpublish: "Make draft",
      unlist: "Make unlisted",
    },
    UNLISTED: {
      unpublish: "Make draft",
      submit: "Make public",
    },
    SUBMITTED: {
      unpublish: "Make draft",
      unlist: "Make unlisted",
      publish: "Publish",
    },
    delete: "Delete",
    makeCopy: "Make copy",
  },
  requireAuthentication: {
    errorMessage: "This page requires you to be logged in.",
  },
  welcomePage: {
    placeholder: "Search for learning paths",
    title1: "Learning paths",
    title2: "The Norwegian Digital Learning Arena",
    explanationBtn: "What is a learning path?",
    newBtn: "Make your own learning path",
    searchBtn: "Search",
    feature1Title: "Learningpath by NDLA",
    feature1Content: `Learning paths organizes subject matter in a certain order.
      You can find editorial quality assured learning paths from NDLA, where learning activities are educational organized.
      Paths can also be adapted to different learning situations. Learning paths can be built up from scratch,
      but learning material can also be removed or added to existing learning paths.
      Resources are obtained easily from NDLA and elsewhere online.`,
  },
  learningPath: {
    pageName: "Learning path details",
    previous: "Previous: %{title}",
    next: "Next: %{title}",
    of: "of",
    description: "Description",
    descriptionPlaceholder: "Write a short description for the learning path.",
    descriptionInformation:
      "Max 150 characters. You have %{remainingDescriptionLength} remaining. Description will be shown in search results.",
    title: "Learning path title",
    imagePick: "Search and choose picture for learning path",
    duration: "Duration",
    tags: "Tags",
    copy: "Copy",
    isBasedOn: "based on ",
    isBasedOnPath: "another learningpath",
    showIsBasedOn: "Show is based on",
    hideIsBasedOn: "Hide is based on",
    editInEditorial: "Edit this learning step article in ed",
    copyright: {
      license: "License",
      contributors: "Authors",
    },
    image: {
      title: "Illustrative picture",
      changeImage: "Change picture",
      copyright: "License",
      authors: "Copyright",
      tags: "Tags",
      searchAndChose: "Search and choose picture for learning path",
      search: "Search pictures",
      searchPlaceholder: "Search and find an illustrative picture",
      choseImage: "Use picture",
      imageInformation: "Picture will be shown in search results.",
      imageSearchTotalCount: 'Search for "%{textQuery}" yielded %{totalCount} results',
      imageSearchOneTotalCount: 'Search for "%{textQuery}" yielded 1 result',
    },
  },
  editPage: {
    learningpathShortDescriptionTitle: "Introduction",
    savePathBtn: "Save",
    addStepBtn: "Add new learning step",
    shortDescriptionPlaceholder: "Write a short description (max 150 characters)",
    titlePlaceHolder: "Write title here",
    oneLineEditorDefaultPlaceholder: "Write here",
    deletePathBtn: "Delete",
    cancelBtn: "Cancel",
    saveDraft: "Save as draft",
    saveAndPublish: "Save and publish",
    edit: "Edit details",
    publish: "Publish",
  },
  editPathStep: {
    urlLabel: "Paste link (URL) from ndla.no",
    mediatype: {
      introduction: "Introduction",
      text: "Text",
      multimedia: "Multimedia",
      quiz: "Quiz",
      task: "Task",
      summary: "Summary",
    },
    validation: {
      oneOfDescriptionOrUrlIsRequired: "Either Description and Url must be provided.",
      licenseAndDescription: "When description is added, a license has to be chosen.",
    },
    edit: "Edit learning path step",
    urlPlaceholder: "Paste link",
    stepDescriptionPlaceholder: "Write a description here",
    titlePlaceHolder: "Write a title here",
    previewOembed: "Preview whole article",
    noLicenseChosen: "No license chosen",
    showLicenseInfo: "The license applies only to the description of the selected step",
    showTitle: "Chose if the title should be visible or hidden",
  },
  sortSteps: {
    sortOrDelete: "Sort or delete learning step",
    finish: "Save sorting",
    cancel: "Cancel",
  },
  siteNav: {
    login: "Log in",
    admin: "Admin",
    search: "Find learning path",
    createLearningPath: "Create learningpath",
    myPage: "My learning paths",
    logout: "Log out %{name}",
  },
  footer: {
    aboutNDLA: "About NDLA",
    footerInfo: "This webapplication is developed by NDLA as Open Source code.",
    footerEditiorInChief: "Editor in chief: ",
    footerManagingEditor: "Managing editor: ",
    selectLanguage: "Choose language (språk): ",
    privacy: "Privacy statement",
    cookies: "Statement about cookies",
    accessibility: "Accessibility statement",
  },
  duration: {
    zero: "Unknown length",
    hours: "%{smart_count} hour |||| %{smart_count} hours",
    minutes: "%{smart_count} minute |||| %{smart_count} minutes",
  },
  createLearningPath: {
    createdMsg: "Saved OK",
    createNew: "Create new learning path",
    title: "Title",
    titleMaxLength: "Max 75 characters.",
    description: "Description",
    descriptionPlaceholder: "Write a short description for the learning path.",
    descriptionMaxLength: "Max 150 characters.",
    createButton: "Create new learning path",
    notAllowed: "You do not have access to this operation at the moment.",
  },
  copyLearningPath: {
    makeCopy: "Make copy",
    copyText:
      "Do you wish to base a new learning path og this learning path? We will make a copy which will be saved with your learning paths",
    createCopy: "Copy learning path",
    abortCopy: "Cancel",
    copyTitle: "Copy another's learning paths",
    copy: "COPY: ",
    copiedMessage: "Learning path was copied.",
    notAllowed: "You do not have access to this operation at the moment.",
  },
  learningPathStep: {
    messages: {
      delete: {
        title: "Deleted «%{stepTitle}»",
        action: "Undo",
      },
    },
    license: "License: %{license}",
  },
  updateLearningPath: {
    updatedMsg: "Saved OK",
    notAllowed: "You do not have access to this operation at the moment.",
  },
  tagInput: {
    createOption: "Create new tag",
    emptyList: "No tags available",
    emptyFilter: "No matching tags found",
  },
  copyrightInput: {
    createOption: "Create a new contributer",
    emptyFilter: "No contributers found. Add a contributer",
  },
  updateLearningPathStatus: {
    UNLISTED: "Updated status to private. This means that it is reachable by url, but does not appear in the search.",
    PUBLISHED: "Updated status to public.",
    PRIVATE: "Updated status to draft.",
    SUBMITTED: "Updated status to submitted for public.",
    consequence: {
      UNLISTED: "Learningpath will only be accesible by the url.",
      PUBLISHED: "Learningpath will be accesible by search and url.",
      PRIVATE: "Only the author can see the learningpath.",
      SUBMITTED: "Learningpath will be accessible by url, and in search when approved.",
    },
  },
  validation: {
    required: "The field is required.",
    integer: "Must be a number.",
    max: "Cannot contain more than %{max} characters.",
    min: "Must contain at least %{min} characters.",
    oembed: "The field has an invalid URL.",
  },
  errors: {
    title: "Title required.",
    description: "Description required.",
    duration: "Duration required.",
    durationMinus: "Duration must be bigger then zero.",
    durationNaN: "Invalid duration. Must be in number of hours.",
    durationDecimals: "Max two decimals.",
  },
  ltiSearch: {
    ltiAdded: "LTI Resource is saved",
  },
  embedSearch: {
    form: {
      ndlaTitle: "Add content from NDLA",
      externalTitle: "Add content from an external source",
      placeholder: "Search and find source",
      allFilter: "All",
    },
    results: {
      noResults: "No results found",
      useInPath: "Use in learningpath",
      preview: "Preiview",
      error: "This resource can not be used.",
    },
    preview: {
      title: "Preview for oembed",
      error: "An error has occured",
    },
    ndlaButton: "Search for NDLA resources",
    externalButton: "Search for external resources",
  },
  pinterest: {
    importFrom: "Get learning steps from Pinterest",
    lightbox: {
      heading: "Get learning steps from Pinterest",
    },
    form: {
      placeholder: "username/board",
      usernamePlaceholder: "username",
      boardPlaceholder: "board",
      submit: "Fetch pins",
      requiredFields: "Both username and boardname must be filled.",
    },
    allPins: "All pins",
    error: "Did not find the board under the specified username.",
    pinForm: {
      create: "Create learning step",
      viewSource: "View source link",
    },
  },
  htmlStatus: {
    notFound: {
      description: "The page cannot be found",
    },
    forbidden: {
      description: "You do not have access to this page",
    },
    backToFrontpage: "Go to frontpage",
  },
};

export default phrases;
