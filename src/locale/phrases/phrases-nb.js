/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const phrases = {
  searchForm: {
    placeholder: 'Søk etter læringsstier',
    btn: 'Søk',
    hideIntroduction: 'Skjul introduksjon',
    showIntroduction: 'Vis introduksjon',
    order: {
      relevance: 'Relevans',
      newest: 'Nyeste',
      oldest: 'Eldste',
      longest: 'Lengste',
      shortest: 'Korteste',
      title: 'Alfabetisk',
    },
  },
  loginFailure: {
    errorMessage: 'Beklager. Innlogging feilet.',
    loginLink: 'Logg inn',
  },
  loginProviders: {
    description: 'Logg inn i NDLA med',
  },
  logo: {
    altText: 'Nasjonal digital læringsarena',
  },
  myPage: {
    order: {
      title: 'Alfabetisk',
      newest: 'Nyeste',
      oldest: 'Eldste',
      status: 'Publisert',
    },
    pageHeader: 'Mine læringsstier',
    newBtn: 'Opprett ny læringssti',
    path: {
      duration: 'Varighet',
      status: 'Synlighet',
      statusValue: {
        PRIVATE: 'Privat',
        PUBLISHED: 'Søkbar',
        NOT_LISTED: 'Åpen',
      },
    },
  },
  pathDropDown: {
    PRIVATE: {
      publish: 'Publiser, søkbar',
      unlist: 'Publiser, ikke søkbar',
    },
    PUBLISHED: {
      unpublish: 'Gjør privat',
      unlist: 'Fjern fra søk',
    },
    NOT_LISTED: {
      publish: 'Publiser, søkbar',
      unpublish: 'Gjør privat',
    },
    delete: 'Slett',
    makeCopy: 'Lag kopi',
  },
  requireAuthentication: {
    errorMessage: 'Denne siden krever innlogging.',
  },
  welcomePage: {
    placeholder: 'Søk etter læringsstier',
    title1: 'Læringsstier',
    title2: 'Nasjonal digital læringsarena',
    explanationBtn: 'Hva er en læringssti?',
    newBtn: 'Lag din egen læringssti',
    searchBtn: 'Søk',
    feature1Title: 'Læringssti hos NDLA',
    feature1Content: `Læringstier organiserer fagstoff i en bestemt rekkefølge.
      Du kan finne redaksjonelt kvalitetssikrede læringstier fra NDLA, der læringsaktiviteter er pedagogisk organisert.
      Stier kan også tilpasses ulike læringssituasjoner. Læringstier kan bygges opp fra bunnen av,
      men læringsstoff kan også fjernes eller legges til eksisterende læringstier.
      Ressurser hentes enkelt inn fra NDLA og andre steder på nett.`,
  },
  learningPath: {
    pageName: 'Læringstidetaljer',
    previous: 'Forrige: %{title}',
    next: 'Neste: %{title}',
    of: 'av',
    description: 'Beskrivelse',
    descriptionPlaceholder: 'Skriv en kort beskrivelse av læringsstien.',
    descriptionInformation: 'Maks 150 tegn og du har %{remainingDescriptionLength} igen. Beskrivelsen blir synlig i søk.',
    title: 'Tittel på læringssti',
    imagePick: 'Søk og velg bilde til læringsstien',
    duration: 'Varighet',
    tags: 'Tagger',
    copy: 'Kopi',
    isBasedOn: 'basert på ',
    isBasedOnPath: 'en annen læringssti',
    copyright: {
      license: 'Lisens',
      contributors: 'Forfattere',
    },
    image: {
      title: 'Illustrerende bilde',
      changeImage: 'Bytt bilde',
      copyright: 'Lisens',
      authors: 'Opphav',
      tags: 'Tagger',
      searchAndChose: 'Søk og velg bilde til læringsstien',
      search: 'Bildesøk',
      searchPlaceholder: 'Søk og finn passende bilde',
      choseImage: 'Bruk bildet',
      imageInformation: 'Bildet blir synlig i søk på læringssti.',
      imageSearchTotalCount: 'Søk på "%{textQuery}" ga %{totalCount} resulater',
      imageSearchOneTotalCount: 'Søk på "%{textQuery}" ga 1 resulat',
    },
  },
  editPage: {
    learningpathShortDescriptionTitle: 'Introduksjon',
    savePathBtn: 'Lagre',
    addStepBtn: 'Legg til nytt læringssteg',
    shortDescriptionPlaceholder: 'Skriv en kort beskrivelse (max 150 tegn)',
    titlePlaceHolder: 'Skriv  tittel her',
    oneLineEditorDefaultPlaceholder: 'Skriv her',
    deletePathBtn: 'Slett',
    cancelBtn: 'Avbryt',
    saveDraft: 'Lagre som utkast',
    saveAndPublish: 'Lagre og publiser',
    edit: 'Endre detaljer',
    publish: 'Publiser',
  },
  editPathStep: {
    urlLabel: 'Lim inn lenke (URL) fra ndla.no eller youtube.com',
    mediatype: {
      introduction: 'Introduksjon',
      text: 'Tekst',
      multimedia: 'Multimedia',
      quiz: 'Quiz',
      task: 'Oppgave',
      summary: 'Oppsummering',
    },
    validation: {
      oneOfDescriptionOrUrlIsRequired: 'Enten Beskrivelse eller Url feltet må fylles ut.',
    },
    edit: 'Rediger læringssteg',
    urlPlaceholder: 'Lim inn lenke',
    stepDescriptionPlaceholder: 'Skriv en beskrivelse her',
    titlePlaceHolder: 'Skriv en tittel her',
    previewOembed: 'Forhåndsvis hele artikkelen',
    noLicenseChosen: 'Ingen lisens valgt',
  },
  sortSteps: {
    sortOrDelete: 'Sorter eller slett læringssteg',
    finish: 'Lagre sortering',
    cancel: 'Avbryt',
  },
  siteNav: {
    login: 'Logg inn',
    search: 'Finn læringssti',
    myPage: 'Mine læringsstier',
    logout: 'Logg ut %{name}',
  },
  footer: {
    aboutNDLA: 'Om NDLA',
    aboutLearningPath: 'Om læringsstier',
    privacy: 'Personvern',
    feedback: 'Tilbakemelding',
    footerInfo: 'Nettstedet er utarbeidet av NDLA som åpen kildekode.',
    footerEditiorInChief: 'Ansvarlig redaktør: ',
    footerManagingEditor: 'Utgaveansvarlig: ',
    selectLanguage: 'Velg språk (language): ',
  },
  duration: {
    zero: 'Ukjent lengde',
    hours: '%{smart_count} time |||| %{smart_count} timer',
    minutes: '%{smart_count} minutt |||| %{smart_count} minutter',
  },
  createLearningPath: {
    createdMsg: 'Lagret OK',
    createNew: 'Opprett ny læringssti',
    title: 'Tittel',
    description: 'Beskrivelse',
    descriptionPlaceholder: 'Skriv en kort beskrivelse av læringsstien.',
    descriptionMaxLength: 'Max 150 tegn',
    createButton: 'Opprett ny læringssti',
  },
  copyLearningPath: {
    makeCopy: 'Lag kopi',
    copyText: 'Ønsker du å ta utgangspunkt i denne læringsstien for å lage en ny læringssti? Vi åpner en kopi og blir lagret sammen med dine andre læringsstier.',
    createCopy: 'Kopier læringssti',
    abortCopy: 'Avbryt',
    copyTitle: 'Kopier annens læringssti',
    copy: 'KOPI: ',
    copiedMessage: 'Læringssti kopiert.',
  },
  learningPathStep: {
    messages: {
      delete: {
        title: 'Slettet «%{stepTitle}»',
        action: 'Angre',
      },
    },
    license: 'Lisens: %{license}',
  },
  updateLearningPath: {
    updatedMsg: 'Lagret OK',
  },
  tagInput: {
    createNew: 'Opprett ny tag',
    emptyList: 'Det er ingen tagger i denne listen',
    emptyFilter: 'Fant ingen passende tagger',
  },
  copyrightInput: {
    createNew: 'Opprett ny bidragsyter',
    emptyFilter: 'Ingen bidragsytere funnet. Legg derfor til bidragsyter',
  },
  updateLearningPathStatus: {
    updateStatusMsg: 'Oppdatert status OK',
  },
  htmlTitleTemplates: {
    learningPathStep: '%{title} (Læringssti fra NDLA.no)',
  },
  validation: {
    required: 'Feltet er påkrevd.',
    integer: 'Må være et tall.',
    max: 'Må ikke være mer enn maks %{max} tegn.',
    min: 'Må bestå av minst %{min} tegn.',
    oembed: 'Feltet har en ugyldig url.',
  },
  errors: {
    title: 'Tittel mangler.',
    description: 'Beskrivelse mangler.',
    duration: 'Mangler varighet.',
    durationMinus: 'Varighet må være større en null.',
    durationNaN: 'Ugyldig variget. Tast inn antall timer.',
    durationDecimals: 'Antall desimaler er maks to.',
  },
  ltiSearch: {
    ltiAdded: 'LTI Ressurs er lagret',
  },
  embedSearch: {
    form: {
      title: 'Legg til innhold fra ekstern kilde',
      placeholder: 'Søk og finn kilde',
      allFilter: 'Alle',
    },
    results: {
      noResults: 'Ingen resultater funnet',
      useInPath: 'Bruk i læringsstien',
      preview: 'Forhåndvis',
    },
    preview: {
      title: 'Forhåndsvisning av oembed',
      error: 'En feil har oppstått.',
    },
    button: 'Søk i NDLA',
  },
  pintrest: {
    importFrom: 'Hent læringssteg fra Pintrest',
    lightbox: {
      heading: 'Hent læringssteg fra Pintrest',
    },
    form: {
      placeholder: 'brukernavn/tavlenavn',
      submit: 'Hent pins',
    },
    pinForm: {
      create: 'Opprett læringssteg',
      viewSource: 'Se kilde lenke',
    },
  },
  htmlStatus: {
    notFound: 'Denne siden finnes ikke',
    forbidden: 'Du har ikke tilgang til denne siden',
    backToFrontpage: 'Tilbake til forsiden',
  },
};

export default phrases;
