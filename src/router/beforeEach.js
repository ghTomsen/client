
import axios from "axios";
import api from "../js/api-config";

export default function(to,from,next){

    var noCheckPage=[
      "goodsList",
      "goodsDetail",
      "shopCart"
    ]

    // console.log(to,from);
    var isLogin=false;
    var toPage=to.name;

    
    // console.log(toPage);
    

    if(noCheckPage.some(v=>v==toPage)){
      return next();
    }

    axios.get(api.isLogin).then(res=>{
      if(res.data.code==='logined'){
        isLogin=true;
      }
      // console.log(res.code);
      
      if(toPage ==='login' && isLogin){
        // console.log('1');
        
        next("/");
      }else if(toPage!=='login' && !isLogin){
        // console.log('2');
        // console.log(to.fullPath);
        
        next({ name: 'login', query: { nextPage: to.fullPath } });
        // next("/login");
      }else{
        next();
      }
    })
    
  }
