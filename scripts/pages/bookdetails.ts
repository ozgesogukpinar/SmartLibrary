import BookdetailsDesign from 'generated/pages/bookdetails';
import Http = require("sf-core/net/http");


export default class Bookdetails extends BookdetailsDesign {

    private jsonList: Array <string>;
    public pushIsbn;

    routeData : any;
    constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
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
    this.pushIsbn = this.routeData.isbn;
    this.image.loadFromUrl({url : `https://covers.openlibrary.org/b/isbn/${this.pushIsbn}-L.jpg`});

    getBookContent(this.pushIsbn).then( response  => {
            this.content.text = response;
    });
}

function getBookContent(myisbn){

    return new Promise((resolve , reject) => {  

        const http = new Http();
        const detailUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${myisbn}`;
        const request = http.requestJSON({url: detailUrl, onLoad: (e) => {

        resolve(e.JSON.items[0].volumeInfo.description);
        } , onError: (e) => {reject(e)}});

    });   
}

