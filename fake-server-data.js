var data = module.exports = {};

function generatePrivate (count) {
  var paths = [];

  for (var i=0; i<count; i++) {
    paths.push(Object.assign({}, {'title':[{'title':'Kristofers private bokmål','language':'nb'},{'title':'Kristofers private nynorsk','language':'nn'},{'title':'Kristofers private english','language':'en'}],'description':[{'description':'Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden. Kurset fokuserer på kunst og kultur på et verdensperspektiv.','language':'nb'},{'description':'Kurset dekker innføring og vil gje deg grunnleggjande forståing for vanlege omgrep i kunst og kultur verda. Kurset fokuserer på kunst og kultur på eit verdsperspektiv.','language':'nn'},{'description':'The course covers the introduction and will give you a basic understanding of common concepts in the arts world. The course focuses on art and culture in a world perspective','language':'en'}],'metaUrl':'http://api.test.ndla.no/learningpaths/private/4','coverPhotoUrl':'http://api.ndla.no/images/full/sy2fe75b.jpg','duration':1080,'status':'PRIVATE','lastUpdated':'2016-02-02T10:44:06Z','author':{'type':'Forfatter','name':'TODO:Hent fra Auth'}, 'learningsteps':[ {'id':7, 'seqNo':1, 'title':[ {'title':'Tittel her', 'language':'nb' }], 'description':[ {'description':'Beskrivelse', 'language':'nb' }], 'embedUrl':[ {'url':'http://www.vg.no', 'language':'nb' }], 'type':'TEXT', 'license':'by-nc-sa', 'metaUrl':'http://api.test.ndla.no/learningpaths/private/4/learningsteps/7' }, {'id':8, 'seqNo':2, 'title':[ {'title':'En annen tittel her', 'language':'nb' }], 'description':[ {'description':'Beskrivelse', 'language':'nb' }], 'embedUrl':[ {'url':'http://www.vg.no', 'language':'nb' }], 'type':'TEXT', 'metaUrl':'http://api.test.ndla.no/learningpaths/private/4/learningsteps/8' }]},
          { id: 1+i }
          ));
  }
  return paths;
}

data.private = generatePrivate(3);

data.public = {'totalCount':150,'page':1,'pageSize':10,'results':[{'id':1,'title':[{'title':'Abap er et artig programmeringsspråk','language':'nb'},{'title':'Accent er et artig programmeringsspråk','language':'nn'},{'title':'Agda er et artig programmeringsspråk','language':'en'}],'description':[{'description':'Kurset dekker språket Alice.','language':'nb'},{'description':'Kurset dekker språket Argus.','language':'nn'},{'description':'The course covers the language Ada.','language':'en'}],'metaUrl':'http://api.test.ndla.no/learningpaths/1','coverPhotoUrl':'http://api.ndla.no/images/full/sy2fe75b.jpg','duration':120,'status':'PUBLISHED','lastUpdated':'2016-02-09T07:57:42Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':56,'title':[{'title':'Belastninger på borestrengen','language':'nb'}],'description':[{'description':'I borefasen er det viktig at borestrengen virker med vekt på borekronen (WOB). Det fungerer som kompresjonskraft i borestrengens nederste del. I øvre del av borestrengen er det strekkraft som virker for å holde strengen på overflaten. I tillegg utsettes strengen for vridning og friksjonskrefter.     I emnet  belastninger på borestrengen  ser vi på hvordan borestrengen utsettes for strekk- og kompresjonskrefter i brønnen. For å unngå boreforsinkelser og store tap av verdier er det viktig at vi har beregnet grenseverdiene i utstyret vi skal bruke slik at vi unngår overbelastning.  Vi bruker DDH som oppslagsverktøy til oppgavene.     Forkunnskaper  Du bør kjenne til de vanligste borestrengsoppbygningene (BHA). Du bør forstå forholdet mellom tverrsnittareal, ytre diameter (OD) og indre diameter (ID) i et rør, og forstå at tverrsnittarealet i røret påvirker vekten av røret.    Hovedmålet i dette emnet er at du kjenner til kreftene som virker på en borestreng og hvordan boreframdriften kan forbedres ved hjelp av riktig antall vektrør og riktig vekt på borekronen. Du skal også kjenne til begrensningene i BHA og borestrengen og beregne at du er innenfor grenseverdien.    Læringsmål/delmål   Du skal beskrive de ulike belastningstypene som virker på borestrengen i brønnoperasjoner.  Du skal beregne antall vektrør som er nødvendig for å få riktig vekt på borekronen (formelbruk).  Du skal beregne  Margin of Overpull  og forklare hva denne grenseverdien brukes til.   Undervisningen bør fylles ut med flere oppgaver for beregning av WOB, nødvendig antall vektrør i BHA og  Margin of Overpull  slik at eleven blir trent i detaljene.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/56','duration':150,'status':'PUBLISHED','lastUpdated':'2015-08-27T04:36:00Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':2,'title':[{'title':'Bertrand er et artig programmeringsspråk','language':'nb'},{'title':'Beta er et artig programmeringsspråk','language':'nn'},{'title':'Bigwig er et artig programmeringsspråk','language':'en'}],'description':[{'description':'Kurset dekker språket Bistro.','language':'nb'},{'description':'Kurset dekker språket Bliss.','language':'nn'},{'description':'The course covers the language Blue.','language':'en'}],'metaUrl':'http://api.test.ndla.no/learningpaths/2','coverPhotoUrl':'http://api.ndla.no/images/full/sy2fe75b.jpg','duration':240,'status':'PUBLISHED','lastUpdated':'2016-02-09T07:57:42Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':55,'title':[{'title':'Boreproblemer','language':'nb'}],'description':[{'description':'I emnet  boreproblem  ser vi på ulike årsaker til forsinkelser og stopp i borefasen og hvordan noen av disse problemene kan unngås eller korrigeres med god forståelse av formasjonen vi borer i og observasjon underveis i operasjonen.    Dersom det har oppstått et problem, må man vite hvilke krefter som skal til for å frigjøre borestrengen eller hvilket utstyr som må benyttes for å gjennomføre en fiskeoperasjon.    Forkunnskaper  Du bør kjenne til de vanligste borestrengsoppbygningene (BHA) og forstå hvordan vi opprettholder trykkontroll i en brønn ved hjelp av hydrostatisk trykk. Du bør kjenne til ulike typer geologiske formasjoner og deres spesielle egenskaper og svakheter.   Hovedmålet i dette emnet er at du skal bli kjent med mulighetene for at boreproblemer oppstår og hvordan det håndteres i forkant eller i ettertid. Mye av innholdet i dette emnet er fordypningsmateriale som kan brukes til prosjekt til fordypning og vg3 Boreoperatør.    Læringsmål/delmål   Du skal kjenne til noen typer boreproblem og årsaken til disse.  Du skal kjenne til noen metoder som brukes for å hindre boreproblemer eller som brukes for å korrigere situasjonen etter at den har oppstått.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/55','duration':150,'status':'PUBLISHED','lastUpdated':'2015-08-24T11:07:35Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':64,'title':[{'title':'Bottom Hole Assembly - BHA','language':'nb'}],'description':[{'description':'Uttrykket Bottom Hole Assembly (BHA) omfatter alt utstyr som brukes i en arbeidsstreng i brønnen. Det kan være både for vertikal boring, retningsboring, logging, brønntesting, komplettering og brønnservice. Felles for BHA er at det er den delen av arbeidsstrengen som har andre funksjoner enn bare å lede utstyr inn og ut av brønnen, slik som f.eks. borerør (Drillpipe), kabel (Wireline) eller kveilerør (Coiled Tubing). I emnet Bottom Hole Assembly &ndash; BHA ser vi nærmere på utstyr som brukes til boring, både vanlig boring og retningsboring.  Forkortelsen  BHA  er vanlig å bruke i skriftlig form og er allment kjent i oljeindustrien over hele verden. Det er vanligere å uttale BHA som &quot;Bottom Hole Assembly&quot;    Læringsmål     Lav måloppnåelse:   Gjøre rede for de enkelte komponentene i riktig rekkefølge, beskrive verktøyets formål i BHA.   Middels måloppnåelse (lav pluss følgende):   Forklare komponentenes oppbygning, virkemåte og bruksområde.   Høy måloppnåelse (lav og middels pluss følgende):   Forklare hvordan man kan oppnå vinkelendringer i brønnbanen og datainnsamling fra MWD og LWD.    For læreren    I dette emnet har vi lagt inn en del animasjoner som viser hvordan boring gjennomføres med retningsendring underveis.  I emnet BHA er det sentralt at elevene forstår hvilken oppgave de ulike komponentene har i BHA og hvordan boring kan gjennomføres med brønnbaneendring og logging underveis.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/64','duration':180,'status':'PUBLISHED','lastUpdated':'2015-10-05T10:44:53Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':65,'title':[{'title':'Dorothe Engelbretsdotter og «Siælens Sang-Offer»','language':'nb'}],'description':[{'description':'Etter å ha fulgt denne læringsstien skal du:   ha kjennskap til Norges første kvinnelige forfatter  ha kjennskap til noen sentrale tekster av Dorothe Engelbretsdotter  ha lest og lyttet til utdrag fra  Siælens Sang-Offer   ha trent på å kommentere form og innhold i tekster fra  Siælens Sang-Offer   kunne sette tekster av Dorothe Engelbretsdotter inn i en kulturhistorisk sammenheng','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/65','duration':180,'status':'PUBLISHED','lastUpdated':'2015-10-14T11:17:19Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':60,'title':[{'title':'HMS i boremodulen','language':'nb'}],'description':[{'description':'Sikkerhet i boremodulen er et fokusområde for alle som har ansvar for operasjon og drift offshore. Boremodulen er et relativt lite område, men det har høy aktivitet med store, tunge komponenter som er i bevegelse både horisontalt og vertikalt.  I boremodulen finner vi både boredekk, slamrom og pumperom. Alle områdene er krevende arbeidsplasser for de som jobber der. Pumperommet er et støyområde og slamrommet er et risiko-område for fuktighet og varme, kjemisk reaksjon og allergier.  På boredekk er det særlig fallende gjenstander og klemfare på grunn av alle de bevegelige komponentene som er utfordrende. Vi skal bli kjent med regelverket for rød sone på boredekk og arbeid med og på bevegelig utstyr. Vi skal også se på regler for fjernoperert rørhåndteringsutstyr og få innsikt i hvorfor dette er et krav.  Analyser av arbeidsmiljø viser at de fleste uhell og ulykker oppstår når reglene IKKE følges. Vi ønsker derfor at alle som skal jobbe offshore får en innsikt i hvor viktig regelverk, prosedyrer og gode holdninger er i arbeidshverdagen.      Hovedmål i emnet    De fleste som utdanner seg til brønntekniker vil ha arbeidsoppgaver som skal utføres på eller ved boremodulen. Det er derfor særdeles viktig at du forstår hvor viktig regelverket er i forbindelse med egen og andres sikkerhet. Hovedmålet i dette emnet er at du skal kunne vise til forståelse for og gode holdninger til relevante regelverk og prosedyrer, og kunne begrunne hvorfor disse er risiko-reduserende for arbeiderne i boremodulen.      Læringsmål/delmål     Du skal gjøre rede for reglene som gjelder for rød sone på boredekk  Du skal gjenkjenne farlige situasjoner som kan oppstå som følge av arbeid på og med bevegelig utstyr, og beskrive hvilke sikringstiltak som er tatt i bruk for å hindre faresituasjonene  Du skal vurdere hvilke konsekvenser faresituasjoner kan medføre for mennesker, utstyr og ytre miljø       Tips til undervisningen    Bruk videoer og animasjoner av ulike aktiviteter offshore og diskuter hva som kunne ha skjedd.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/60','duration':180,'status':'PUBLISHED','lastUpdated':'2015-09-28T08:53:07Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':68,'title':[{'title':'Heltedikt og gudedikt','language':'nb'}],'description':[{'description':'Når du har jobbet med denne læringsstien, skal du:   vite hva som kjennetegner et heltedikt  ha kjennskap til tyske, franske og gammelengelske nasjonalepos  ha kjennskap til heltedikt og gudedikt i norrøn litteratur  ha øvd på å dramatisere ei mytisk fortelling og gitt tilbakemelding på andres muntlige prestasjoner  ha funnet sammenhenger mellom fortellemåter og verdier i gamle helte- og gudedikt og fortellemåter og verdier i tekster fra vår egen tid  ha skrevet en strukturert tekst','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/68','duration':300,'status':'PUBLISHED','lastUpdated':'2015-11-10T13:42:15Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':53,'title':[{'title':'Hovedsystem slam','language':'nb'}],'description':[{'description':'Slamsystemet om bord brukes til å mikse, sirkulere og rense borevæsken som brukes til boring. Deler av utstyret kan også brukes til kompletteringsvæsker i kompletteringsfasen.     I emnet  Slamsystem  får du innsikt i prosessen for miksing av slam og sirkulasjonssløyfen slammet går gjennom; fra tank til brønn, til rensesystemet og tilbake til tank. Du blir også kjent med utstyret som brukes på miksestasjon, tankene, pumper og rensesystem.    Hovedmålet i dette emnet er at du kjenner til utstyret som brukes til slammiksing, sirkulasjon og rensing, og kan beskrive sirkulasjonssløyfen i riktig rekkefølge. Du bør reflektere over helse og miljø i forbindelse med slamhåndtering og støy.    Forkunnskaper  Du bør forstå sammenhengen mellom slam i brønnen og brønnkontroll.    Læringsmål/delmål   Du skal navngi hovedkomponentene i sirkulasjonssløyfen.  Du skal beskrive komponentenes oppgave og plassering i rensesystemet.  Du skal forklare slampumpens virkemåte.  Du skal vurdere helse- og miljøfarer i forbindelse med arbeid med slam og sirkulasjonssystemet.   Til fordypning/FYR er det lagt inn lenke til Wikipedia med detaljer om  shale shaker  på engelsk.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/53','duration':90,'status':'PUBLISHED','lastUpdated':'2015-08-24T06:16:39Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':54,'title':[{'title':'Hovedsystem stigerør','language':'nb'}],'description':[{'description':'Stigerøret er en rørforbindelse mellom riggen og brønnen og brukes i bore- og brønnservice-arbeid. Stigerør er fleksible i vertikal og horisontal retning og gjør det mulig å sirkulere væsker i brønnen uten å skade det ytre miljø.     I emnet  stigerørsystem  ser vi nærmere på oppbygning, virkemåte og hensikt med stigerøret og komponentene det består av.  Hovedmålet i dette emnet er at du kjenner til stigerørsystemets hensikt og komponenter og kan forklare hvordan stigerøret er en sentral enhet i brønnkontroll.    Læringsmål/delmål   Du skal navngi komponentene i stigerøret og plassere komponentene på riktig sted i systemet.  Du skal beskrive komponentenes oppgave i stigerøret.  Du skal forklare hvordan stigerør kobles til og fra brønnen.  Du skal forklare horisontal og vertikal bevegelseskompensering og komponentenes virkemåte for dette.  Du skal vurdere virkning for brønnkontroll og hullrensing ved bruk av boosterlinje i riseren.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/54','duration':180,'status':'PUBLISHED','lastUpdated':'2015-08-24T08:38:22Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':63,'title':[{'title':'Kurs som er inkludert i HMS-faget','language':'nb'}],'description':[{'description':'I HMS-faget er det lagt inn flere  kurs som er obligatoriske . Kursene gir kompetanse til å reise offshore og operere traverskran og bruke VHF/SRC-radio.      Læringsmål      Grunnleggende sikkerhetsopplæring skal være bestått.  VHF-kurs skal være godkjent.  Teoridelen av traverskran- og stroppekurs skal være godkjent.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/63','duration':300,'status':'PUBLISHED','lastUpdated':'2015-10-05T10:22:31Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':52,'title':[{'title':'Lager og leveranse','language':'nb'}],'description':[{'description':'Emnet  Lager og leveranse  beskriver lagerceller, lastebøyer og de omfattende rørsystemene for ilandføring av gass fra norsk sokkel. Gass som komprimeres først, leveres til Norge og Storbritannia, og det europeiske kontinentet.    Det er flere ulike rørtyper og leggemetoder, og alle rørledninger må sjekkes og vedlikeholdes jevnlig for å unngå stans i leveransen som Norge er forpliktet til gjennom avtaler med utenlandske mottakere.  Noen felt har også lastebøyer og tanker om bord i installasjonene. Tankene brukes som mellomlager for olje, og oljen blir ilandført av tankskip som går i fast trafikk.    Hovedmålet i dette emnet er at du kjenner til lager- og rørsystemene som bidrar til leveranse av olje og gass, samt klargjøring, drift og vedlikehold av disse. Du bør også være kjent med miljøkonsekvenser som er rapportert i forbindelse med lagring og transport av hydrokarboner.    Læringsmål/delmål  Rørsystemer på havbunnen og lagersystemer offshore   Du skal skille mellom ulike rørsystemer og oppgavene de har.  Du skal beskrive ulike metoder som brukes for å legge rørledning på havbunnen.  Du skal beskrive systemer for lagerbøyer, lagertanker og transport offshore.  Du skal forklare hvordan og hvorfor rørsystemene vedlikeholdes og kalibreres.  Du skal vurdere utslippshistorie og vernetiltak mot forurensning.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/52','duration':210,'status':'PUBLISHED','lastUpdated':'2015-06-17T10:56:51Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':61,'title':[{'title':'Oppmerksomhetskrevende arbeid','language':'nb'}],'description':[{'description':'I emnet  oppmerksomhetskrevende arbeid  ser vi på hva som kan skje når vi ikke følger etablerte prosedyrer. Vi skal også se på muligheten for  indirekte  konsekvenser av det arbeidet vi utfører.  Offshore kan konsekvensene av uoppmerksomhet bli katastrofale. Vi må derfor etablere gode holdninger til prosedyrer og regler, og forstå hvorfor disse er så viktige.     Hovedmål i emnet    Hovedmålet i dette emnet er at du kan redegjøre for de prosedyrer og regler som gjelder for oppmerksomhetskrevende arbeid offshore, kunne planlegge og dokumentere et arbeidsoppdrag ut fra gjeldende regelverk og reflektere over risiko og konsekvens ved brudd på prosedyre.     Læringsmål/delmål     Du skal beskrive planlegging, forberedelse og nødvendig dokumentasjon for jobben  Du skal beskrive farlige situasjoner som kan oppstå som følge av arbeidet, og hvilke sikringstiltak som er tatt i bruk for å hindre faresituasjonene  Du skal forklare hvilke konsekvenser faresituasjonene kan medføre for mennesker, utstyr og miljø.      Tips til undervisningen    I dette emnet er det flere lenker til oppslagsverk og animasjoner med interaktivitet. Emnet er godt egnet til samspill/rollespill i klassen.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/61','duration':180,'status':'PUBLISHED','lastUpdated':'2015-09-28T10:43:35Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':69,'title':[{'title':'Sagaen om Gunnlaug Ormstunge','language':'nb'}],'description':[{'description':'Når du har gjennomgått denne læringsstien, skal du:   ha kjennskap til islandske ættesagaer  ha lest sagaen om Gunnlaug Ormstunge  kjenne igjen typiske trekk ved sagalitteraturen i det du ha lest  ha øvd på å dramatisere eller filmatisere en scene fra en ættesaga  kunne se sammenhenger mellom verdisynet i ættesagaene og verdisynet i tekster fra vår egen tid  ha øvd på å skrive korte, strukturerte tekster','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/69','duration':600,'status':'PUBLISHED','lastUpdated':'2015-11-12T14:33:11Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':66,'title':[{'title':'Salmelitteraturen i barokken','language':'nb'}],'description':[{'description':'Etter å ha fulgt denne læringsstien skal du:   ha kjennskap til salmedikterne Thomas Kingo og Martin Luther  ha kjennskap til noen sentrale tekster av disse forfatterne  ha trent på å kommentere form og innhold i salmer fra barokken, og kunne sette disse inn i en kulturhistorisk sammenheng  ha trent på å se forskjeller mellom skriftspråket på 1600-tallet og 1800-tallet, og mellom norsk og dansk skriftspråk','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/66','duration':120,'status':'PUBLISHED','lastUpdated':'2015-10-27T16:52:32Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':59,'title':[{'title':'Skjema for planlegging, analyse og rapportering','language':'nb'}],'description':[{'description':'I emnet  planlegging, analyse og rapportering offshore  får du innsikt i systemene som brukes for arbeidstillatelse, sikker jobbanalyse og risikovurdering av jobben som skal utføres offshore. Vi ser også på hvordan man skal oppføre seg om det oppstår en uønsket hendelse.  Det er viktig at du forstår at planlegging og dokumentasjonskrav er tiltak som brukes for å redusere risiko i aktivitetene som utføres offshore.  Det er viktig at du klarer å ta i bruk dokumentasjonsverktøy og analyseverktøy i forhold til vanlige og relevante arbeidsoppgaver som utføres offshore. Du må også kjenne til krav og begrensninger for de ulike dokumentasjonstypene, som f.eks. hvilket AT-nivå som er relevant for arbeidsoppdraget, varighet på AT, vurdere og gjennomføre SJA, ansvarsfordeling og avslutning av arbeidsoppdrag.   Sentrale dokumenter i dette emnet er:   AO &ndash; arbeidsoppdrag/arbeidsordre  AT &ndash; arbeidstillatelse  SJA &ndash; sikker jobb analyse  RUH &ndash; rapport uønsket hendelse  Risikomatrise      Læringsmål/delmål     Du skal kunne fylle ut SJA og bruke denne til gjennomgang av arbeidsoppdrag med andre  Du skal forklare hensikten med RUH/stoppkort  Du skal beskrive reglene for bruk av AT  Du skal vurdere hvilken AT som er riktig for et arbeidsoppdrag  Du skal bruke risikovurdering, fylle ut SJA og AT for et arbeidsoppdrag  Du skal skrive en sluttrapport om et arbeidsoppdrag  Du skal vurdere om tiltak som foreslås vil redusere risiko      Tips til undervisningen    En fin tilnærming til emnet er å lage rollespill der elevene kan få ulike oppdrag på &quot;riggen&quot; i klasserommet. Del elevene opp i ulike fag-grupper og ledelse for områdene. Oppdrag kan velges fra innholdet i tekstene i brønnfag eller fra beskrivelser i HMS-faget. Elevene skal vurdere hvilke aktiviteter som utelukker hverandre og hvilke dokumenter som skal fylles ut. Presentasjon av AT/SJA for klassen gjennomføres på samme måte som et pre-jobb-møte offshore.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/59','duration':180,'status':'PUBLISHED','lastUpdated':'2015-09-28T07:13:29Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':70,'title':[{'title':'Snorres kongesagaer','language':'nb'}],'description':[{'description':'Når du har jobbet med denne læringsstien, skal du   ha kjennskap til Snorre Sturlason, og til  Snorres kongesagaer   ha kjennskap til Olav Haraldsson som historisk person, og til  Olav den helliges saga   ha lest og lyttet til utdrag fra  Olav den helliges saga , og kunne identifisere typiske trekk ved språkbruk og fortellemåte  ha kjennskap til den katolske Olav-kultusen, og kunne sammenligne beretninger om Olav den hellige med beretninger om martyrer fra vår tid','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/70','duration':600,'status':'PUBLISHED','lastUpdated':'2015-11-29T18:40:07Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':67,'title':[{'title':'Temaoppgaver: Mellom himmel og jord','language':'nb'}],'description':[{'description':'Etter å ha fulgt denne læringsstien skal du:   ha kjennskap til tenkemåter i perioden 1600&ndash;1750 og kunne sette dem inn i en kulturhistorisk sammenheng  ha kjennskap til særtrekk ved barokk kunst og kjenne igjen barokke uttrykk i bilder og tekster frå vår egen tid  ha øvd på å presentere et faglig tema for klassen ved hjelp av digitale verktøy  ha øvd på å skrive kortsvar og lengre personlige tekster','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/67','duration':300,'status':'PUBLISHED','lastUpdated':'2015-10-30T13:46:18Z','author':{'type':'Forfatter','name':'Not yet implemented'}},{'id':62,'title':[{'title':'Vanskelig arbeidsplass','language':'nb'}],'description':[{'description':'I emnet  vanskelig arbeidsplass  ser vi nærmere på kompliserte arbeidssituasjoner og hvordan man skal sikre seg selv og kolleger mot klem- og fallskader. Vi ser også på viktigheten av kameratsjekk og riktig bruk av sikringsutstyr.     Hovedmål i emnet    Hovedmålet i dette emnet er at du skal kunne redegjøre for de prosedyrer og regler som gjelder for kompliserte arbeidssituasjoner offshore, kunne planlegge og dokumentere et arbeidsoppdrag ut fra gjeldende regelverk og reflektere over risiko og konsekvens ved brudd på prosedyrene.     Læringsmål     Du skal gjøre rede for planlegging, forberedelse og nødvendig dokumentasjon for jobben  Du skal gjenkjenne farlige situasjoner som kan oppstå som følge av arbeidet, og hvilke sikringstiltak som er tatt i bruk for å hindre faresituasjonene  Du skal forklare hvilke konsekvenser faresituasjonene kan medføre for mennesker, utstyr og miljø      Tips til undervisningen    I dette emnet er det lenket til oppslagsverk og animasjoner med interaktivitet. Emnet er godt egnet til samspill/rollespill i klassen.','language':'nb'}],'metaUrl':'http://api.test.ndla.no/learningpaths/62','duration':180,'status':'PUBLISHED','lastUpdated':'2015-09-28T11:12:29Z','author':{'type':'Forfatter','name':'Not yet implemented'}}]};



[data.public.results, data.private].forEach(function (arr) {
  arr.unshift({
    id: 20,
    title: [
      {
        title: 'Snorres kongesagaer',
        language: 'nb'
      },
      {
        title: 'Snorres kongesoger',
        language: 'nn'
      }
    ],
    description: [
      {
        description: '<p>N&aring;r du har jobbet med denne l&aelig;ringsstien, skal du</p><ul><li>ha kjennskap til Snorre Sturlason, og til <em>Snorres kongesagaer</em></li><li>ha kjennskap til Olav Haraldsson som historisk person, og til <em>Olav den helliges saga</em></li><li>ha lest og lyttet til utdrag fra <em>Olav den helliges saga</em>, og kunne identifisere typiske trekk ved spr&aring;kbruk og fortellem&aring;te</li><li>ha kjennskap til den katolske Olav-kultusen, og kunne sammenligne beretninger om Olav den hellige med beretninger om martyrer fra v&aring;r tid</li></ul>',
        language: 'nb'
      },
      {
        description: '<p>N&aring;r du har jobba med denne l&aelig;ringsstien, skal du</p><ul><li>ha kjennskap til Snorre Sturlason, og til <em>Snorres kongesoger</em></li><li>ha kjennskap til Olav Haraldsson som historisk person, og til <em>Soga om Heilag-Olav</em></li><li>ha lese og lytta til utdrag fr&aring; <em>Soga om Heilag-Olav</em>, og kunne identifisere typiske trekk ved spr&aring;kbruk og forteljem&aring;te</li><li>ha kjennskap til den katolske Olav-kultusen, og kunne samanlikne forteljingar om Heilag-Olav med forteljingar om martyrar fr&aring; v&aring;r tid</li></ul>',
        language: 'nn'
      }
    ],
    metaUrl: 'http://api.test.ndla.no/learningpaths/20',
    learningsteps: [
      {
        id: 146,
        seqNo: 1,
        title: [
          {
            title: 'Snorres kongesagaer',
            language: 'nb'
          },
          {
            title: 'Snorres kongesoger',
            language: 'nn'
          }
        ],
        description: [],
        embedUrl: [
          {
            url: 'http://ndla.no/node/153053/oembed',
            language: 'nb'
          },
          {
            url: 'http://ndla.no/node/153194/oembed',
            language: 'nn'
          }
        ],
        type: 'TEXT',
        metaUrl: 'http://api.test.ndla.no/learningpaths/20/learningsteps/146'
      },
      {
        id: 147,
        seqNo: 2,
        title: [
          {
            title: 'Hva kan du  nå om Heimskringla?',
            language: 'nb'
          },
          {
            title: 'Kva kan du no om Heimskringla?',
            language: 'nn'
          }
        ],
        description: [],
        embedUrl: [
          {
            url: 'http://ndla.no/node/153133/oembed',
            language: 'nb'
          },
          {
            url: 'http://ndla.no/node/153186/oembed',
            language: 'nn'
          }
        ],
        type: 'QUIZ',
        metaUrl: 'http://api.test.ndla.no/learningpaths/20/learningsteps/147'
      },
      {
        id: 148,
        seqNo: 3,
        title: [
          {
            title: 'Oppgaver om Snorres kongesagaer',
            language: 'nb'
          },
          {
            title: 'Oppgåver om Snorres kongesoger',
            language: 'nn'
          }
        ],
        description: [],
        embedUrl: [
          {
            url: 'http://ndla.no/node/47946/oembed',
            language: 'nb'
          },
          {
            url: 'http://ndla.no/node/47962/oembed',
            language: 'nn'
          }
        ],
        type: 'TASK',
        metaUrl: 'http://api.test.ndla.no/learningpaths/20/learningsteps/148'
      },
      {
        id: 149,
        seqNo: 4,
        title: [
          {
            title: 'Olav den helliges saga ',
            language: 'nb'
          },
          {
            title: 'Soga om Olav den heilage',
            language: 'nn'
          }
        ],
        description: [],
        embedUrl: [
          {
            url: 'http://ndla.no/node/153072/oembed',
            language: 'nb'
          },
          {
            url: 'http://ndla.no/node/153195/oembed',
            language: 'nn'
          }
        ],
        type: 'TEXT',
        metaUrl: 'http://api.test.ndla.no/learningpaths/20/learningsteps/149'
      },
      {
        id: 150,
        seqNo: 5,
        title: [
          {
            title: 'Slaget på Stiklestad',
            language: 'nb'
          },
          {
            title: 'Slaget på Stiklestad',
            language: 'nn'
          }
        ],
        description: [],
        embedUrl: [
          {
            url: 'http://ndla.no/node/154660/oembed',
            language: 'nb'
          },
          {
            url: 'http://ndla.no/node/155122/oembed',
            language: 'nn'
          }
        ],
        type: 'TASK',
        metaUrl: 'http://api.test.ndla.no/learningpaths/20/learningsteps/150'
      },
      {
        id: 151,
        seqNo: 6,
        title: [
          {
            title: 'Fra hærfører til helgen',
            language: 'nb'
          },
          {
            title: 'Frå hærførar til helgen',
            language: 'nn'
          }
        ],
        description: [],
        embedUrl: [
          {
            url: 'http://ndla.no/node/155134/oembed',
            language: 'nb'
          },
          {
            url: 'http://ndla.no/node/155152/oembed',
            language: 'nn'
          }
        ],
        type: 'SUMMARY',
        metaUrl: 'http://api.test.ndla.no/learningpaths/20/learningsteps/151'
      }
    ],
    learningstepUrl: 'http://api.test.ndla.no/learningpaths/20/learningsteps',
    coverPhotoUrl: 'http://api.ndla.no/images/thumbs/spcf84b0.jpg',
    duration: 600,
    status: 'PUBLISHED',
    verificationStatus: 'CREATED_BY_NDLA',
    lastUpdated: '2015-11-29T18:40:07Z',
    tags: [
      {
        tag: 'heimskringla',
        language: 'nb'
      },
      {
        tag: 'heimskringla'
      },
      {
        tag: 'heimskringla',
        language: 'en'
      },
      {
        tag: 'heimskringla',
        language: 'nn'
      },
      {
        tag: 'snorre sturlason',
        language: 'nn'
      },
      {
        tag: 'snorri sturlason'
      },
      {
        tag: 'snorri sturlason',
        language: 'en'
      },
      {
        tag: 'snorre sturlason',
        language: 'nb'
      },
      {
        tag: 'norrøn litteratur',
        language: 'nn'
      },
      {
        tag: 'norrøn litteratur',
        language: 'nb'
      },
      {
        tag: 'norse literature'
      },
      {
        tag: 'norse literature',
        language: 'en'
      }
    ],
    author: {
      type: 'Forfatter',
      name: 'christer gundersen'
    }
  });
});
