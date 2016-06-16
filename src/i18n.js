import Polyglot from 'node-polyglot';

const phrases = {
  searchForm: {
    placeholder: 'Søk etter læringsstier',
    btn: 'Søk',
    order: {
      relevance: 'Relevans',
      newest: 'Nyeste',
      oldest: 'Eldste',
      longest: 'Lengste',
      shortest: 'Korteste',
      title: 'Alfabetisk'
    }
  },
  loginFailure: {
    errorMessage: 'Beklager. Innlogging feilet.',
    loginLink: 'Logg inn'
  },
  loginProviders: {
    description: 'Logg inn i NDLA med'
  },
  logo: {
    altText: 'Nasjonal digital læringsarena'
  },
  myPage: {
    order: {
      title: 'Alfabetisk',
      newest: 'Nyeste',
      oldest: 'Eldste',
      status: 'Publisert'
    },
    pageHeader: 'Mine læringsstier',
    newBtn: 'Opprett ny læringssti',
    path: {
      duration: 'Varighet',
      status: 'Synlighet',
      statusValue: {
        PRIVATE: 'Privat',
        PUBLISHED: 'Søkbar',
        NOT_LISTED: 'Åpen'
      }
    }
  },
  pathDropDown: {
    publish: 'Publiser',
    unpublish: 'Gjør privat',
    delete: 'Slett',
    makeCopy: 'Lag kopi'
  },
  requireAuthentication: {
    errorMessage: 'Denne siden krever innlogging.'
  },
  welcomePage: {
    placeholder: 'Søk etter læringsstier',
    title1: 'Læringsstier',
    title2: 'Nasjonal digital læringsarena',
    explanationBtn: 'Hva er en læringssti?',
    newBtn: 'Lag din egen læringssti',
    searchBtn: 'Søk',
    feature1Title: 'Enklere å følge',
    feature2Title: 'Enda enklere å følge',
    feature1Content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
    Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.`,
    feature2Content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
    Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.`
  },
  learningPath: {
    pageName: 'Læringstidetaljer',
    previous: 'Forrige',
    next: 'Neste',
    description: 'Beskrivelse',
    descriptionPlaceholder: 'Skriv en kort beskrivelse av læringsstien.',
    descriptionInformation: 'Maks 150 tegn og du har %{remainingDescriptionLength} igen. Beskrivelsen blir synlig i søk.',
    title: 'Tittel på læringssti',
    image: 'Illustrerende bilde',
    imagePick: 'Søk og velg bilde til læringsstien',
    duration: 'Varighet',
    tags: 'Tagger',
    imageInformation: 'Bildet blir synlig i søk på læringssti.'
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
    publish: 'Publiser'
  },
  editPathStep: {
    urlLabel: 'Lim inn lenke (URL) fra ndla.no eller youtube.com',
    mediatype: {
      introduction: 'Introduksjon',
      text: 'Tekst',
      multimedia: 'Multimedia',
      quiz: 'Quiz',
      task: 'Oppgave',
      summary: 'Oppsummering'
    },
    validation: {
      oneOfDescriptionOrUrlIsRequired: 'Enten Beskrivelse eller Url feltet må fylles ut.'
    },
    mediatypeTitle: 'Velg innholdstype',
    mediatypeInformation: 'Hvilket type innhold skal læringssteget inneholde?',
    edit: 'Rediger læringssteg',
    urlPlaceholder: 'Lim inn lenke',
    stepDescriptionPlaceholder: 'Skriv en beskrivelse her',
    titlePlaceHolder: 'Skriv en tittel her',
    previewOembed: 'Forhåndsvis hele artikkelen'
  },
  sortSteps: {
    sortOrDelete: 'Sorter eller slett læringssteg',
    finish: 'Lagre sortering',
    cancel: 'Avbryt'
  },
  siteNav: {
    login: 'Logg inn',
    search: 'Finn læringssti',
    myPage: 'Mine læringsstier',
    logout: 'Logg ut %{name}'
  },
  footer: {
    aboutNDLA: 'Om NDLA',
    aboutLearningPath: 'Om læringsstier',
    privacy: 'Personvern',
    feedback: 'Tilbakemelding',
    footerInfo: 'Nettstedet er utarbeidet av NDLA som åpen kildekode.',
    footerEditior: 'Ansvarlig redaktør: ',
    footerIssueResponsible: 'Utgaveansvarlig: '

  },
  duration: {
    zero: 'Ukjent lengde',
    hours: '%{smart_count} time |||| %{smart_count} timer',
    minutes: '%{smart_count} minutt |||| %{smart_count} minutter'
  },
  createLearningPath: {
    createdMsg: 'Lagret OK',
    createNew: 'Opprett ny læringssti',
    title: 'Tittel',
    description: 'Beskrivelse',
    descriptionPlaceholder: 'Skriv en kort beskrivelse av læringsstien.',
    descriptionMaxLength: 'Max 150 tegn',
    createButton: 'Opprett ny læringssti'
  },
  copyLearningPath: {
    makeCopy: 'Lag kopi',
    copyText: 'Ønsker du å ta utgangspunkt i denne læringsstien for å lage en ny læringssti? Vi åpner en kopi og blir lagret sammen med dine andre læringsstier.',
    createCopy: 'Kopier læringssti',
    abortCopy: 'Avbryt',
    copyTitle: 'Kopier annens læringssti',
    copy: 'KOPI: ',
    copiedMessage: 'Læringssti kopiert.'
  },
  updateLearningPath: {
    updatedMsg: 'Lagret OK'
  },
  tagInput: {
    createNew: 'Opprett ny tag',
    emptyList: 'Det er ingen tagger i denne listen',
    emptyFilter: 'Fant ingen passende tagger'
  },
  updateLearningPathStatus: {
    updateStatusMsg: 'Oppdatert status OK'
  },
  htmlTitleTemplates: {
    learningPathStep: '%{title} (Læringssti fra NDLA.no)'
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
    durationDecimals: 'Antall desimaler er maks to.'
  }
};

export default new Polyglot({ locale: 'no', phrases });
