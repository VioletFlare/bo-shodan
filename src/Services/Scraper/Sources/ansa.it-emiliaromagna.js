const srcsetParse = require('srcset-parse').default;

class AnsaITEmiliaRomagna {

    constructor() {
        this.url = 'https://www.ansa.it/emiliaromagna';
        this.resourceUrl = 'https://www.ansa.it';
    }

    _getAllArticles($) {
        const allArticles = [];
  
        const $sectionIntro = $('.article-teaser', '.section-intro-wrap');
        const $lastHourEmiliaRomagna = $('.article-teaser', '#ultimaora_orizzontale');
        const $subsection = $('.article-teaser', '.section-subsection-wrap');
        const $video = $('.article-teaser', '.home-video');

        let articles = $sectionIntro.add($lastHourEmiliaRomagna).add($subsection).add($video);

        articles.each((i, $article) => {
            const url = this.resourceUrl + $('.title a', $article).attr('href').replace(/\?.+/, '');
            const title = $('.title a', $article).text().replace('\n', '').trim();
            const description = $('.summary', $article).text().replace('\n', '').trim();
            const srcset = $('img', $article).attr('srcset');
            const kicker = $('.kicker', $article).text().trim();;
            const tags = [kicker];

            let img = '';

            if (srcset) {
                const parsedSrcset = srcsetParse(srcset)

                if (parsedSrcset.length) {
                    img = this.resourceUrl + parsedSrcset[0].url;
                }
            }

    
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

module.exports = new AnsaITEmiliaRomagna();