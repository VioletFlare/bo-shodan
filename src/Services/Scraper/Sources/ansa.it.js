const Scraper = require("../Scraper");
const AnsaITArticle = require("./ansa.it-article");

class AnsaITHome {
  constructor() {
    this.url = "https://www.ansa.it";
    this.article = AnsaITArticle;
  }

  _getMainPost($) {
    const url = this.url + $(".big-container h3 a").attr("href");
    const img = this.url + $(".big-container .pp-img > a img").attr("src");
    const title = $(".big-container h3 a").text();
    let description = '';

	const descriptionP = $(".big-container .pp-abs p");

	if (descriptionP.length) {
		description = descriptionP.text();
	} else {
		$('.big-container .pp-abs a').remove();
		const descriptionTag = $(".big-container .pp-abs");
		description = descriptionTag.text();
	}

	return {
		url: url,
		img: img,
		title: title,
		description: description
	}
  }

  _getOtherMainPosts($) {
	const otherMainPosts = [];

	const articles = $(".span5 .pp-inner article")

	articles.each((i, el) => {
		const url = this.url + $('h3 a', el).attr('href');
		const img = this.url + $('img', el).data('src');
		const title = $('h3', el).text(); 
		const description = $('.pp-abs p').text();

		otherMainPosts.push({
			url, img, title, description
		})
	});

	return otherMainPosts;
  }

  run($) {
    const mainPost = this._getMainPost($);
	const otherMainPosts = this._getOtherMainPosts($);

    return [mainPost, ...otherMainPosts];
  }
}

module.exports = new AnsaITHome();
