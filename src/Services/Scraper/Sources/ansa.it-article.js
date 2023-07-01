class AnsaITArticle {

	constructor(url) {
		this.url = url;
	}

	run($) {
		let content = '';
		
		const paragraphs = $('.news-txt p');

		paragraphs.each((i, paragraph) => {
			content += $(paragraph).text();
		})

		return {
			content: content
		}
	}

}

module.exports = AnsaITArticle;