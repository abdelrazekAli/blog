(this["webpackJsonphello-react"]=this["webpackJsonphello-react"]||[]).push([[3],{126:function(e,t,s){"use strict";s.r(t);var a=s(22),r=s.n(a),i=s(33),c=s(2),l=s(6),n=s(0),o=s(115),d=s(118),u=s(75),b=s(121),m=s(116),j=s(1);t.default=function(e){var t=Object(n.useState)({touched:!1,isValid:!1,msg:""}),s=Object(l.a)(t,2),a=s[0],h=s[1],g=Object(n.useState)({touched:!1,isValid:!1,msg:""}),x=Object(l.a)(g,2),O=x[0],p=x[1],f=Object(n.useState)(!1),V=Object(l.a)(f,2),v=V[0],w=V[1],y=Object(n.useState)(!1),N=Object(l.a)(y,2),T=N[0],P=N[1],S=function(){var e=Object(i.a)(r.a.mark((function e(t){var s,i,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),s=t.target.title.value,i=t.target.body.value,!a.isValid||!O.isValid){e.next=9;break}return w(!0),e.next=6,k({title:s,body:i});case 6:c=e.sent,console.log(c),t.target.reset();case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(e){return new Promise((function(t,s){setTimeout((function(){t(e),w(!1),P(!0)}),2e3)}))};return Object(j.jsx)(o.a,{children:Object(j.jsx)(d.a,{children:Object(j.jsxs)(u.a,{md:6,lg:4,className:" mx-auto bg-light p-4 my-4 shadow-sm",children:[Object(j.jsx)("h2",{className:" text-center h4 m-3 text-secondary",children:"Add Post"}),Object(j.jsxs)(b.a,{onSubmit:S,children:[Object(j.jsxs)(b.a.Group,{className:"mb-3",controlId:"formBasicEmail",children:[Object(j.jsx)(b.a.Label,{children:"Post title"}),Object(j.jsx)(b.a.Control,{type:"text",placeholder:"Enter Title",name:"title",className:function(){if(a.touched)return a.isValid?"border border-success":"border border-danger"}(),onBlur:function(e){var t=e.target.value.trim(),s=Object(c.a)({},a);s.touched=!0,t.length<=0?(s.isValid=!1,s.msg="Title is required."):t.split(" ").length<3?(s.isValid=!1,s.msg="Title must be more than 2 words."):t.split(" ").length>10?(s.isValid=!1,s.msg="Title must be less than 10 words."):(s.isValid=!0,s.msg=""),h(Object(c.a)({},s))},autoFocus:!0}),a.msg&&Object(j.jsx)("small",{className:"text-danger p-1",children:a.msg})]}),Object(j.jsxs)(b.a.Group,{className:"mb-3",controlId:"exampleForm.ControlTextarea1",children:[Object(j.jsx)(b.a.Label,{children:"Post body"}),Object(j.jsx)(b.a.Control,{as:"textarea",rows:3,name:"body",className:function(){if(O.touched)return O.isValid?"border border-success":"border border-danger"}(),onChange:function(e){var t=e.target.value.trim(),s=Object(c.a)({},O);s.touched=!0,t.length<=0?(s.isValid=!1,s.msg="Body is required."):t.split(" ").length<10?(s.isValid=!1,s.msg="Title must be more than 10 words."):t.split(" ").length>500?(s.isValid=!1,s.msg="Title must be less than 500 words."):(s.isValid=!0,s.msg=""),p(Object(c.a)({},s))}}),O.msg&&Object(j.jsx)("small",{className:"text-danger p-1",children:O.msg})]}),Object(j.jsx)(m.a,{variant:"primary",type:"submit",className:"w-100",disabled:!a.isValid||!O.isValid,children:v?"Loading ...":"Add New Post"})]}),T&&Object(j.jsx)("div",{className:"alert alert-success text-center my-2",children:"Post Added Successfully"})]})})})}}}]);
//# sourceMappingURL=3.9bad150a.chunk.js.map