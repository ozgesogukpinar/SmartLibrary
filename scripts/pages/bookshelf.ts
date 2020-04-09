import BookshelfDesign from 'generated/pages/bookshelf';
import GridViewItem1 from 'generated/my-components/GridViewItem1';
import { ImageView } from 'sf-core/ui';
import Http = require("sf-core/net/http");
import { pageCount } from 'sf-core/util/Android/transition/fragmenttransition';
import BookItem from 'generated/my-components/BookItem';

export default class Bookshelf extends BookshelfDesign {

    private isbnList: Array <string>;
    
    router: any;
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        let image_url;
        const http = new Http();

        this.books.onItemBind = (gridViewItem : BookItem, index) => {

            image_url = `https://covers.openlibrary.org/b/isbn/${this.isbnList[index]}-L.jpg`;
            gridViewItem.imageItem.loadFromUrl({ url: image_url });

        }
        this.books.onItemSelected = (gridViewItem : BookItem, index) => {
            this.router.push("bookdetails", { isbn: this.isbnList[index] });
        }
        getISBNList().then( (response: Array<string>)=> {
            this.isbnList = response;
            this.books.itemCount = response.length;
            this.books.refreshData();
        });
        
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
}

function getISBNList(){

    return new Promise((resolve, reject) => {  

    const http = new Http();
    const myUrl = "https://openlibrary.org/search.json?q=the+lord+of+the+rings";
    const request = http.requestJSON({url: myUrl, onLoad: (e) => {

        resolve(e.JSON.docs[0].isbn)

    } , onError: (e) => {reject(e)}});

    });    
}  
