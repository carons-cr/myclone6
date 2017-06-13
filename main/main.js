const loadAllItems = require('./loadAllItems.js');

module.exports = function main(inputs) {
     let goodsList =new GoodsList(inputs);
     var sgoodsList='***<ûǮ׬�̵�>�����嵥***\n';
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
      var allGoods=new Array();      //�����а���������Ʒ
      allGoods=loadAllItems();
      var goodsArray =new Array();     //����ͻ��������Ʒ
      var typeGoods=new Array();       //���������Ʒ����
      typeGoods[0]=new Array();
      var s1='';
      for(var i=0;i<inputs.length;i++){
    	//������Ʒ��õ���Ʒ��Ϣ��������Ʒ��������
            for(var j=0;j<allGoods.length;j++){
	          if(allGoods[j].barcode==inputs[i]){
			let goods = new Goods(allGoods[j].barcode,allGoods[j].name,allGoods[j].unit,allGoods[j].price);
			goodsArray[i]=goods;
			continue;
	          }
	    }  
        //����һ����Ʒ�����һ�����͵���Ʒ
            if((typeGoods[0].length==0)&&(typeGoods.length==1)){
		   typeGoods[0][0]=goodsArray[0];
            }else{                              //�ӵڶ�����Ʒ��ʼ����Ʒ�����ж�
   	    	   var tag=0;
		   for(var k=0;k<typeGoods.length;k++){            //����ĳһά�����е�һ����Ʒͬ����˳������һά����
		          if(goodsArray[i].barcode==(typeGoods[k][0].barcode)){
				 var len1=typeGoods[k].length;
				 typeGoods[k][len1]=goodsArray[i];
				 tag=1;
				 continue;
			  }
	           }
	           if(tag==0){                 //�������е�������Ʒ��һ��������һά���飬��������Ʒ����
			  var h=typeGoods.length;
			  typeGoods[h]=new Array();
			  typeGoods[h][0]=goodsArray[i];
		   } 
             } 
       }
       for(var i=0;i<typeGoods.length;i++){            //����Ʒ���ͽ�����Ʒ��Ϣ���
    	     var count=0;
    	     var cost=0;
    	     for(var j=0;j<typeGoods[i].length;j++){
    	    	   count++;
    	     cost+=typeGoods[i][j].price;
    	     }
    	     s1+='���ƣ�'+typeGoods[i][0].name+'��������'+count+typeGoods[i][0].unit
    	     +'�����ۣ�'+typeGoods[i][0].price.toFixed(2)+'(Ԫ)��С�ƣ�'+cost.toFixed(2)+'(Ԫ)\n';
    	     this.sum=this.sum+cost;
       } 
    	    
       return s1;
    }; 
    	
    GoodsList.prototype.goodsTotal=function(){
          var s2='�ܼƣ�'+this.sum.toFixed(2)+'(Ԫ)\n';
          return s2;
    };       
 };