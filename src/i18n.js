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
    lastUpdated: 'Sist endret',
    order: {
      title: 'Tittel',
      lastUpdated: 'Dato',
      status: 'Status'
    },
    pageHeader: 'Mine læringsstier',
    newBtn: 'Opprett ny læringssti'
  },
  requireAuthentication: {
    errorMessage: 'Denne siden krever innlogging.'
  },
  welcomePage: {
    title1: 'Læringsstier',
    title2: 'Nasjonal digital læringsarena',
    explanationBtn: 'Hva er en læringssti?',
    newBtn: 'Lag din egen læringssti'
  },
  editPage: {
    learningpathShortDescriptionTitle: 'Introduksjon',
    savePathBtn: 'Lagre',
    addStepBtn: 'Legg til nytt læringssteg'
  },
  editPathStep: {
    urlLabel: 'Lim in lenke (URL) fra ndla.no eller youtube.com',
    mediatype: {
      introduction: 'Introduksjon',
      text: 'Tekst',
      multimedia: 'Multimedia',
      quiz: 'Quiz',
      task: 'Oppgave',
      summary: 'Oppsummering'
    }
  },
  siteNav: {
    login: 'Logg inn',
    search: 'Finn læringssti',
    myPage: 'Mine læringsstier',
    logout: 'Logg ut %{name}'
  }
};

export default new Polyglot({ locale: 'no_NB', phrases });
