import{w as ln,c as z}from"./path-53f90ab3.js";import{a1 as an,a2 as G,a3 as q,a4 as rn,a5 as y,$ as on,a6 as K,a7 as _,a8 as un,a9 as t,aa as sn,ab as tn,ac as fn}from"./mermaid.core-4b79e0e7.js";function cn(l){return l.innerRadius}function yn(l){return l.outerRadius}function gn(l){return l.startAngle}function mn(l){return l.endAngle}function pn(l){return l&&l.padAngle}function dn(l,h,I,D,v,A,B,a){var O=I-l,i=D-h,n=B-v,m=a-A,r=m*O-n*i;if(!(r*r<y))return r=(n*(h-A)-m*(l-v))/r,[l+r*O,h+r*i]}function V(l,h,I,D,v,A,B){var a=l-I,O=h-D,i=(B?A:-A)/K(a*a+O*O),n=i*O,m=-i*a,r=l+n,s=h+m,f=I+n,c=D+m,C=(r+f)/2,o=(s+c)/2,p=f-r,g=c-s,R=p*p+g*g,T=v-A,P=r*c-f*s,S=(g<0?-1:1)*K(fn(0,T*T*R-P*P)),$=(P*g-p*S)/R,j=(-P*p-g*S)/R,w=(P*g+p*S)/R,d=(-P*p+g*S)/R,x=$-C,e=j-o,u=w-C,F=d-o;return x*x+e*e>u*u+F*F&&($=w,j=d),{cx:$,cy:j,x01:-n,y01:-m,x11:$*(v/T-1),y11:j*(v/T-1)}}function vn(){var l=cn,h=yn,I=z(0),D=null,v=gn,A=mn,B=pn,a=null,O=ln(i);function i(){var n,m,r=+l.apply(this,arguments),s=+h.apply(this,arguments),f=v.apply(this,arguments)-rn,c=A.apply(this,arguments)-rn,C=un(c-f),o=c>f;if(a||(a=n=O()),s<r&&(m=s,s=r,r=m),!(s>y))a.moveTo(0,0);else if(C>on-y)a.moveTo(s*G(f),s*q(f)),a.arc(0,0,s,f,c,!o),r>y&&(a.moveTo(r*G(c),r*q(c)),a.arc(0,0,r,c,f,o));else{var p=f,g=c,R=f,T=c,P=C,S=C,$=B.apply(this,arguments)/2,j=$>y&&(D?+D.apply(this,arguments):K(r*r+s*s)),w=_(un(s-r)/2,+I.apply(this,arguments)),d=w,x=w,e,u;if(j>y){var F=sn(j/r*q($)),L=sn(j/s*q($));(P-=F*2)>y?(F*=o?1:-1,R+=F,T-=F):(P=0,R=T=(f+c)/2),(S-=L*2)>y?(L*=o?1:-1,p+=L,g-=L):(S=0,p=g=(f+c)/2)}var H=s*G(p),J=s*q(p),M=r*G(T),N=r*q(T);if(w>y){var Q=s*G(g),U=s*q(g),W=r*G(R),X=r*q(R),E;if(C<an)if(E=dn(H,J,W,X,Q,U,M,N)){var Y=H-E[0],Z=J-E[1],b=Q-E[0],k=U-E[1],nn=1/q(tn((Y*b+Z*k)/(K(Y*Y+Z*Z)*K(b*b+k*k)))/2),en=K(E[0]*E[0]+E[1]*E[1]);d=_(w,(r-en)/(nn-1)),x=_(w,(s-en)/(nn+1))}else d=x=0}S>y?x>y?(e=V(W,X,H,J,s,x,o),u=V(Q,U,M,N,s,x,o),a.moveTo(e.cx+e.x01,e.cy+e.y01),x<w?a.arc(e.cx,e.cy,x,t(e.y01,e.x01),t(u.y01,u.x01),!o):(a.arc(e.cx,e.cy,x,t(e.y01,e.x01),t(e.y11,e.x11),!o),a.arc(0,0,s,t(e.cy+e.y11,e.cx+e.x11),t(u.cy+u.y11,u.cx+u.x11),!o),a.arc(u.cx,u.cy,x,t(u.y11,u.x11),t(u.y01,u.x01),!o))):(a.moveTo(H,J),a.arc(0,0,s,p,g,!o)):a.moveTo(H,J),!(r>y)||!(P>y)?a.lineTo(M,N):d>y?(e=V(M,N,Q,U,r,-d,o),u=V(H,J,W,X,r,-d,o),a.lineTo(e.cx+e.x01,e.cy+e.y01),d<w?a.arc(e.cx,e.cy,d,t(e.y01,e.x01),t(u.y01,u.x01),!o):(a.arc(e.cx,e.cy,d,t(e.y01,e.x01),t(e.y11,e.x11),!o),a.arc(0,0,r,t(e.cy+e.y11,e.cx+e.x11),t(u.cy+u.y11,u.cx+u.x11),o),a.arc(u.cx,u.cy,d,t(u.y11,u.x11),t(u.y01,u.x01),!o))):a.arc(0,0,r,T,R,o)}if(a.closePath(),n)return a=null,n+""||null}return i.centroid=function(){var n=(+l.apply(this,arguments)+ +h.apply(this,arguments))/2,m=(+v.apply(this,arguments)+ +A.apply(this,arguments))/2-an/2;return[G(m)*n,q(m)*n]},i.innerRadius=function(n){return arguments.length?(l=typeof n=="function"?n:z(+n),i):l},i.outerRadius=function(n){return arguments.length?(h=typeof n=="function"?n:z(+n),i):h},i.cornerRadius=function(n){return arguments.length?(I=typeof n=="function"?n:z(+n),i):I},i.padRadius=function(n){return arguments.length?(D=n==null?null:typeof n=="function"?n:z(+n),i):D},i.startAngle=function(n){return arguments.length?(v=typeof n=="function"?n:z(+n),i):v},i.endAngle=function(n){return arguments.length?(A=typeof n=="function"?n:z(+n),i):A},i.padAngle=function(n){return arguments.length?(B=typeof n=="function"?n:z(+n),i):B},i.context=function(n){return arguments.length?(a=n??null,i):a},i}export{vn as a};
