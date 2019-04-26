import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrencyProvider } from './../../providers/currency/currency';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /*
      /////////////////////////////////////////////////////////////////////////

      Application contains a storage problem after the page is reloded, 
      the data stored is not correctly outputed but 
      If closed and the ionic serve command issued again,
      the app returns to its normal function and displays the correct data
      previously saved.
      
      /////////////////////////////////////////////////////////////////////////
  */

  //Variables
  exRate1: number = 0;
  exRate2: number = 0;
  exAmount1: number;
  exAmount2: number;

  prevConvIndex: number = 0;
  prevConversions: string[] = ["prev0", "prev1", "prev2", "prev3", "prev4", "prev5", "prev6", "prev7", "prev8", "prev9"];
  conversionHistory = new Array<number>(10);
  
  //API variables
  rateDate: any;
  rateEUR: number;
  rateUSD: number;
  rateGBP: number;
  rateJPY: number;
  rateCAD: number;
  rateCHF: number;
  rateAUD: number;

  constructor(public navCtrl: NavController, private currencyProvider: CurrencyProvider, private storage: Storage) { 
  }

  // Getting data from currency API
  ionViewDidLoad(){
    this.currencyProvider.getCurrencyData().subscribe((data) => 
    {
      this.rateDate = data.date;
      this.rateEUR = data.rates.EUR;
      this.rateUSD = data.rates.USD;
      this.rateGBP = data.rates.GBP;
      this.rateJPY = data.rates.JPY;
      this.rateCAD = data.rates.CAD;
      this.rateCHF = data.rates.CHF;
      this.rateAUD = data.rates.AUD;
    });
    this.getPreviousConversions();
  }

  // Converts from amount 1 to 2
  convert1() {
    let tempResult: number;
    // Converting the currency to Euros
    tempResult = this.exAmount1/this.exRate1;
    //Converting from euros to desired currency
    this.exAmount2 = tempResult * this.exRate2;
    console.log(this.exAmount2);
  }

  // Converts from amount 2 to 1
  convert2() {
    let tempResult: number;
    // Converting the currency to Euros
    tempResult = this.exAmount2/this.exRate2;
    //Converting from euros to desired currency
    this.exAmount1 = tempResult * this.exRate1;
    console.log(this.exAmount1);    
  }

  // Keeping records of the last 10 conversions saved by the user, if more than 10
  // conversions are saved, the oldest will be deleted to make room for the new one
  storeConversion() {
    var currentElement: any;
    var previousElement: any = this.exAmount2;

    for (let i = 0; i < 10; i++) {
      currentElement = this.storage.get(this.prevConversions[i]);
      
      this.storage.set(this.prevConversions[i], previousElement);
      
      previousElement = currentElement;
    }
  }

  // Gets and stores conversions in a array number
  getPreviousConversions(){
    console.log("PREVIOUS METHOD CALLED");
    
    for (let i = 0; i < 10; ++i)
    {
      this.conversionHistory[i] = 0;
    }

    for (let i = 0; i < 10; ++i)
    {
      this.storage.get(this.prevConversions[i]).then((data) => {
        if (data == null) {
        console.log("Value not in storage");
        } else {
        this.conversionHistory[i] = data.toFixed(2);
        console.log("value "+ i + "= " + data);
        }
        })
        .catch((err) => {
        console.log("Error = " + err);
        })
    }
  }

}


