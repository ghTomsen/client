import Vue from "vue"
import date from "./date"



export default{
  install(){
    Vue.filter("date",date)
    // Vue.filter()
  }
}