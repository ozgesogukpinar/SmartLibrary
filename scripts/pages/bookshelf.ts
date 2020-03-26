import BookshelfDesign from 'generated/pages/bookshelf';
import GridViewItem1 from 'generated/my-components/GridViewItem1';
import { ImageView } from 'sf-core/ui';
const GridViewItem = require("sf-core/ui/gridviewitem");
const Label = require('sf-core/ui/label');
//const FlexLayout = require('sf-core/ui/flexlayout');
const TextAlignment = require('sf-core/ui/textalignment');
//const LayoutManager = require('sf-core/ui/layoutmanager');
import Http = require("sf-core/net/http");



export default class Bookshelf extends BookshelfDesign {

    private isbnList: Array <string>;

	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        //console.log("111");
        this.gridView1.onItemBind = (gridViewItem : GridViewItem1, index) => {
            //console.log("333");
            //gridViewItem.imageView1.loadFromUrl({ url: "https://covers.openlibrary.org/b/id/240726-S.jpg" });
            gridViewItem.imageView1.loadFromUrl({ url: `https://covers.openlibrary.org/b/isbn/${this.isbnList[index]}-L.jpg` });

        }
        getISBNList().then( (response: Array<string>)=> {
            this.isbnList = response;
            this.gridView1.itemCount = response.length;
            this.gridView1.refreshData();
            

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






