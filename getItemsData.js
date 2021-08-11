var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var download = require("download");
var fs = require("fs");
var axios = require("axios");
var rechargeValues = {
    "Recharge_1.png": "./items/recharge/Recharge_1.png",
    "Recharge_2.png": "./items/recharge/Recharge_2.png",
    "Recharge_3.png": "./items/recharge/Recharge_3.png",
    "Recharge_4.png": "./items/recharge/Recharge_4.png",
    "Recharge_6.png": "./items/recharge/Recharge_6.png",
    "Recharge_12.png": "./items/recharge/Recharge_12.png",
    "Recharge_damage.png": "./items/recharge/Recharge_damage.png",
    "Recharge_one_time.png": "./items/recharge/Recharge_one_time.png",
    "Recharge_time.png": "./items/recharge/Recharge_time.png",
    "Recharge_unlimited.png": "./items/recharge/Recharge_unlimited.png",
    "Recharge_variable.gif": "./items/recharge/Recharge_variable.png"
};
var IsaacItem = /** @class */ (function () {
    function class_1(name, ID, subtext, description, quality, imageURL, isActiveItem, rechargeURL) {
        this.name = name;
        this.ID = ID;
        this.subtext = subtext;
        this.description = description;
        this.quality = quality;
        this.imageURL = imageURL;
        this.isActiveItem = isActiveItem;
        this.rechargeURL = rechargeURL;
    }
    class_1.prototype.toString = function (separator) {
        return (this.name +
            separator +
            this.ID +
            separator +
            this.subtext +
            separator +
            this.description +
            separator +
            this.quality +
            separator +
            this.imageURL +
            separator +
            this.isActiveItem +
            separator +
            this.rechargeURL);
        /*return `${this.name}${separator}${this.ID}${separator}${this.subtext}${separator}${this.description}${separator}${this.quality}${separator}${this.imageURL}${separator}
        ${this.isActiveItem}${separator}
        ${this.rechargeURL}`;*/
    };
    return class_1;
}());
var itemLocalStorage = "./items";
var wikiLink = "https://bindingofisaacrebirth.fandom.com/wiki/Items";
var getItemDataFromWiki = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, dom, document, list, finalArray, currentArray, i, item, tdList, j, itemCaract, imagesLinks, k, itemObject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get(wikiLink)];
            case 1:
                response = _a.sent();
                dom = new JSDOM(response.data);
                document = dom.window.document;
                list = document.getElementsByClassName("row-collectible");
                finalArray = [];
                currentArray = [];
                console.log("nb items total: " + list.length);
                for (i = 0; i < 5; i++) {
                    item = list.item(i);
                    tdList = item.getElementsByTagName("td");
                    currentArray = [];
                    for (j = 0; j < tdList.length; j++) {
                        itemCaract = tdList.item(j).textContent.trim();
                        if (itemCaract != "") {
                            currentArray.push(itemCaract);
                        }
                    }
                    imagesLinks = extractImages(item);
                    for (k = 0; k < imagesLinks.length; k++) {
                        currentArray.push(imagesLinks[k]);
                    }
                    itemObject = isaacItemObjectBuilder(currentArray);
                    console.log("-----------------\n[" + itemObject.toString(",\n") + "]\n-----------------");
                    finalArray.push(itemObject);
                }
                saveDataToJSON(finalArray);
                return [2 /*return*/];
        }
    });
}); };
var extractImages = function (rowCollectible) {
    //On extraie les images, on les télécharge puis on retourne le ou les path locaux des images
    var returnArray = [];
    var imgList = rowCollectible.getElementsByTagName("img");
    //item image, on recup la balise img, on prend sa source et on retire le /revision.....
    var imageURL = imgList
        .item(0)
        .getAttribute("data-src")
        .replace(/\/revision.*/gi, "");
    var itemFileName = getFileName(imageURL).replace("Collectible_", "");
    saveImage(imageURL, itemFileName);
    var localURL = itemLocalStorage + "/" + itemFileName;
    returnArray.push(localURL);
    //item recharge, si balise possède une image de recharge
    if (imgList.item(1) != null || imgList.item(1) != undefined) {
        var rechargeImageURL = imgList
            .item(1)
            .getAttribute("data-src")
            .replace(/\/revision.*/gi, "");
        var rechargeAmount = rechargeValues[getFileName(rechargeImageURL)];
        returnArray.push(rechargeAmount);
    }
    return returnArray;
};
var getFileName = function (imageURL) {
    var fileName = imageURL.match(/[A-Z0-9_\-]+\.(png|gif)$/gi)[0];
    return fileName;
};
var saveImage = function (imageURL, imageName) { return __awaiter(_this, void 0, void 0, function () {
    var imagePath, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                imagePath = itemLocalStorage + "/" + imageName;
                _b = (_a = fs).writeFileSync;
                _c = [imagePath];
                return [4 /*yield*/, download(imageURL)];
            case 1:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [2 /*return*/, imagePath];
        }
    });
}); };
var isaacItemObjectBuilder = function (itemCaracts) {
    // Construction de l'objet et on le retourne
    var isActive = false;
    if (itemCaracts.length > 6) {
        isActive = true;
    }
    var item = new IsaacItem(itemCaracts[0], itemCaracts[1], itemCaracts[2], itemCaracts[3], itemCaracts[4], itemCaracts[5], isActive, isActive ? itemCaracts[6] : null);
    return item;
};
var saveDataToJSON = function (dataArray) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = JSON.stringify(dataArray);
        fs.writeFileSync("items.json", data, function (err) {
            if (err) {
                throw err;
            }
            console.log("JSON save ?");
        });
        return [2 /*return*/];
    });
}); };
getItemDataFromWiki();
