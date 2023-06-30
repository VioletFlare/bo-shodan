class AnsaITArticle {

	constructor(url) {
		this.url = url;
	}

	run($) {
		return {
			content: $('.news-txt').text()
		}
	}

}

module.exports = AnsaITArticle;