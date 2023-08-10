class CorriereITArticle {

	constructor(url) {
		this.url = url;
		this.encoding = 'latin1' //ISO-8859-1;
	}

	run($) {
		const ldJson = JSON.parse($('head [type="application/ld+json"]').text());
		const isSpecialSection = $('body:not(.type-article):not(#cronache)').length 
									&& ldJson.articleSection !== 'Cultura' 
									&& ldJson.articleSection !== 'Politica' 
									&& ldJson.articleSection !== 'Meteo'
									&& ldJson.articleSection !== 'Sport';

		let title = '', img = '', description = '', content = '';

		if (isSpecialSection) {
			title = $('h1.title').text().trim();
			img = $('div.is-hero figure img').attr('src');
			description = $('.has-first-letter').text().trim();
			content = $('.content > *:not(.information-group):not(.has-first-letter):not(#ads_halfpage_mobile)').text().trim();
		} else {
			title = $('h1.title-art').text().trim();

			if (!title) {
				title = $('h1.title-art-hp').text().trim();
			}

			img = $('div.is-hero figure img').attr('src');
			description = $('.summary-art').text().trim();
			content = $('.content > *:not(.information-group):not(#ads_halfpage_mobile)').text().trim();
		}

		if (!img) {
			img = '';
		} else if (!img.includes('https://')) {
			img = 'https:' + img;
		}
		
		return {
			url: this.url, img, title, description, content
		};
	}

}

module.exports = CorriereITArticle;