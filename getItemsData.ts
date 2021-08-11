const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const download = require("download");
const fs = require("fs");
const axios = require("axios");

const rechargeValues = {
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
  "Recharge_variable.gif": "./items/recharge/Recharge_variable.png",
};

const itemLocalStorage = "./items";

const IsaacItem = class {
  name: string;
  ID: number;
  subtext: string;
  description: string;
  quality: number;
  imageURL: string;
  rechargeURL: string;
  isActiveItem: boolean;

  constructor(name, ID, subtext, description, quality) {
    this.name = name;
    this.ID = ID;
    this.subtext = subtext;
    this.description = description;
    this.quality = quality;
  }
};

const wikiLink = "https://bindingofisaacrebirth.fandom.com/wiki/Items";

const getItemDataFromWiki = async () => {
  const response = await axios.get(wikiLink);

  const dom = new JSDOM(response.data);
  const document = dom.window.document;

  const list = document.getElementsByClassName("row-collectible");

  let current = [];
  console.log("nb items total: " + list.length);
  for (let i = 0; i < 1; i++) {
    const item = list.item(i);
    const tdList = item.getElementsByTagName("td");

    current = [];
    for (let j = 0; j < tdList.length; j++) {
      let itemCaract = tdList.item(j).textContent.trim();
      if (itemCaract != "") {
        current.push(itemCaract);
      }
    }

    const imagesLinks = extractImages(item);
    for (let k = 0; k < imagesLinks.length; k++) {
      current.push(imagesLinks[k]);
    }
    console.log(
      "-------------------------\n" +
        current.join(", ") +
        "\n-------------------------"
    );
  }
};

const extractImages = (rowCollectible) => {
  //On extraie les images, on les télécharge puis on retourne le ou les path locaux des images
  let returnArray = [];
  const imgList = rowCollectible.getElementsByTagName("img");

  //item image, on recup la balise img, on prend sa source et on retire le /revision.....
  const imageURL = imgList
    .item(0)
    .getAttribute("data-src")
    .replace(/\/revision.*/gi, "");

  const itemFileName = getFileName(imageURL).replace("Collectible_", "");

  saveImage(imageURL, itemFileName);
  const localURL = `${itemLocalStorage}/${itemFileName}`;
  returnArray.push(localURL);

  //item recharge, si balise possède une image de recharge
  if (imgList.item(1) != null || imgList.item(1) != undefined) {
    const rechargeImageURL = imgList
      .item(1)
      .getAttribute("data-src")
      .replace(/\/revision.*/gi, "");

    const rechargeAmount = rechargeValues[getFileName(rechargeImageURL)];
    returnArray.push(rechargeAmount);
  }

  return returnArray;
};

const getFileName = (imageURL) => {
  const fileName = imageURL.match(/[A-Z0-9_\-]+\.png$/gi)[0];
  return fileName;
};

const saveImage = async (imageURL, imageName) => {
  const imagePath = `${itemLocalStorage}/${imageName}`;
  fs.writeFileSync(imagePath, await download(imageURL));

  return imagePath;
};

const isaacItemObjectBuilder = (itemCaract) => {
  // Construction de l'objet et on le retourne
  
}


getItemDataFromWiki();
