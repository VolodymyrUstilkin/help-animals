(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"+B+2":function(e,t,i){"use strict";i.r(t),i.d(t,"AdminUsersModule",function(){return g});var n=i("ofXK"),a=i("tyNb"),s=i("3Pt+"),o=i("FpXt"),d=i("tk/3"),l=i("hVSr");const r=i("akkN").a.apiUrl+"/users";var b=i("xGl1"),c=i("fXoL"),p=i("tD2J");function u(e,t){if(1&e&&(c.Nb(0,"tr"),c.Nb(1,"td"),c.nc(2),c.Mb(),c.Nb(3,"td"),c.nc(4),c.Mb(),c.Nb(5,"td"),c.nc(6),c.Mb(),c.Nb(7,"td",5),c.nc(8),c.Mb(),c.Nb(9,"td",5),c.nc(10),c.Mb(),c.Nb(11,"td",5),c.nc(12),c.Mb(),c.Nb(13,"td"),c.nc(14),c.Mb(),c.Nb(15,"td",5),c.Nb(16,"a",6),c.nc(17,"\ud83d\udd0d"),c.Mb(),c.Mb(),c.Mb()),2&e){const e=t.$implicit,i=c.Yb();c.yb(2),c.oc(e.id),c.yb(2),c.oc(e.name),c.yb(2),c.oc(e.email),c.yb(2),c.oc(e.phone1),c.yb(2),c.oc(e.phone2),c.yb(2),c.oc(e.isActive?"\u2714":"\u2718"),c.yb(2),c.oc(e.updatedAt),c.yb(2),c.cc("routerLink",i.getRedirectToUserDetailsLink(e.id+"/details"))}}let m=(()=>{class e{constructor(e,t,i){this.httpClient=e,this.userAuthService=t,this.activatedRoute=i,this.userList=[],this.pagination=new l.a,this.pagination.url="/admin/users",this.querySubscription=this.activatedRoute.queryParams.subscribe(e=>{this.pagination.page=e.page||this.pagination.page,this.pagination.perPage=e.per_page||this.pagination.perPage,this.getUsers()})}ngOnDestroy(){this.querySubscription.unsubscribe()}getUsers(){const e=(new d.f).appendAll(this.pagination.getQueryParams());this.httpClient.get(r,{params:e,observe:"response"}).subscribe(e=>{e.body&&(this.userList=e.body.map(e=>({id:e.id.toString(),login:e.login,name:e.name,phone1:e.phone1,phone2:e.phone2,email:e.email,isActive:e.is_active,permissionForAccessToActiveAdmin:e.permission_for_access_to_active_admin,permissionForAddEditAndRemoveAnimals:e.permission_for_add_edit_and_remove_animals,permissionForCreateAndCloseAnimalRequests:e.permission_for_create_and_close_animal_requests,createdAt:Object(b.a)(e.created_at),updatedAt:Object(b.a)(e.updated_at),editedBy:e.edited_by})),this.pagination.setFromResponseHeaders(e.headers))})}getRedirectToUserDetailsLink(e){return`/admin/users/${e}`}}return e.\u0275fac=function(t){return new(t||e)(c.Ib(d.b),c.Ib(p.a),c.Ib(a.a))},e.\u0275cmp=c.Cb({type:e,selectors:[["app-admin-user-list"]],decls:21,vars:2,consts:[[1,"admin-user-list-container"],[1,"admin-animal-list-header"],[1,"table"],[4,"ngFor","ngForOf"],[3,"pagination"],[1,"text-align--center"],[1,"admin-animal-list-redirect-edit-animal",3,"routerLink"]],template:function(e,t){1&e&&(c.Nb(0,"div",0),c.Jb(1,"div",1),c.Nb(2,"table",2),c.Nb(3,"tr"),c.Nb(4,"th"),c.nc(5,"id"),c.Mb(),c.Nb(6,"th"),c.nc(7,"\u0406\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435"),c.Mb(),c.Nb(8,"th"),c.nc(9,"email"),c.Mb(),c.Nb(10,"th"),c.nc(11,"\u0442\u0435\u043b1"),c.Mb(),c.Nb(12,"th"),c.nc(13,"\u0442\u0435\u043b2"),c.Mb(),c.Nb(14,"th"),c.nc(15,"\u0434\u0456\u044e\u0447\u0438\u0439"),c.Mb(),c.Nb(16,"th"),c.nc(17,"\u0434\u0430\u0442\u0430 \u0437\u043c\u0456\u043d\u0438"),c.Mb(),c.Jb(18,"th"),c.Mb(),c.lc(19,u,18,8,"tr",3),c.Mb(),c.Jb(20,"app-pagination",4),c.Mb()),2&e&&(c.yb(19),c.bc("ngForOf",t.userList),c.yb(1),c.bc("pagination",t.pagination))},directives:[n.i,l.b,a.e],styles:[".admin-user-list-container[_ngcontent-%COMP%]{display:grid;grid-gap:10px}.text-align--center[_ngcontent-%COMP%]{text-align:center}"]}),e})();class h{constructor(){this.email="",this.id="",this.isActive=!1,this.login="",this.name="",this.permissionForAddEditAndRemoveAnimals=!1,this.permissionForAccessToActiveAdmin=!1,this.permissionForCreateAndCloseAnimalRequests=!1,this.phone1="",this.phone2="",this.createdAt="",this.editedBy="",this.updatedAt=""}}let y=(()=>{class e{constructor(e,t,i){this.httpClient=e,this.activatedRouter=t,this.userAuthService=i,this.userDetails=new h}ngAfterViewInit(){this.getUser(this.activatedRouter.snapshot.params.id)}getUser(e){e&&this.httpClient.get(`${r}/${e}`).subscribe(e=>{this.userDetails={id:e.id.toString(),login:e.login,name:e.name,phone1:e.phone1,phone2:e.phone2,email:e.email,isActive:e.is_active,permissionForAccessToActiveAdmin:e.permission_for_access_to_active_admin,permissionForAddEditAndRemoveAnimals:e.permission_for_add_edit_and_remove_animals,permissionForCreateAndCloseAnimalRequests:e.permission_for_create_and_close_animal_requests,createdAt:Object(b.a)(e.created_at),updatedAt:Object(b.a)(e.updated_at),editedBy:e.edited_by}})}}return e.\u0275fac=function(t){return new(t||e)(c.Ib(d.b),c.Ib(a.a),c.Ib(p.a))},e.\u0275cmp=c.Cb({type:e,selectors:[["app-user-animal-details"]],decls:57,vars:13,consts:[[1,"admin-details"],[1,"caption"],[1,"admin-details-form-field-container"],["for","id",1,"label"],["id","id","readonly","readonly",1,"input","admin-details-form-field-input",3,"value"],["for","login",1,"label"],["id","login","readonly","readonly","type","text",1,"input","admin-details-form-field-input",3,"value"],["for","name",1,"label"],["id","name","readonly","readonly","type","text",1,"input","admin-details-form-field-input",3,"value"],["for","email",1,"label"],["id","email","readonly","readonly","type","text",1,"input","admin-details-form-field-input",3,"value"],[1,"label"],["for","phone1"],["id","phone1","readonly","readonly","type","text",1,"input","admin-details-form-field-input",3,"value"],["for","phone2"],["id","phone2","readonly","readonly","type","text",1,"input","admin-details-form-field-input",3,"value"],[1,"label","admin-details-form-field-container"],[1,"key-value-table-style"],[1,"label","font-weight--default"],[1,"label","colored-font"],["for","dateLastEdit",1,"label"],["id","dateLastEdit","readonly","readonly",1,"input",3,"value"],["for","dateAdded",1,"label"],["id","dateAdded","readonly","readonly",1,"input","admin-details-form-field-input",3,"value"],["for","editedBy",1,"label"],["id","editedBy","readonly","readonly",1,"input","admin-details-form-field-input",3,"value"]],template:function(e,t){1&e&&(c.Nb(0,"div",0),c.Nb(1,"h4",1),c.nc(2,"\u041f\u0435\u0440\u0435\u0433\u043b\u044f\u0434 \u043a\u043e\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430:"),c.Mb(),c.Nb(3,"div",2),c.Nb(4,"label",3),c.nc(5,"id:"),c.Mb(),c.Jb(6,"input",4),c.Mb(),c.Nb(7,"div",2),c.Nb(8,"label",5),c.nc(9,"\u041b\u043e\u0433\u0456\u043d:"),c.Mb(),c.Jb(10,"input",6),c.Mb(),c.Nb(11,"div",2),c.Nb(12,"label",7),c.nc(13,"\u0406\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435:"),c.Mb(),c.Jb(14,"input",8),c.Mb(),c.Nb(15,"div",2),c.Nb(16,"label",9),c.nc(17,"Email:"),c.Mb(),c.Jb(18,"input",10),c.Mb(),c.Nb(19,"div",2),c.Nb(20,"label",11),c.nc(21,"\u0422\u0435\u043b\u0435\u0444\u043e\u043d\u0438:"),c.Mb(),c.Jb(22,"label",12),c.Jb(23,"input",13),c.Jb(24,"label",14),c.Jb(25,"input",15),c.Mb(),c.Nb(26,"p",16),c.nc(27,"\u041a\u0435\u0440\u0443\u0432\u0430\u043d\u043d\u044f \u043f\u0440\u0430\u0432\u0430\u043c\u0438 \u0434\u043e\u0441\u0442\u0443\u043f\u0430:"),c.Mb(),c.Nb(28,"section",17),c.Nb(29,"label",18),c.nc(30,"\u0414\u0456\u044e\u0447\u0438\u0439 (\u0430\u043a\u0442\u0438\u0432\u043d\u0438\u0439) \u043a\u043e\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447:"),c.Mb(),c.Nb(31,"label",19),c.nc(32),c.Mb(),c.Nb(33,"label",18),c.nc(34,"\u041e\u0442\u0440\u0438\u043c\u0430\u043d\u043d\u044f \u0442\u0430 \u0437\u0430\u043a\u0440\u0438\u0442\u0442\u044f \u0437\u0430\u044f\u0432 \u043f\u0440\u043e \u0437\u043d\u0430\u0439\u0434\u0435\u043d\u0438\u0445 \u0442\u0432\u0430\u0440\u0438\u043d:"),c.Mb(),c.Nb(35,"label",19),c.nc(36),c.Mb(),c.Nb(37,"label",18),c.nc(38,"\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043d\u043d\u044f \u0442\u0432\u0430\u0440\u0438\u043d:"),c.Mb(),c.Nb(39,"label",19),c.nc(40),c.Mb(),c.Nb(41,"label",18),c.nc(42,"\u0421\u0442\u0432\u043e\u0440\u0435\u043d\u043d\u044f/\u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043d\u044f/\u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043d\u043d\u044f \u043a\u043e\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432:"),c.Mb(),c.Nb(43,"label",19),c.nc(44),c.Mb(),c.Mb(),c.Nb(45,"div",2),c.Nb(46,"label",20),c.nc(47,"\u0414\u0430\u0442\u0430 \u043e\u0441\u0442\u0430\u043d\u043d\u044c\u043e\u0433\u043e \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043d\u043d\u044f:"),c.Mb(),c.Jb(48,"input",21),c.Mb(),c.Nb(49,"div",2),c.Nb(50,"label",22),c.nc(51,"\u0414\u0430\u0442\u0430 \u0441\u0442\u0432\u043e\u0440\u0435\u043d\u043d\u044f:"),c.Mb(),c.Jb(52,"input",23),c.Mb(),c.Nb(53,"div",2),c.Nb(54,"label",24),c.nc(55,"\u0417\u043c\u0456\u043d\u0438 \u0432\u043d\u0435\u0441\u0435\u043d\u0456 \u043a\u043e\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0435\u043c: "),c.Mb(),c.Jb(56,"input",25),c.Mb(),c.Mb()),2&e&&(c.yb(6),c.cc("value",t.userDetails.id),c.yb(4),c.cc("value",t.userDetails.login),c.yb(4),c.cc("value",t.userDetails.name),c.yb(4),c.cc("value",t.userDetails.email),c.yb(5),c.cc("value",t.userDetails.phone1),c.yb(2),c.cc("value",t.userDetails.phone2),c.yb(7),c.oc(t.userDetails.isActive?"\u2714":"\u2718"),c.yb(4),c.oc(t.userDetails.permissionForCreateAndCloseAnimalRequests?"\u2714":"\u2718"),c.yb(4),c.oc(t.userDetails.permissionForAddEditAndRemoveAnimals?"\u2714":"\u2718"),c.yb(4),c.oc(t.userDetails.permissionForAccessToActiveAdmin?"\u2714":"\u2718"),c.yb(4),c.cc("value",t.userDetails.updatedAt),c.yb(4),c.cc("value",t.userDetails.createdAt),c.yb(4),c.cc("value",t.userDetails.editedBy))},styles:[".admin-details[_ngcontent-%COMP%]{margin:0 auto;padding-top:15px;padding-bottom:15px;max-width:600px}.admin-details-form-field-container[_ngcontent-%COMP%]{padding-top:10px;display:grid}.caption[_ngcontent-%COMP%]{font-size:var(--default-component-font-size);font-weight:600;text-align:center}.colored-font[_ngcontent-%COMP%]{color:rgb(var(--default-component-background-color))}.font-weight--default[_ngcontent-%COMP%]{font-weight:400}"]}),e})();const f=[{path:"list",component:m},{path:"add",component:y},{path:":id/details",component:y},{path:"",redirectTo:"list"}];let g=(()=>{class e{}return e.\u0275mod=c.Gb({type:e}),e.\u0275inj=c.Fb({factory:function(t){return new(t||e)},imports:[[n.b,a.f.forChild(f),s.h,o.a,s.m]]}),e})()}}]);