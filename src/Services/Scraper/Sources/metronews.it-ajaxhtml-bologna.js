class MetroNewsITAjaxHTMLBologna {

    constructor() {
        this.scraper = 'AjaxHTML',
        this.url = 'https://metronews.it/wp-admin/admin-ajax.php',
        this.formData = {
            action: 'loadmore',
            query: `{
                "term":"cronaca-bologna",
                "category_name":"cronaca-bologna",
                "do_not_redirect":1,
                "error":"",
                "m":"",
                "p":0,
                "post_parent":"",
                "subpost":"",
                "subpost_id":"",
                "attachment":"",
                "attachment_id":0,
                "name":"",
                "pagename":"",
                "page_id":0,
                "second":"",
                "minute":"",
                "hour":"",
                "day":0,
                "monthnum":0,
                "year":0,
                "w":0,
                "tag":"",
                "cat":111,
                "tag_id":"",
                "author":"",
                "author_name":"",
                "feed":"",
                "tb":"",
                "paged":0,
                "meta_key":"",
                "meta_value":"",
                "preview":"",
                "s":"",
                "sentence":"",
                "title":"",
                "fields":"",
                "menu_order":"",
                "embed":"",
                "category__in":[
                   
                ],
                "category__not_in":[
                   
                ],
                "category__and":[
                   
                ],
                "post__in":[
                   
                ],
                "post__not_in":[
                   
                ],
                "post_name__in":[
                   
                ],
                "tag__in":[
                   
                ],
                "tag__not_in":[
                   
                ],
                "tag__and":[
                   
                ],
                "tag_slug__in":[
                   
                ],
                "tag_slug__and":[
                   
                ],
                "post_parent__in":[
                   
                ],
                "post_parent__not_in":[
                   
                ],
                "author__in":[
                   
                ],
                "author__not_in":[
                   
                ],
                "search_columns":[
                   
                ],
                "ep_integrate":true,
                "ep_facet":true,
                "aggs":{
                   "name":"terms",
                   "use-filter":true,
                   "aggs":{
                      "category":{
                         "terms":{
                            "size":10000,
                            "field":"terms.category.slug"
                         }
                      },
                      "post_tag":{
                         "terms":{
                            "size":10000,
                            "field":"terms.post_tag.slug"
                         }
                      },
                      "post_type":{
                         "terms":{
                            "size":10000,
                            "field":"post_type.raw"
                         }
                      }
                   }
                },
                "ignore_sticky_posts":false,
                "suppress_filters":false,
                "cache_results":true,
                "update_post_term_cache":true,
                "update_menu_item_cache":false,
                "lazy_load_term_meta":true,
                "update_post_meta_cache":true,
                "post_type":"",
                "posts_per_page":20,
                "nopaging":false,
                "comments_per_page":"50",
                "no_found_rows":false,
                "order":"DESC"
             }`,
             page: 0
        }
    }

    _getPosts($) {
        const allPosts = [];
        const $articles = $('a.catItemNoticeLeft')

        $articles.each((i, article) => {
            const url = $(article).attr('href').replace(/\?.+/, '');
            let img = $('img', article).attr('src');
            const title = $('.catTitleNotice', article).text().replace('\n', '');
            const description = $('.contentCatTextNotice', article).text().replace('\n', '');
            const tags = [];

			allPosts.push({
				url, img, title, description, tags
			});
        });

        return allPosts;
    }

    run($) {
        return this._getPosts($);
    }

}

module.exports = new MetroNewsITAjaxHTMLBologna();