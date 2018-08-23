/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const titleTemplate = ' - Læringssti NDLA';

const phrases = {
  htmlTitles: {
    // key equals component where title is used
    titleTemplate,
    welcomePage: `Framsida${titleTemplate}`,
    learningPathSearch: `Søk${titleTemplate}`,
    sessionInitializer: `Logget inn${titleTemplate}`,
    loginFailure: `Innlogginga feila${titleTemplate}`,
    logoutSession: `Logg ut${titleTemplate}`,
    loginProviders: `Logg inn${titleTemplate}`,
    myPage: `Min side${titleTemplate}`,
    forbidden: `Ikkje tilgang${titleTemplate}`,
    notFound: `Sida finst ikkje${titleTemplate}`,
    editLearningPath: `Rediger læringssti${titleTemplate}`,
    createLearningPath: `Opprett læringssti${titleTemplate}`,
    editLearningPathStep: `Rediger læringssteg${titleTemplate}`,
    createLearningPathStep: `Opprett læringssteg${titleTemplate}`,
    sortLearningPathSteps: `Sorter eller slett læringssteg${titleTemplate}`,
  },
  askNDLA: 'Spør NDLA',
  searchForm: {
    placeholder: 'Søk etter læringsstiar',
    btn: 'Søk',
    hideIntroduction: 'Skjul introduksjon',
    showIntroduction: 'Vis introduksjon',
    order: {
      relevance: 'Relevans',
      newest: 'Nyaste',
      oldest: 'Eldste',
      longest: 'Lengste',
      shortest: 'Kortaste',
      title: 'Alfabetisk',
    },
  },
  loginFailure: {
    errorMessage: 'Orsak. Innlogginga feila.',
    loginLink: 'Logg inn',
  },
  loginProviders: {
    description: 'Logg inn i NDLA med',
    privacyFirstPart:
      'Ved å logge på denne tenesten aksepterer eg med dette prinsippa i NDLA sin ',
    privacyLinkText: 'personvernpolicy',
    privacySecondPart:
      ', og eg gir samtykke til at NDLA kan bruke min personlege informasjon.',
  },
  logoutSession: {
    or: 'eller',
    logoutWholeSession: 'Logg heilt ut av alle tenester',
    logutLearningpathSite: 'Logg ut av læringssti',
  },
  logo: {
    altText: 'Nasjonal digital læringsarena',
  },
  myPage: {
    order: {
      title: 'Alfabetisk',
      newest: 'Nyaste',
      oldest: 'Eldste',
      status: 'Publisert',
    },
    pageHeader: 'Mine læringsstiar',
    newBtn: 'Opprett ny læringssti',
    path: {
      duration: 'Tidslengd',
      status: 'Synleg',
      statusValue: {
        PRIVATE: 'Privat',
        PUBLISHED: 'Søkbar',
        NOT_LISTED: 'Open',
      },
    },
  },
  pathDropDown: {
    PRIVATE: {
      publish: 'Publiser',
    },
    PUBLISHED: {
      unpublish: 'Gjer privat',
    },
    delete: 'Slett',
    makeCopy: 'Lag kopi',
  },
  requireAuthentication: {
    errorMessage: 'Denne sida krev innlogging.',
  },
  welcomePage: {
    placeholder: 'Søk etter læringsstiar',
    title1: 'Læringsstiar',
    title2: 'Nasjonal digital læringsarena',
    explanationBtn: 'Kva er ein læringssti?',
    newBtn: 'Lag din eigen læringssti',
    searchBtn: 'Søk',
    feature1Title: 'Læringssti hos NDLA',
    feature1Content: `Læringstiar organiserer fagstoff i ei bestemd rekkefølge.
      Du kan finne redaksjonelt kvalitetssikra læringstiar frå NDLA, der læringsaktivitetar er pedagogisk organisert.
      Stiar kan og tilpassast ulike læringssituasjonar. Læringstiar kan byggjast opp fra botn av,
      men læringsstoff kan også leggjast til eller trekkjast frå eksisterande læringstiar.
      Ressursar kan enkelt bli henta inn frå NDLA og andre stadar på nett.`,
  },
  learningPath: {
    pageName: 'Læringstidetaljar',
    previous: 'Førre: %{title}',
    next: 'Neste: %{title}',
    of: 'av',
    description: 'Skildring',
    descriptionPlaceholder: 'Skriv ei kort skildring av læringsstien.',
    descriptionInformation:
      'Maks 150 teikn og du har %{remainingDescriptionLength} igjen. Skildringa blir synleg i søk.',
    title: 'Tittel på læringssti',
    imagePick: 'Søk og vel bilde til læringsstien',
    duration: 'Tidslengd',
    tags: 'Taggar',
    copy: 'Kopi',
    isBasedOn: 'bygd på ',
    isBasedOnPath: 'ein annan læringssti',
    showIsBasedOn: 'Vis bygd på',
    hideIsBasedOn: 'Skjul bygd på',
    copyright: {
      license: 'Lisens',
      contributors: 'Forfattarar',
    },
    image: {
      title: 'Illustrerande bilde',
      changeImage: 'Byt bilde',
      copyright: 'Lisens',
      authors: 'Opphav',
      tags: 'Taggar',
      searchAndChose: 'Søk og vel bilde til læringsstien',
      search: 'Bildesøk',
      searchPlaceholder: 'Søk og finn passande bilde',
      choseImage: 'Bruk bildet',
      imageInformation: 'Bildet blir synleg i søk på læringssti.',
      imageSearchTotalCount: 'Søk på "%{textQuery}" gav %{totalCount} resulat',
      imageSearchOneTotalCount: 'Søk på "%{textQuery}" ga 1 resultat',
    },
  },
  editPage: {
    learningpathShortDescriptionTitle: 'Introduksjon',
    savePathBtn: 'Lagre',
    addStepBtn: 'Legg til nytt læringssteg',
    shortDescriptionPlaceholder: 'Skriv ei kort skildring (max 150 teikn)',
    titlePlaceHolder: 'Skriv  tittel her',
    oneLineEditorDefaultPlaceholder: 'Skriv her',
    deletePathBtn: 'Slett',
    cancelBtn: 'Avbryt',
    saveDraft: 'Lagre som utkast',
    saveAndPublish: 'Lagre og publiser',
    edit: 'Endre detaljar',
    publish: 'Publiser',
  },
  editPathStep: {
    urlLabel: 'Lim inn lenke (URL) frå ndla.no eller youtube.com',
    mediatype: {
      introduction: 'Introduksjon',
      text: 'Tekst',
      multimedia: 'Multimedia',
      quiz: 'Quiz',
      task: 'Oppgåve',
      summary: 'Oppsummering',
    },
    validation: {
      oneOfDescriptionOrUrlIsRequired:
        'Skildring- og/eller Url-feltet treng innhald.',
      licenseAndDescription: 'Ved utfylling av skildring må lisens vera vald.',
    },
    edit: 'Rediger læringssteg',
    urlPlaceholder: 'Lim inn lenke',
    stepDescriptionPlaceholder: 'Skriv ei skildring her',
    titlePlaceHolder: 'Skriv ein tittel her',
    previewOembed: 'Forhåndsvis heile artikkelen',
    noLicenseChosen: 'Ingen lisens vald',
    showLicenseInfo: 'Lisensen gjeld kun for skildringa av det valde steget',
    showTitle: 'Vel om tittelen skal visast eller vera skjult',
  },
  sortSteps: {
    sortOrDelete: 'Sorter eller slett læringssteg',
    finish: 'Lagre sorteringa',
    cancel: 'Avbryt',
  },
  siteNav: {
    login: 'Logg inn',
    search: 'Finn læringssti',
    createLearningPath: 'Lag læringssti',
    myPage: 'Mine læringsstiar',
    logout: 'Logg ut %{name}',
  },
  footer: {
    aboutNDLA: 'Om NDLA',
    footerInfo: 'Nettstaden er utarbeida av NDLA som open kjeldekode.',
    footerEditiorInChief: 'Ansvarleg redaktør: ',
    footerManagingEditor: 'Utgåveansvarleg: ',
    selectLanguage: 'Vel språk (language): ',
  },
  duration: {
    zero: 'Ukjent lengd',
    hours: '%{smart_count} time |||| %{smart_count} timar',
    minutes: '%{smart_count} minutt |||| %{smart_count} minutt',
  },
  createLearningPath: {
    createdMsg: 'Lagra OK',
    createNew: 'Opprett ny læringssti',
    title: 'Tittel',
    titleMaxLength: 'Maks 75 teikn.',
    description: 'Skildring',
    descriptionPlaceholder: 'Skriv ei kort skildring av læringsstien.',
    descriptionMaxLength: 'Maks 150 teikn.',
    createButton: 'Opprett ny læringssti',
  },
  copyLearningPath: {
    makeCopy: 'Lag kopi',
    copyText:
      'Ynsker du å ta utgangspunkt i denne læringsstien for å laga ein ny læringssti? Vi opner ein kopi som blir lagra saman med dei andre læringsstiane dine.',
    createCopy: 'Kopier læringssti',
    abortCopy: 'Avbryt',
    copyTitle: 'Kopier ein annan sin læringssti',
    copy: 'KOPI: ',
    copiedMessage: 'Læringssti kopiert.',
  },
  learningPathStep: {
    messages: {
      delete: {
        title: 'Sletta «%{stepTitle}»',
        action: 'Angre',
      },
    },
    license: 'Lisens: %{license}',
  },
  updateLearningPath: {
    updatedMsg: 'Lagra OK',
  },
  tagInput: {
    createOption: 'Opprett ny tagg',
    emptyList: 'Det er ingen taggar i denne lista',
    emptyFilter: 'Fant ingen passande taggar',
  },
  copyrightInput: {
    createOption: 'Opprett ny bidragsytar',
    emptyFilter: 'Ingen bidragsytarar funne. Legg difor til bidragsytar',
  },
  updateLearningPathStatus: {
    updateStatusMsg: 'Oppdatert status OK',
  },
  htmlTitleTemplates: {
    learningPathStep: '%{title} (Læringssti frå NDLA.no)',
  },
  validation: {
    required: 'Feltet er påkrevd.',
    integer: 'Må vera eit tal.',
    max: 'Må ikkje vera meir enn maks %{max} teikn.',
    min: 'Må ha minst %{min} teikn.',
    oembed: 'Feltet har ein ugyldig url.',
  },
  errors: {
    title: 'Tittel manglar.',
    description: 'Skildring manglar.',
    duration: 'Mangler tidslengd.',
    durationMinus: 'Tidslengd må vera større enn null.',
    durationNaN: 'Ugyldig tidslengd. Tast inn tal på timar.',
    durationDecimals: 'Tal på desimalar er maks to.',
  },
  ltiSearch: {
    ltiAdded: 'LTI Ressurs er lagra',
  },
  embedSearch: {
    form: {
      externalTitle: 'Legg til innhald frå ekstern kjelde',
      ndlaTitle: 'Legg til innhald frå NDLA',
      placeholder: 'Søk og finn kjelde',
      allFilter: 'Alle',
    },
    results: {
      noResults: 'Ingen resultat',
      useInPath: 'Bruk i læringsstien',
      preview: 'Forhåndvis',
    },
    preview: {
      title: 'Forhåndsvisning av oembed',
      error: 'Ein feil skjedde.',
    },
    externalButton: 'Søk i eksterne ressursar',
    ndlaButton: 'Søk i NDLA',
  },
  pinterest: {
    importFrom: 'Hent læringssteg frå Pinterest',
    lightbox: {
      heading: 'Hent læringssteg frå Pinterest',
    },
    form: {
      placeholder: 'brukarnamn/tavlenamn',
      usernamePlaceholder: 'brukernamn',
      boardPlaceholder: 'tavlenamn',
      submit: 'Hent pins',
      requiredFields: 'Både brukarnamn og tavlenamn må fyllast ut.',
    },
    allPins: 'Alle pins',
    error: 'Fann ikkje tavla under dette brukarnamnet.',
    pinForm: {
      create: 'Opprett læringssteg',
      viewSource: 'Sjå kjeldelenke',
    },
  },
  htmlStatus: {
    notFound: {
      description: 'Denne sida finst ikkje',
    },
    forbidden: {
      description: 'Du har ikkje tilgong til denne sida',
    },
    backToFrontpage: 'Tilbake til framsida',
  },
};

export default phrases;
