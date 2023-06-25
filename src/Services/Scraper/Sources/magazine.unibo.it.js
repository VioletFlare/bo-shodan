//https://magazine.unibo.it/

class MagazineUniboIT {
  constructor() {
    this.url = "https://magazine.unibo.it/";
  }

  _getMainPost($) {
    const url = $(".row.main-posts .w7 a").attr('href');
    const img = $(".row.main-posts .w7 img").attr('src');
    const title = $(".row.main-posts .w7 h1").text();
    const description = $(".row.main-posts .w7 .occhiello").text();

    return {
        url, img, title, description
    }
  }

  _getOtherMainPosts($) {
    const posts = $(".row.main-posts w9 a");
  }

  run($) {
    const mainPost = this._getMainPost($);

    return [
        mainPost
    ]
  }
}

module.exports = new MagazineUniboIT();
