const loadAllItems = require('./loadAllItems.js');


module.exports = function main(inputs) {
     let goodsList =new GoodsList(inputs);
     var sgoodsList=encodeURIComponent("***<没钱赚商店>购物清单***\n");
     sgoodsList=sgoodsList+goodsList.goodsInfo()+"----------------------\n";
     sgoodsList=sgoodsList+goodsList.goodsTotal()+"**********************";
     return sgoodsList;
 };

 function Goods(barcode,name,unit,price){
	    	this.barcode=barcode;
	    	this.name=name;
	    	this.unit=unit;
	    	this.price=price;
 };

 function GoodsList(inputs){
    this.sum=0;
    GoodsList.prototype.goodsInfo=function(){
      var allGoods=new Array();     
      allGoods=loadAllItems();
      var goodsArray =new Array();     
      var typeGoods=new Array();       
      typeGoods[0]=new Array();
      var s1='';
      for(var i=0;i<inputs.length;i++){
    	
            for(var j=0;j<allGoods.length;j++){
	          if(allGoods[j].barcode==inputs[i]){
			let goods = new Goods(allGoods[j].barcode,allGoods[j].name,allGoods[j].unit,allGoods[j].price);
			goodsArray[i]=goods;
			continue;
	          }
	    }  
      
           if((typeGoods[0].length==0)&&(typeGoods.length==1)){
		   typeGoods[0][0]=goodsArray[0];
            }else{                              
   	    	   var tag=0;
		   for(var k=0;k<typeGoods.length;k++){           
		          if(goodsArray[i].barcode==(typeGoods[k][0].barcode)){
				 var len1=typeGoods[k].length;
				 typeGoods[k][len1]=goodsArray[i];
				 tag=1;
				 continue;
			  }
	           }
	           if(tag==0){                 
			  var h=typeGoods.length;
			  typeGoods[h]=new Array();
			  typeGoods[h][0]=goodsArray[i];
		   } 
             } 
       }
       for(var i=0;i<typeGoods.length;i++){            
   	     var count=0;
    	     var cost=0;
   	     for(var j=0;j<typeGoods[i].length;j++){
    	    	   count++;
    	     cost+=typeGoods[i][j].price;
    	     }
    	     s1=s1+encodeURIComponent("名称：")+typeGoods[i][0].name+encodeURIComponent("，数量：")+count+typeGoods[i][0].unit
    	     +encodeURIComponent("，单价：")+typeGoods[i][0].price.toFixed(2)+encodeURIComponent("(元)，小计：")+cost.toFixed(2)+encodeURIComponent("(元)\n");
    	     this.sum=this.sum+cost;
       } 
    	    
       return s1;
    }; 
    	
   GoodsList.prototype.goodsTotal=function(){
         s2=encodeURIComponent("总计：")+this.sum.toFixed(2)+encodeURIComponent("(元)\n");
          return s2;
   };       
 };