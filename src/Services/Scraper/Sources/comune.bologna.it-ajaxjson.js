const cheerio = require('cheerio');

class ComuneBolognaITAjaxJson {

    constructor() {
        this.scraper = 'AjaxJSON';
        this.url = 'https://www.comune.bologna.it/myportal/C_A944/search-faceted-advanced?page=1&pageSize=10&minimumShouldMatch=0';
        this.contentUrl = 'https://www.comune.bologna.it/myportal/C_A944/api/content/download?id=';
        this.payload = {
            "filters": {
              "intervals": {},
              "terms": {}
            },
            "taxonomiesMust": {
              "area redazionale": [
                "Comune"
              ]
            },
            "taxonomiesShould": {
              "temi": [
                "Ambiente e sostenibilità",
                "Anagrafe, stato civile e servizi cimiteriali",
                "Associazioni e terzo settore",
                "Casa",
                "Cultura",
                "Diritti, voto e partecipazione",
                "Impresa, commercio e innovazione",
                "Lavori pubblici",
                "Lavoro e formazione",
                "Mobilità, viabilità e multe",
                "Scuola e educazione",
                "Sicurezza e protezione civile",
                "Sport",
                "Tasse e tributi",
                "Urbanistica e edilizia",
                "Welfare, benessere sociale e salute"
              ],
              "argomenti nrc": [
                "Acqua",
                "Alberi e piante",
                "Amianto",
                "Animali",
                "Aria",
                "Aziende a rischio incidente rilevante",
                "Dati ambientali e monitoraggio",
                "Energia",
                "Inquinamento",
                "Orti",
                "Parchi, giardini e aree verdi",
                "Sicurezza ambientale",
                "Suolo",
                "Valutazione impatto ambientale",
                "Certificati",
                "Cittadinanza",
                "Identità",
                "Matrimoni, unioni civili e convivenze",
                "Morte e testamento biologico",
                "Nascita",
                "Residenza",
                "Separazione e Divorzio",
                "Affitto",
                "Costruzione e manutenzione",
                "Edilizia residenziale pubblica",
                "Centri estivi",
                "Diritto allo studio",
                "Educazione alla sostenibilita",
                "Isee",
                "Nidi d'infanzia",
                "Pagamento servizi scolastici",
                "Pasti e refezione scolastica",
                "Scuola e servizi prima infanzia",
                "Scuole d'infanzia",
                "Scuole secondarie di primo grado",
                "Servizi educativi, didattici e ricreativi",
                "Trasporto scolastico",
                "Imu",
                "Imposta comunale pubblicita",
                "Rifiuti",
                "Tares",
                "Tari tassa rifiuti",
                "Tarsu",
                "Tasi",
                "Avvio di impresa",
                "Commercio in sede fissa",
                "Commercio su aree pubbliche",
                "Dehors",
                "Forme speciali di vendita",
                "Giochi leciti",
                "Impianti",
                "Imposta di soggiorno",
                "Licenze",
                "Manifestazioni fieristiche",
                "Palestre e fitness",
                "Permessi edilizi con pareri esterni",
                "Rumore",
                "Avviamento al lavoro",
                "Corsi e formazione",
                "Diritti dei lavoratori",
                "Servizio civile e servizio volontario europeo",
                "Arte",
                "Biblioteche",
                "Card cultura",
                "Cinema",
                "Danza",
                "Musei",
                "Musica",
                "Teatro",
                "Impianti sportivi",
                "Manutenzione e gestione impianti sportivi",
                "Piscine",
                "Bicicletta",
                "Multe",
                "Parcheggi",
                "Permessi di accesso",
                "Permessi di sosta",
                "Rimozioni",
                "Taxi",
                "Telecontrollo",
                "Accessibilità, ausili e barriere architettoniche",
                "Assistenza a domicilio",
                "Associazionismo sociale",
                "Centri diurni",
                "Contributi",
                "Inclusione sociale",
                "Interventi in emergenza",
                "Politiche sociali",
                "Servizi residenziali",
                "Supporto ai genitori",
                "Supporto per le dipendenze",
                "Supporto per senza fissa dimora",
                "Supporto socio sanitario",
                "Trasporto anziani e disabili",
                "Alimenti",
                "Ambulanze",
                "Animali d'affezione",
                "Coronavirus",
                "Farmacie e medicinali",
                "Gas tossici",
                "Onoranze funebri",
                "Promozione della salute",
                "Radiazioni ionizzanti",
                "Strutture sanitarie",
                "Strutture socio assistenziali",
                "Diritti LGBTI",
                "Elezioni",
                "Partecipazione civica",
                "Politiche di genere",
                "Volontariato",
                "Accesso agli atti",
                "Emergenze",
                "Oggetti rinvenuti",
                "Polizia locale",
                "Pronto intervento",
                "Sicurezza stradale",
                "Edilizia scolastica",
                "Illuminazione pubblica e semafori",
                "Infrastrutture",
                "Manutenzione strade e verde",
                "Programmi triennali lavori pubblici",
                "Riqualificazione urbana",
                "Autocertificazioni",
                "Autentiche e legalizzazioni",
                "Consiglio comunale",
                "Memoria",
                "Onorificenze",
                "Cerimonia o commemorazione",
                "Bilancio ed economia",
                "Statistica",
                "Portici",
                "Clima",
                "Addizionale comunale Irpef",
                "Animali infestanti",
                "Contrasto violenza di genere",
                "Diritti delle persone private della liberta personale",
                "Distribuzione carburanti",
                "Giunta comunale",
                "Interventi in emergenza sociale",
                "Lotterie tombole pesche di beneficenza",
                "Occupazione suolo pubblico",
                "Ondate di calore",
                "Pari opportunita",
                "Piano freddo",
                "Piano neve",
                "Scarichi ed emissioni",
                "Scuole primarie",
                "Sicurezza in citta",
                "Solidarietà",
                "Telefonia mobile"
              ],
              "destinatari": [
                "Residente",
                "Non residente",
                "Giovane",
                "Donna",
                "Famiglia",
                "Genitore o tutore",
                "Contribuente",
                "Associazione e terzo settore",
                "Ciclista",
                "LGBTI",
                "0-3 anni",
                "10 13 anni",
                "11 18 anni",
                "13 18 anni",
                "18 26 anni",
                "3-6 anni",
                "6 10 anni",
                "Artista di strada",
                "Automobilista-motociclista",
                "Baby sitter e badante",
                "Barbiere e parrucchiere",
                "Commerciante o artigianoa",
                "Edile",
                "Estetista",
                "Extra Unione Europea",
                "Farmacista",
                "Insegnante",
                "Madre",
                "Migrante",
                "Minore",
                "Minore con disabilita",
                "Nomade",
                "Padre",
                "Persona adulta con disabilita",
                "Persona adulta in disagio sociale",
                "Persona anziana",
                "Persona anziana con disabilita",
                "Persona con disabilita",
                "Persona detenuta o ex detenuta",
                "Persona disoccupata in cerca di lavoro",
                "Persona proprietaria di animali",
                "Persona sportiva",
                "Professionista",
                "Studente",
                "Studente universitarioa",
                "Tassista",
                "Tatuatore piercing",
                "Turista",
                "Tutore",
                "Unione Europea",
                "Veterinarioa"
              ],
              "quartiere": [
                "Borgo Panigale-Reno",
                "Navile",
                "Porto-Saragozza",
                "San Donato-San Vitale",
                "Santo Stefano",
                "Savena"
              ]
            },
            "extraTaxonomiesMust": {},
            "extraTaxonomiesShould": {},
            "orderBy": [
              {
                "attributes.sys_start_pub_date": {
                  "order": "desc"
                }
              }
            ],
            "types": [
              "rer_news"
            ]
          }
    }

    _getAllArticles($) {
        const allArticles = [];

        $.page.entities.forEach(entity => {
            const $description = cheerio.load(entity.description);
            let description = $description.text().trim().replace('\n', '');
            const tags = [];

            if (description.length > 1024) {
                description = description.substring(0, 1024) + '...';
            }

            const url = entity.ipaDomain + entity.canonicalURL;
            const title = entity.name.trim().replace('\n', '');
            const img = this.contentUrl + entity.attributes.sys_uri_immagine_alta_definiz;

            allArticles.push({
              url, img, title, description, tags
            })
        });

        return allArticles;
    }

    run($) {
        const allArticles = this._getAllArticles($);

        return allArticles;
    }

}

module.exports = new ComuneBolognaITAjaxJson();