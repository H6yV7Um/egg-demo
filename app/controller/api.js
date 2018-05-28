'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async getMenus(app) {


    const result =  this.app.mysql.get('tc_menu_copy');


    var array=[];
    for(var i=0;i<result.length;i++){
       let newV=result[i];
       let p=newV.parent;
       var len=p.toString().length;
       var c=newV.menu_id.toString().slice(0,len);
       var leaf=true;
       if(newV.leaf==0){
          leaf=false;
       }
       var hidden=true;
       if(newV.hidden==1){
           hidden=false;
       }
       //取出一级菜单
       if(p== 0){
            let obj={
                path:newV.path,
                component:newV.component,
                id:newV.menu_id,
                name:newV.name,
                children:[],
                meta:{
                    icon:newV.icon,
                    title:newV.title
                },
                redirect:'noredirect',
                
            }
            
            obj['hidden']=hidden;

            
            array.push(obj);
          
       }
       //取出二级菜单
       if(len == 4){
          for(var j=0;j<array.length;j++){
            if(p==array[j].id){
                  let obj={
                      id:newV.menu_id,
                      name:newV.name,
                      children:[],
                      path:newV.path,
                      meta:{
                        title:newV.title
                      },
                      component:newV.component
                  }
                  if(newV.icon){
                    obj.meta.icon=newV.icon;
                  }
                  array[j].children.push(obj);
            }
          }
       }
       //取出三级菜单
        if(len == 6){
            for(var h=0;h<array.length;h++){
                for(var k=0;k<array[h].children.length;k++){
                    if(p==array[h].children[k].id){
                        let obj={
                            id:newV.menu_id,
                            name:newV.name,
                            children:[],
                            path:newV.path,
                            meta:{
                                title:newV.title
                            },
                            component:newV.component
                        }
                        if(newV.icon){
                           obj.meta.icon=newV.icon;
                        }
                        array[h].children[k].children.push(obj);
                    }
                }
            }
        }
        //取出四级菜单
        if(len == 8){
            for(var h=0;h<array.length;h++){
                for(var k=0;k<array[h].children.length;k++){
                    for(var l=0;l<array[h].children[k].children.length;l++){
                        if(p==array[h].children[k].children[l].id){
                            let obj={
                                id:newV.menu_id,
                                name:newV.name,
                                children:[],
                                path:newV.path,
                                meta:{
                                    icon:newV.icon,
                                    title:newV.title
                                },
                                component:newV.component
                            }
                            array[h].children[k].children[l].children.push(obj);
                        }
                    }
                }
            }
        }
    }
    for(var i=0;i<array.length;i++){
        for(var j=0;j<array[i].children.length;j++){
            if(array[i].children[j].children.length==0){
                delete array[i].children[j].children;
                for(var k=0;i<array[i].children[j].children;k++){
                    if(array[i].children[j].children[k].length==0){
                        delete array[i].children[j].children[k].children;
                    }
                }
            }
        }
        
    }
    this.ctx.body =array;
  }
}

module.exports = HomeController;
