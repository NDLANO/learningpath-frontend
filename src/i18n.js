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
    errormessage: 'Beklager. Innlogging feilet.',
    login: 'Logg inn'
  },
  loginProviders: {
    description: 'Logg inn i NDLA med'
  },
  logo: {
    altText: 'Nasjonal digital læringsarena'
  }
};

export default new Polyglot({ locale: 'no_NB', phrases });
