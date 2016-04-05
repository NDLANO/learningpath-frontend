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
  }
};

export default new Polyglot({ locale: 'no_NB', phrases });
