//https://magazine.unibo.it/

class MagazineUniboITHome {
  constructor() {
    this.url = "https://magazine.unibo.it/";
  }

  _getMainPost($) {
    const url = $(".row.main-posts .w7 a").attr('href').replace(/\?.+/, '');
    const img = $(".row.main-posts .w7 img").attr('src');
    const title = $(".row.main-posts .w7 h1").text();
    const description = $(".row.main-posts .w7 .occhiello").text();
    const tags = [];

    return {
      url, img, title, description, tags
    }
  }

  _getOtherMainPosts($) {
    const otherMainPosts = [];

    $(".row.main-posts .w9 a").each((i, el) => {
      const url = $(el).attr('href').replace(/\?.+/, '');
      const img = $('img', el).attr('src');
      const title = $('h2', el).text();
      const description = $('.occhiello', el).text();
      const tags = [];

      otherMainPosts.push({
        url, img, title, description, tags
      })
    });

    return otherMainPosts;
  }

  run($) {
    const mainPost = this._getMainPost($);
    const otherMainPosts = this._getOtherMainPosts($);

    return [
        mainPost,
        ...otherMainPosts
    ]
  }
}

module.exports = new MagazineUniboITHome();
