class AnsaITArticle {

	constructor(url) {
		this.url = url;
	}

	run($) {
		let content = '';
		
		const paragraphs = $('.news-txt p');

		paragraphs.each((i, paragraph) => {
			content += $(paragraph).text().trim();
		})

		return {
			content: content
		}
	}

}

module.exports = AnsaITArticle;