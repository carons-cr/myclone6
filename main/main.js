const loadAllItems = require('./loadAllItems.js');

module.exports = function main(inputs) {
     let goodsList =new GoodsList(inputs);
     var sgoodsList='***<没钱赚商店>购物清单***\n';
     sgoodsList+=goodsList.goodsInfo();
     sgoodsList+='----------------------\n';
     sgoodsList+=goodsList.goodsTotal();
     sgoodsList+='**********************';
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
      var allGoods=new Array();      //数组中包括所有商品
      allGoods=loadAllItems();
      var goodsArray =new Array();     //储存客户购买的商品
      var typeGoods=new Array();       //将购买的商品分类
      typeGoods[0]=new Array();
      var s1='';
      for(var i=0;i<inputs.length;i++){
    	//根据商品码得到商品信息并将该商品存入数组
            for(var j=0;j<allGoods.length;j++){
	          if(allGoods[j].barcode==inputs[i]){
			let goods = new Goods(allGoods[j].barcode,allGoods[j].name,allGoods[j].unit,allGoods[j].price);
			goodsArray[i]=goods;
			continue;
	          }
	    }  
        //将第一个商品存入第一种类型的商品
            if((typeGoods[0].length==0)&&(typeGoods.length==1)){
		   typeGoods[0][0]=goodsArray[0];
            }else{                              //从第二个商品开始对商品分类判断
   	    	   var tag=0;
		   for(var k=0;k<typeGoods.length;k++){            //若和某一维数组中第一个商品同类则按顺序存入该一维数组
		          if(goodsArray[i].barcode==(typeGoods[k][0].barcode)){
				 var len1=typeGoods[k].length;
				 typeGoods[k][len1]=goodsArray[i];
				 tag=1;
				 continue;
			  }
	           }
	           if(tag==0){                 //若和已有的类型商品不一样则新增一维数组，存入新商品类型
			  var h=typeGoods.length;
			  typeGoods[h]=new Array();
			  typeGoods[h][0]=goodsArray[i];
		   } 
             } 
       }
       for(var i=0;i<typeGoods.length;i++){            //按商品类型进行商品信息输出
    	     var count=0;
    	     var cost=0;
    	     for(var j=0;j<typeGoods[i].length;j++){
    	    	   count++;
    	     cost+=typeGoods[i][j].price;
    	     }
    	     s1+='名称：'+typeGoods[i][0].name+'，数量：'+count+typeGoods[i][0].unit
    	     +'，单价：'+typeGoods[i][0].price.toFixed(2)+'(元)，小计：'+cost.toFixed(2)+'(元)\n';
    	     this.sum=this.sum+cost;
       } 
    	    
       return s1;
    }; 
    	
    GoodsList.prototype.goodsTotal=function(){
          var s2='总计：'+this.sum.toFixed(2)+'(元)\n';
          return s2;
    };       
 };