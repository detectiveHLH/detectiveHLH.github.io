import{a9 as ue,aa as Ae,ab as on,ac as de,ad as q,ae as W,af as Se,ag as sn,ah as y,ai as un,aj as dn,ak as Ve,al as fn,am as hn,an as cn,ao as ln,ap as be,aq as re,ar as vn,as as De,at as pn,au as j,av as gn,aw as U,ax as mn,ay as M,az as F,aA as Ge,aB as wn,aC as N,aD as te,aE as bn,aF as _n,aG as z,aH as Be,aI as En,aJ as xn,aK as yn,aL as T,V as _e,aM as D,aN as Ee,aO as fe,a8 as Y,aP as $,aQ as Ln}from"./app-e58d90a2.js";function A(e,n,r){if(!ue(r))return!1;var t=typeof n;return(t=="number"?Ae(r)&&on(n,r.length):t=="string"&&n in r)?de(r[n],e):!1}function Nn(e){return q(function(n,r){var t=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=e.length>3&&typeof a=="function"?(i--,a):void 0,o&&A(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),n=Object(n);++t<i;){var s=r[t];s&&e(n,s,t,a)}return n})}function kn(e,n,r,t){var i=-1,a=e==null?0:e.length;for(t&&a&&(r=e[++i]);++i<a;)r=n(r,e[i],i,e);return r}var Ye=Object.prototype,Cn=Ye.hasOwnProperty,On=q(function(e,n){e=Object(e);var r=-1,t=n.length,i=t>2?n[2]:void 0;for(i&&A(n[0],n[1],i)&&(t=1);++r<t;)for(var a=n[r],o=W(a),s=-1,u=o.length;++s<u;){var d=o[s],h=e[d];(h===void 0||de(h,Ye[d])&&!Cn.call(e,d))&&(e[d]=a[d])}return e});const Mn=On;function ie(e,n,r){(r!==void 0&&!de(e[n],r)||r===void 0&&!(n in e))&&Se(e,n,r)}function ae(e,n){if(!(n==="constructor"&&typeof e[n]=="function")&&n!="__proto__")return e[n]}function Pn(e){return sn(e,W(e))}function Rn(e,n,r,t,i,a,o){var s=ae(e,r),u=ae(n,r),d=o.get(u);if(d){ie(e,r,d);return}var h=a?a(s,u,r+"",e,n,o):void 0,c=h===void 0;if(c){var l=y(u),v=!l&&un(u),p=!l&&!v&&dn(u);h=u,l||v||p?y(s)?h=s:Ve(s)?h=fn(s):v?(c=!1,h=hn(u,!0)):p?(c=!1,h=cn(u,!0)):h=[]:ln(u)||be(u)?(h=s,be(s)?h=Pn(s):(!ue(s)||re(s))&&(h=vn(u))):c=!1}c&&(o.set(u,h),i(h,u,t,a,o),o.delete(u)),ie(e,r,h)}function $e(e,n,r,t,i){e!==n&&De(n,function(a,o){if(i||(i=new pn),ue(a))Rn(e,n,o,r,$e,t,i);else{var s=t?t(ae(e,o),a,o+"",e,n,i):void 0;s===void 0&&(s=a),ie(e,o,s)}},W)}function he(e){return typeof e=="function"?e:j}function f(e,n){var r=y(e)?gn:U;return r(e,he(n))}function Tn(e,n){var r=[];return U(e,function(t,i,a){n(t,i,a)&&r.push(t)}),r}function E(e,n){var r=y(e)?mn:Tn;return r(e,M(n))}function qe(e,n){var r=-1,t=Ae(e)?Array(e.length):[];return U(e,function(i,a,o){t[++r]=n(i,a,o)}),t}function m(e,n){var r=y(e)?F:qe;return r(e,M(n))}function In(e,n){return e==null?e:De(e,he(n),W)}function Fn(e,n){return e&&Ge(e,he(n))}function An(e,n){return e>n}var Sn=Object.prototype,Vn=Sn.hasOwnProperty;function Dn(e,n){return e!=null&&Vn.call(e,n)}function g(e,n){return e!=null&&wn(e,n,Dn)}function Gn(e,n){return F(n,function(r){return e[r]})}function x(e){return e==null?[]:Gn(e,N(e))}function b(e){return e===void 0}function We(e,n){return e<n}function H(e,n){var r={};return n=M(n),Ge(e,function(t,i,a){Se(r,i,n(t,i,a))}),r}function ce(e,n,r){for(var t=-1,i=e.length;++t<i;){var a=e[t],o=n(a);if(o!=null&&(s===void 0?o===o&&!te(o):r(o,s)))var s=o,u=a}return u}function k(e){return e&&e.length?ce(e,j,An):void 0}var Bn=Nn(function(e,n,r){$e(e,n,r)});const oe=Bn;function S(e){return e&&e.length?ce(e,j,We):void 0}function le(e,n){return e&&e.length?ce(e,M(n),We):void 0}function Yn(e,n){var r=e.length;for(e.sort(n);r--;)e[r]=e[r].value;return e}function $n(e,n){if(e!==n){var r=e!==void 0,t=e===null,i=e===e,a=te(e),o=n!==void 0,s=n===null,u=n===n,d=te(n);if(!s&&!d&&!a&&e>n||a&&o&&u&&!s&&!d||t&&o&&u||!r&&u||!i)return 1;if(!t&&!a&&!d&&e<n||d&&r&&i&&!t&&!a||s&&r&&i||!o&&i||!u)return-1}return 0}function qn(e,n,r){for(var t=-1,i=e.criteria,a=n.criteria,o=i.length,s=r.length;++t<o;){var u=$n(i[t],a[t]);if(u){if(t>=s)return u;var d=r[t];return u*(d=="desc"?-1:1)}}return e.index-n.index}function Wn(e,n,r){n.length?n=F(n,function(a){return y(a)?function(o){return bn(o,a.length===1?a[0]:a)}:a}):n=[j];var t=-1;n=F(n,_n(M));var i=qe(e,function(a,o,s){var u=F(n,function(d){return d(a)});return{criteria:u,index:++t,value:a}});return Yn(i,function(a,o){return qn(a,o,r)})}var jn=Math.ceil,Un=Math.max;function Hn(e,n,r,t){for(var i=-1,a=Un(jn((n-e)/(r||1)),0),o=Array(a);a--;)o[t?a:++i]=e,e+=r;return o}function Xn(e){return function(n,r,t){return t&&typeof t!="number"&&A(n,r,t)&&(r=t=void 0),n=z(n),r===void 0?(r=n,n=0):r=z(r),t=t===void 0?n<r?1:-1:z(t),Hn(n,r,t,e)}}var zn=Xn();const O=zn;function Jn(e,n,r,t,i){return i(e,function(a,o,s){r=t?(t=!1,a):n(r,a,o,s)}),r}function G(e,n,r){var t=y(e)?kn:Jn,i=arguments.length<3;return t(e,M(n),r,i,U)}var Kn=q(function(e,n){if(e==null)return[];var r=n.length;return r>1&&A(e,n[0],n[1])?n=[]:r>2&&A(n[0],n[1],n[2])&&(n=[n[0]]),Wn(e,Be(n,1),[])});const B=Kn;var Qn=q(function(e){return En(Be(e,1,Ve,!0))});const Zn=Qn;var er=0;function ve(e){var n=++er;return xn(e)+n}function nr(e,n,r){for(var t=-1,i=e.length,a=n.length,o={};++t<i;){var s=t<a?n[t]:void 0;r(o,e[t],s)}return o}function rr(e,n){return nr(e||[],n||[],yn)}var tr="\0",L="\0",xe="";class _{constructor(n={}){this._isDirected=g(n,"directed")?n.directed:!0,this._isMultigraph=g(n,"multigraph")?n.multigraph:!1,this._isCompound=g(n,"compound")?n.compound:!1,this._label=void 0,this._defaultNodeLabelFn=T(void 0),this._defaultEdgeLabelFn=T(void 0),this._nodes={},this._isCompound&&(this._parent={},this._children={},this._children[L]={}),this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={}}isDirected(){return this._isDirected}isMultigraph(){return this._isMultigraph}isCompound(){return this._isCompound}setGraph(n){return this._label=n,this}graph(){return this._label}setDefaultNodeLabel(n){return re(n)||(n=T(n)),this._defaultNodeLabelFn=n,this}nodeCount(){return this._nodeCount}nodes(){return N(this._nodes)}sources(){var n=this;return E(this.nodes(),function(r){return _e(n._in[r])})}sinks(){var n=this;return E(this.nodes(),function(r){return _e(n._out[r])})}setNodes(n,r){var t=arguments,i=this;return f(n,function(a){t.length>1?i.setNode(a,r):i.setNode(a)}),this}setNode(n,r){return g(this._nodes,n)?(arguments.length>1&&(this._nodes[n]=r),this):(this._nodes[n]=arguments.length>1?r:this._defaultNodeLabelFn(n),this._isCompound&&(this._parent[n]=L,this._children[n]={},this._children[L][n]=!0),this._in[n]={},this._preds[n]={},this._out[n]={},this._sucs[n]={},++this._nodeCount,this)}node(n){return this._nodes[n]}hasNode(n){return g(this._nodes,n)}removeNode(n){var r=this;if(g(this._nodes,n)){var t=function(i){r.removeEdge(r._edgeObjs[i])};delete this._nodes[n],this._isCompound&&(this._removeFromParentsChildList(n),delete this._parent[n],f(this.children(n),function(i){r.setParent(i)}),delete this._children[n]),f(N(this._in[n]),t),delete this._in[n],delete this._preds[n],f(N(this._out[n]),t),delete this._out[n],delete this._sucs[n],--this._nodeCount}return this}setParent(n,r){if(!this._isCompound)throw new Error("Cannot set parent in a non-compound graph");if(b(r))r=L;else{r+="";for(var t=r;!b(t);t=this.parent(t))if(t===n)throw new Error("Setting "+r+" as parent of "+n+" would create a cycle");this.setNode(r)}return this.setNode(n),this._removeFromParentsChildList(n),this._parent[n]=r,this._children[r][n]=!0,this}_removeFromParentsChildList(n){delete this._children[this._parent[n]][n]}parent(n){if(this._isCompound){var r=this._parent[n];if(r!==L)return r}}children(n){if(b(n)&&(n=L),this._isCompound){var r=this._children[n];if(r)return N(r)}else{if(n===L)return this.nodes();if(this.hasNode(n))return[]}}predecessors(n){var r=this._preds[n];if(r)return N(r)}successors(n){var r=this._sucs[n];if(r)return N(r)}neighbors(n){var r=this.predecessors(n);if(r)return Zn(r,this.successors(n))}isLeaf(n){var r;return this.isDirected()?r=this.successors(n):r=this.neighbors(n),r.length===0}filterNodes(n){var r=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});r.setGraph(this.graph());var t=this;f(this._nodes,function(o,s){n(s)&&r.setNode(s,o)}),f(this._edgeObjs,function(o){r.hasNode(o.v)&&r.hasNode(o.w)&&r.setEdge(o,t.edge(o))});var i={};function a(o){var s=t.parent(o);return s===void 0||r.hasNode(s)?(i[o]=s,s):s in i?i[s]:a(s)}return this._isCompound&&f(r.nodes(),function(o){r.setParent(o,a(o))}),r}setDefaultEdgeLabel(n){return re(n)||(n=T(n)),this._defaultEdgeLabelFn=n,this}edgeCount(){return this._edgeCount}edges(){return x(this._edgeObjs)}setPath(n,r){var t=this,i=arguments;return G(n,function(a,o){return i.length>1?t.setEdge(a,o,r):t.setEdge(a,o),o}),this}setEdge(){var n,r,t,i,a=!1,o=arguments[0];typeof o=="object"&&o!==null&&"v"in o?(n=o.v,r=o.w,t=o.name,arguments.length===2&&(i=arguments[1],a=!0)):(n=o,r=arguments[1],t=arguments[3],arguments.length>2&&(i=arguments[2],a=!0)),n=""+n,r=""+r,b(t)||(t=""+t);var s=I(this._isDirected,n,r,t);if(g(this._edgeLabels,s))return a&&(this._edgeLabels[s]=i),this;if(!b(t)&&!this._isMultigraph)throw new Error("Cannot set a named edge when isMultigraph = false");this.setNode(n),this.setNode(r),this._edgeLabels[s]=a?i:this._defaultEdgeLabelFn(n,r,t);var u=ir(this._isDirected,n,r,t);return n=u.v,r=u.w,Object.freeze(u),this._edgeObjs[s]=u,ye(this._preds[r],n),ye(this._sucs[n],r),this._in[r][s]=u,this._out[n][s]=u,this._edgeCount++,this}edge(n,r,t){var i=arguments.length===1?J(this._isDirected,arguments[0]):I(this._isDirected,n,r,t);return this._edgeLabels[i]}hasEdge(n,r,t){var i=arguments.length===1?J(this._isDirected,arguments[0]):I(this._isDirected,n,r,t);return g(this._edgeLabels,i)}removeEdge(n,r,t){var i=arguments.length===1?J(this._isDirected,arguments[0]):I(this._isDirected,n,r,t),a=this._edgeObjs[i];return a&&(n=a.v,r=a.w,delete this._edgeLabels[i],delete this._edgeObjs[i],Le(this._preds[r],n),Le(this._sucs[n],r),delete this._in[r][i],delete this._out[n][i],this._edgeCount--),this}inEdges(n,r){var t=this._in[n];if(t){var i=x(t);return r?E(i,function(a){return a.v===r}):i}}outEdges(n,r){var t=this._out[n];if(t){var i=x(t);return r?E(i,function(a){return a.w===r}):i}}nodeEdges(n,r){var t=this.inEdges(n,r);if(t)return t.concat(this.outEdges(n,r))}}_.prototype._nodeCount=0;_.prototype._edgeCount=0;function ye(e,n){e[n]?e[n]++:e[n]=1}function Le(e,n){--e[n]||delete e[n]}function I(e,n,r,t){var i=""+n,a=""+r;if(!e&&i>a){var o=i;i=a,a=o}return i+xe+a+xe+(b(t)?tr:t)}function ir(e,n,r,t){var i=""+n,a=""+r;if(!e&&i>a){var o=i;i=a,a=o}var s={v:i,w:a};return t&&(s.name=t),s}function J(e,n){return I(e,n.v,n.w,n.name)}class ar{constructor(){var n={};n._next=n._prev=n,this._sentinel=n}dequeue(){var n=this._sentinel,r=n._prev;if(r!==n)return Ne(r),r}enqueue(n){var r=this._sentinel;n._prev&&n._next&&Ne(n),n._next=r._next,r._next._prev=n,r._next=n,n._prev=r}toString(){for(var n=[],r=this._sentinel,t=r._prev;t!==r;)n.push(JSON.stringify(t,or)),t=t._prev;return"["+n.join(", ")+"]"}}function Ne(e){e._prev._next=e._next,e._next._prev=e._prev,delete e._next,delete e._prev}function or(e,n){if(e!=="_next"&&e!=="_prev")return n}var sr=T(1);function ur(e,n){if(e.nodeCount()<=1)return[];var r=fr(e,n||sr),t=dr(r.graph,r.buckets,r.zeroIdx);return D(m(t,function(i){return e.outEdges(i.v,i.w)}))}function dr(e,n,r){for(var t=[],i=n[n.length-1],a=n[0],o;e.nodeCount();){for(;o=a.dequeue();)K(e,n,r,o);for(;o=i.dequeue();)K(e,n,r,o);if(e.nodeCount()){for(var s=n.length-2;s>0;--s)if(o=n[s].dequeue(),o){t=t.concat(K(e,n,r,o,!0));break}}}return t}function K(e,n,r,t,i){var a=i?[]:void 0;return f(e.inEdges(t.v),function(o){var s=e.edge(o),u=e.node(o.v);i&&a.push({v:o.v,w:o.w}),u.out-=s,se(n,r,u)}),f(e.outEdges(t.v),function(o){var s=e.edge(o),u=o.w,d=e.node(u);d.in-=s,se(n,r,d)}),e.removeNode(t.v),a}function fr(e,n){var r=new _,t=0,i=0;f(e.nodes(),function(s){r.setNode(s,{v:s,in:0,out:0})}),f(e.edges(),function(s){var u=r.edge(s.v,s.w)||0,d=n(s),h=u+d;r.setEdge(s.v,s.w,h),i=Math.max(i,r.node(s.v).out+=d),t=Math.max(t,r.node(s.w).in+=d)});var a=O(i+t+3).map(function(){return new ar}),o=t+1;return f(r.nodes(),function(s){se(a,o,r.node(s))}),{graph:r,buckets:a,zeroIdx:o}}function se(e,n,r){r.out?r.in?e[r.out-r.in+n].enqueue(r):e[e.length-1].enqueue(r):e[0].enqueue(r)}function hr(e){var n=e.graph().acyclicer==="greedy"?ur(e,r(e)):cr(e);f(n,function(t){var i=e.edge(t);e.removeEdge(t),i.forwardName=t.name,i.reversed=!0,e.setEdge(t.w,t.v,i,ve("rev"))});function r(t){return function(i){return t.edge(i).weight}}}function cr(e){var n=[],r={},t={};function i(a){g(t,a)||(t[a]=!0,r[a]=!0,f(e.outEdges(a),function(o){g(r,o.w)?n.push(o):i(o.w)}),delete r[a])}return f(e.nodes(),i),n}function lr(e){f(e.edges(),function(n){var r=e.edge(n);if(r.reversed){e.removeEdge(n);var t=r.forwardName;delete r.reversed,delete r.forwardName,e.setEdge(n.w,n.v,r,t)}})}function P(e,n,r,t){var i;do i=ve(t);while(e.hasNode(i));return r.dummy=n,e.setNode(i,r),i}function vr(e){var n=new _().setGraph(e.graph());return f(e.nodes(),function(r){n.setNode(r,e.node(r))}),f(e.edges(),function(r){var t=n.edge(r.v,r.w)||{weight:0,minlen:1},i=e.edge(r);n.setEdge(r.v,r.w,{weight:t.weight+i.weight,minlen:Math.max(t.minlen,i.minlen)})}),n}function je(e){var n=new _({multigraph:e.isMultigraph()}).setGraph(e.graph());return f(e.nodes(),function(r){e.children(r).length||n.setNode(r,e.node(r))}),f(e.edges(),function(r){n.setEdge(r,e.edge(r))}),n}function ke(e,n){var r=e.x,t=e.y,i=n.x-r,a=n.y-t,o=e.width/2,s=e.height/2;if(!i&&!a)throw new Error("Not possible to find intersection inside of the rectangle");var u,d;return Math.abs(a)*o>Math.abs(i)*s?(a<0&&(s=-s),u=s*i/a,d=s):(i<0&&(o=-o),u=o,d=o*a/i),{x:r+u,y:t+d}}function X(e){var n=m(O(Ue(e)+1),function(){return[]});return f(e.nodes(),function(r){var t=e.node(r),i=t.rank;b(i)||(n[i][t.order]=r)}),n}function pr(e){var n=S(m(e.nodes(),function(r){return e.node(r).rank}));f(e.nodes(),function(r){var t=e.node(r);g(t,"rank")&&(t.rank-=n)})}function gr(e){var n=S(m(e.nodes(),function(a){return e.node(a).rank})),r=[];f(e.nodes(),function(a){var o=e.node(a).rank-n;r[o]||(r[o]=[]),r[o].push(a)});var t=0,i=e.graph().nodeRankFactor;f(r,function(a,o){b(a)&&o%i!==0?--t:t&&f(a,function(s){e.node(s).rank+=t})})}function Ce(e,n,r,t){var i={width:0,height:0};return arguments.length>=4&&(i.rank=r,i.order=t),P(e,"border",i,n)}function Ue(e){return k(m(e.nodes(),function(n){var r=e.node(n).rank;if(!b(r))return r}))}function mr(e,n){var r={lhs:[],rhs:[]};return f(e,function(t){n(t)?r.lhs.push(t):r.rhs.push(t)}),r}function wr(e,n){var r=Ee();try{return n()}finally{console.log(e+" time: "+(Ee()-r)+"ms")}}function br(e,n){return n()}function _r(e){function n(r){var t=e.children(r),i=e.node(r);if(t.length&&f(t,n),g(i,"minRank")){i.borderLeft=[],i.borderRight=[];for(var a=i.minRank,o=i.maxRank+1;a<o;++a)Oe(e,"borderLeft","_bl",r,i,a),Oe(e,"borderRight","_br",r,i,a)}}f(e.children(),n)}function Oe(e,n,r,t,i,a){var o={width:0,height:0,rank:a,borderType:n},s=i[n][a-1],u=P(e,"border",o,r);i[n][a]=u,e.setParent(u,t),s&&e.setEdge(s,u,{weight:1})}function Er(e){var n=e.graph().rankdir.toLowerCase();(n==="lr"||n==="rl")&&He(e)}function xr(e){var n=e.graph().rankdir.toLowerCase();(n==="bt"||n==="rl")&&yr(e),(n==="lr"||n==="rl")&&(Lr(e),He(e))}function He(e){f(e.nodes(),function(n){Me(e.node(n))}),f(e.edges(),function(n){Me(e.edge(n))})}function Me(e){var n=e.width;e.width=e.height,e.height=n}function yr(e){f(e.nodes(),function(n){Q(e.node(n))}),f(e.edges(),function(n){var r=e.edge(n);f(r.points,Q),g(r,"y")&&Q(r)})}function Q(e){e.y=-e.y}function Lr(e){f(e.nodes(),function(n){Z(e.node(n))}),f(e.edges(),function(n){var r=e.edge(n);f(r.points,Z),g(r,"x")&&Z(r)})}function Z(e){var n=e.x;e.x=e.y,e.y=n}function Nr(e){e.graph().dummyChains=[],f(e.edges(),function(n){kr(e,n)})}function kr(e,n){var r=n.v,t=e.node(r).rank,i=n.w,a=e.node(i).rank,o=n.name,s=e.edge(n),u=s.labelRank;if(a!==t+1){e.removeEdge(n);var d,h,c;for(c=0,++t;t<a;++c,++t)s.points=[],h={width:0,height:0,edgeLabel:s,edgeObj:n,rank:t},d=P(e,"edge",h,"_d"),t===u&&(h.width=s.width,h.height=s.height,h.dummy="edge-label",h.labelpos=s.labelpos),e.setEdge(r,d,{weight:s.weight},o),c===0&&e.graph().dummyChains.push(d),r=d;e.setEdge(r,i,{weight:s.weight},o)}}function Cr(e){f(e.graph().dummyChains,function(n){var r=e.node(n),t=r.edgeLabel,i;for(e.setEdge(r.edgeObj,t);r.dummy;)i=e.successors(n)[0],e.removeNode(n),t.points.push({x:r.x,y:r.y}),r.dummy==="edge-label"&&(t.x=r.x,t.y=r.y,t.width=r.width,t.height=r.height),n=i,r=e.node(n)})}function pe(e){var n={};function r(t){var i=e.node(t);if(g(n,t))return i.rank;n[t]=!0;var a=S(m(e.outEdges(t),function(o){return r(o.w)-e.edge(o).minlen}));return(a===Number.POSITIVE_INFINITY||a===void 0||a===null)&&(a=0),i.rank=a}f(e.sources(),r)}function V(e,n){return e.node(n.w).rank-e.node(n.v).rank-e.edge(n).minlen}function Xe(e){var n=new _({directed:!1}),r=e.nodes()[0],t=e.nodeCount();n.setNode(r,{});for(var i,a;Or(n,e)<t;)i=Mr(n,e),a=n.hasNode(i.v)?V(e,i):-V(e,i),Pr(n,e,a);return n}function Or(e,n){function r(t){f(n.nodeEdges(t),function(i){var a=i.v,o=t===a?i.w:a;!e.hasNode(o)&&!V(n,i)&&(e.setNode(o,{}),e.setEdge(t,o,{}),r(o))})}return f(e.nodes(),r),e.nodeCount()}function Mr(e,n){return le(n.edges(),function(r){if(e.hasNode(r.v)!==e.hasNode(r.w))return V(n,r)})}function Pr(e,n,r){f(e.nodes(),function(t){n.node(t).rank+=r})}function Rr(){}Rr.prototype=new Error;function ze(e,n,r){y(n)||(n=[n]);var t=(e.isDirected()?e.successors:e.neighbors).bind(e),i=[],a={};return f(n,function(o){if(!e.hasNode(o))throw new Error("Graph does not have node: "+o);Je(e,o,r==="post",a,t,i)}),i}function Je(e,n,r,t,i,a){g(t,n)||(t[n]=!0,r||a.push(n),f(i(n),function(o){Je(e,o,r,t,i,a)}),r&&a.push(n))}function Tr(e,n){return ze(e,n,"post")}function Ir(e,n){return ze(e,n,"pre")}C.initLowLimValues=me;C.initCutValues=ge;C.calcCutValue=Ke;C.leaveEdge=Ze;C.enterEdge=en;C.exchangeEdges=nn;function C(e){e=vr(e),pe(e);var n=Xe(e);me(n),ge(n,e);for(var r,t;r=Ze(n);)t=en(n,e,r),nn(n,e,r,t)}function ge(e,n){var r=Tr(e,e.nodes());r=r.slice(0,r.length-1),f(r,function(t){Fr(e,n,t)})}function Fr(e,n,r){var t=e.node(r),i=t.parent;e.edge(r,i).cutvalue=Ke(e,n,r)}function Ke(e,n,r){var t=e.node(r),i=t.parent,a=!0,o=n.edge(r,i),s=0;return o||(a=!1,o=n.edge(i,r)),s=o.weight,f(n.nodeEdges(r),function(u){var d=u.v===r,h=d?u.w:u.v;if(h!==i){var c=d===a,l=n.edge(u).weight;if(s+=c?l:-l,Sr(e,r,h)){var v=e.edge(r,h).cutvalue;s+=c?-v:v}}}),s}function me(e,n){arguments.length<2&&(n=e.nodes()[0]),Qe(e,{},1,n)}function Qe(e,n,r,t,i){var a=r,o=e.node(t);return n[t]=!0,f(e.neighbors(t),function(s){g(n,s)||(r=Qe(e,n,r,s,t))}),o.low=a,o.lim=r++,i?o.parent=i:delete o.parent,r}function Ze(e){return fe(e.edges(),function(n){return e.edge(n).cutvalue<0})}function en(e,n,r){var t=r.v,i=r.w;n.hasEdge(t,i)||(t=r.w,i=r.v);var a=e.node(t),o=e.node(i),s=a,u=!1;a.lim>o.lim&&(s=o,u=!0);var d=E(n.edges(),function(h){return u===Pe(e,e.node(h.v),s)&&u!==Pe(e,e.node(h.w),s)});return le(d,function(h){return V(n,h)})}function nn(e,n,r,t){var i=r.v,a=r.w;e.removeEdge(i,a),e.setEdge(t.v,t.w,{}),me(e),ge(e,n),Ar(e,n)}function Ar(e,n){var r=fe(e.nodes(),function(i){return!n.node(i).parent}),t=Ir(e,r);t=t.slice(1),f(t,function(i){var a=e.node(i).parent,o=n.edge(i,a),s=!1;o||(o=n.edge(a,i),s=!0),n.node(i).rank=n.node(a).rank+(s?o.minlen:-o.minlen)})}function Sr(e,n,r){return e.hasEdge(n,r)}function Pe(e,n,r){return r.low<=n.lim&&n.lim<=r.lim}function Vr(e){switch(e.graph().ranker){case"network-simplex":Re(e);break;case"tight-tree":Gr(e);break;case"longest-path":Dr(e);break;default:Re(e)}}var Dr=pe;function Gr(e){pe(e),Xe(e)}function Re(e){C(e)}function Br(e){var n=P(e,"root",{},"_root"),r=Yr(e),t=k(x(r))-1,i=2*t+1;e.graph().nestingRoot=n,f(e.edges(),function(o){e.edge(o).minlen*=i});var a=$r(e)+1;f(e.children(),function(o){rn(e,n,i,a,t,r,o)}),e.graph().nodeRankFactor=i}function rn(e,n,r,t,i,a,o){var s=e.children(o);if(!s.length){o!==n&&e.setEdge(n,o,{weight:0,minlen:r});return}var u=Ce(e,"_bt"),d=Ce(e,"_bb"),h=e.node(o);e.setParent(u,o),h.borderTop=u,e.setParent(d,o),h.borderBottom=d,f(s,function(c){rn(e,n,r,t,i,a,c);var l=e.node(c),v=l.borderTop?l.borderTop:c,p=l.borderBottom?l.borderBottom:c,w=l.borderTop?t:2*t,R=v!==p?1:i-a[o]+1;e.setEdge(u,v,{weight:w,minlen:R,nestingEdge:!0}),e.setEdge(p,d,{weight:w,minlen:R,nestingEdge:!0})}),e.parent(o)||e.setEdge(n,u,{weight:0,minlen:i+a[o]})}function Yr(e){var n={};function r(t,i){var a=e.children(t);a&&a.length&&f(a,function(o){r(o,i+1)}),n[t]=i}return f(e.children(),function(t){r(t,1)}),n}function $r(e){return G(e.edges(),function(n,r){return n+e.edge(r).weight},0)}function qr(e){var n=e.graph();e.removeNode(n.nestingRoot),delete n.nestingRoot,f(e.edges(),function(r){var t=e.edge(r);t.nestingEdge&&e.removeEdge(r)})}function Wr(e,n,r){var t={},i;f(r,function(a){for(var o=e.parent(a),s,u;o;){if(s=e.parent(o),s?(u=t[s],t[s]=o):(u=i,i=o),u&&u!==o){n.setEdge(u,o);return}o=s}})}function jr(e,n,r){var t=Ur(e),i=new _({compound:!0}).setGraph({root:t}).setDefaultNodeLabel(function(a){return e.node(a)});return f(e.nodes(),function(a){var o=e.node(a),s=e.parent(a);(o.rank===n||o.minRank<=n&&n<=o.maxRank)&&(i.setNode(a),i.setParent(a,s||t),f(e[r](a),function(u){var d=u.v===a?u.w:u.v,h=i.edge(d,a),c=b(h)?0:h.weight;i.setEdge(d,a,{weight:e.edge(u).weight+c})}),g(o,"minRank")&&i.setNode(a,{borderLeft:o.borderLeft[n],borderRight:o.borderRight[n]}))}),i}function Ur(e){for(var n;e.hasNode(n=ve("_root")););return n}function Hr(e,n){for(var r=0,t=1;t<n.length;++t)r+=Xr(e,n[t-1],n[t]);return r}function Xr(e,n,r){for(var t=rr(r,m(r,function(d,h){return h})),i=D(m(n,function(d){return B(m(e.outEdges(d),function(h){return{pos:t[h.w],weight:e.edge(h).weight}}),"pos")})),a=1;a<r.length;)a<<=1;var o=2*a-1;a-=1;var s=m(new Array(o),function(){return 0}),u=0;return f(i.forEach(function(d){var h=d.pos+a;s[h]+=d.weight;for(var c=0;h>0;)h%2&&(c+=s[h+1]),h=h-1>>1,s[h]+=d.weight;u+=d.weight*c})),u}function zr(e){var n={},r=E(e.nodes(),function(s){return!e.children(s).length}),t=k(m(r,function(s){return e.node(s).rank})),i=m(O(t+1),function(){return[]});function a(s){if(!g(n,s)){n[s]=!0;var u=e.node(s);i[u.rank].push(s),f(e.successors(s),a)}}var o=B(r,function(s){return e.node(s).rank});return f(o,a),i}function Jr(e,n){return m(n,function(r){var t=e.inEdges(r);if(t.length){var i=G(t,function(a,o){var s=e.edge(o),u=e.node(o.v);return{sum:a.sum+s.weight*u.order,weight:a.weight+s.weight}},{sum:0,weight:0});return{v:r,barycenter:i.sum/i.weight,weight:i.weight}}else return{v:r}})}function Kr(e,n){var r={};f(e,function(i,a){var o=r[i.v]={indegree:0,in:[],out:[],vs:[i.v],i:a};b(i.barycenter)||(o.barycenter=i.barycenter,o.weight=i.weight)}),f(n.edges(),function(i){var a=r[i.v],o=r[i.w];!b(a)&&!b(o)&&(o.indegree++,a.out.push(r[i.w]))});var t=E(r,function(i){return!i.indegree});return Qr(t)}function Qr(e){var n=[];function r(a){return function(o){o.merged||(b(o.barycenter)||b(a.barycenter)||o.barycenter>=a.barycenter)&&Zr(a,o)}}function t(a){return function(o){o.in.push(a),--o.indegree===0&&e.push(o)}}for(;e.length;){var i=e.pop();n.push(i),f(i.in.reverse(),r(i)),f(i.out,t(i))}return m(E(n,function(a){return!a.merged}),function(a){return Y(a,["vs","i","barycenter","weight"])})}function Zr(e,n){var r=0,t=0;e.weight&&(r+=e.barycenter*e.weight,t+=e.weight),n.weight&&(r+=n.barycenter*n.weight,t+=n.weight),e.vs=n.vs.concat(e.vs),e.barycenter=r/t,e.weight=t,e.i=Math.min(n.i,e.i),n.merged=!0}function et(e,n){var r=mr(e,function(h){return g(h,"barycenter")}),t=r.lhs,i=B(r.rhs,function(h){return-h.i}),a=[],o=0,s=0,u=0;t.sort(nt(!!n)),u=Te(a,i,u),f(t,function(h){u+=h.vs.length,a.push(h.vs),o+=h.barycenter*h.weight,s+=h.weight,u=Te(a,i,u)});var d={vs:D(a)};return s&&(d.barycenter=o/s,d.weight=s),d}function Te(e,n,r){for(var t;n.length&&(t=$(n)).i<=r;)n.pop(),e.push(t.vs),r++;return r}function nt(e){return function(n,r){return n.barycenter<r.barycenter?-1:n.barycenter>r.barycenter?1:e?r.i-n.i:n.i-r.i}}function tn(e,n,r,t){var i=e.children(n),a=e.node(n),o=a?a.borderLeft:void 0,s=a?a.borderRight:void 0,u={};o&&(i=E(i,function(p){return p!==o&&p!==s}));var d=Jr(e,i);f(d,function(p){if(e.children(p.v).length){var w=tn(e,p.v,r,t);u[p.v]=w,g(w,"barycenter")&&tt(p,w)}});var h=Kr(d,r);rt(h,u);var c=et(h,t);if(o&&(c.vs=D([o,c.vs,s]),e.predecessors(o).length)){var l=e.node(e.predecessors(o)[0]),v=e.node(e.predecessors(s)[0]);g(c,"barycenter")||(c.barycenter=0,c.weight=0),c.barycenter=(c.barycenter*c.weight+l.order+v.order)/(c.weight+2),c.weight+=2}return c}function rt(e,n){f(e,function(r){r.vs=D(r.vs.map(function(t){return n[t]?n[t].vs:t}))})}function tt(e,n){b(e.barycenter)?(e.barycenter=n.barycenter,e.weight=n.weight):(e.barycenter=(e.barycenter*e.weight+n.barycenter*n.weight)/(e.weight+n.weight),e.weight+=n.weight)}function it(e){var n=Ue(e),r=Ie(e,O(1,n+1),"inEdges"),t=Ie(e,O(n-1,-1,-1),"outEdges"),i=zr(e);Fe(e,i);for(var a=Number.POSITIVE_INFINITY,o,s=0,u=0;u<4;++s,++u){at(s%2?r:t,s%4>=2),i=X(e);var d=Hr(e,i);d<a&&(u=0,o=Ln(i),a=d)}Fe(e,o)}function Ie(e,n,r){return m(n,function(t){return jr(e,t,r)})}function at(e,n){var r=new _;f(e,function(t){var i=t.graph().root,a=tn(t,i,r,n);f(a.vs,function(o,s){t.node(o).order=s}),Wr(t,r,a.vs)})}function Fe(e,n){f(n,function(r){f(r,function(t,i){e.node(t).order=i})})}function ot(e){var n=ut(e);f(e.graph().dummyChains,function(r){for(var t=e.node(r),i=t.edgeObj,a=st(e,n,i.v,i.w),o=a.path,s=a.lca,u=0,d=o[u],h=!0;r!==i.w;){if(t=e.node(r),h){for(;(d=o[u])!==s&&e.node(d).maxRank<t.rank;)u++;d===s&&(h=!1)}if(!h){for(;u<o.length-1&&e.node(d=o[u+1]).minRank<=t.rank;)u++;d=o[u]}e.setParent(r,d),r=e.successors(r)[0]}})}function st(e,n,r,t){var i=[],a=[],o=Math.min(n[r].low,n[t].low),s=Math.max(n[r].lim,n[t].lim),u,d;u=r;do u=e.parent(u),i.push(u);while(u&&(n[u].low>o||s>n[u].lim));for(d=u,u=t;(u=e.parent(u))!==d;)a.push(u);return{path:i.concat(a.reverse()),lca:d}}function ut(e){var n={},r=0;function t(i){var a=r;f(e.children(i),t),n[i]={low:a,lim:r++}}return f(e.children(),t),n}function dt(e,n){var r={};function t(i,a){var o=0,s=0,u=i.length,d=$(a);return f(a,function(h,c){var l=ht(e,h),v=l?e.node(l).order:u;(l||h===d)&&(f(a.slice(s,c+1),function(p){f(e.predecessors(p),function(w){var R=e.node(w),we=R.order;(we<o||v<we)&&!(R.dummy&&e.node(p).dummy)&&an(r,w,p)})}),s=c+1,o=v)}),a}return G(n,t),r}function ft(e,n){var r={};function t(a,o,s,u,d){var h;f(O(o,s),function(c){h=a[c],e.node(h).dummy&&f(e.predecessors(h),function(l){var v=e.node(l);v.dummy&&(v.order<u||v.order>d)&&an(r,l,h)})})}function i(a,o){var s=-1,u,d=0;return f(o,function(h,c){if(e.node(h).dummy==="border"){var l=e.predecessors(h);l.length&&(u=e.node(l[0]).order,t(o,d,c,s,u),d=c,s=u)}t(o,d,o.length,u,a.length)}),o}return G(n,i),r}function ht(e,n){if(e.node(n).dummy)return fe(e.predecessors(n),function(r){return e.node(r).dummy})}function an(e,n,r){if(n>r){var t=n;n=r,r=t}var i=e[n];i||(e[n]=i={}),i[r]=!0}function ct(e,n,r){if(n>r){var t=n;n=r,r=t}return g(e[n],r)}function lt(e,n,r,t){var i={},a={},o={};return f(n,function(s){f(s,function(u,d){i[u]=u,a[u]=u,o[u]=d})}),f(n,function(s){var u=-1;f(s,function(d){var h=t(d);if(h.length){h=B(h,function(w){return o[w]});for(var c=(h.length-1)/2,l=Math.floor(c),v=Math.ceil(c);l<=v;++l){var p=h[l];a[d]===d&&u<o[p]&&!ct(r,d,p)&&(a[p]=d,a[d]=i[d]=i[p],u=o[p])}}})}),{root:i,align:a}}function vt(e,n,r,t,i){var a={},o=pt(e,n,r,i),s=i?"borderLeft":"borderRight";function u(c,l){for(var v=o.nodes(),p=v.pop(),w={};p;)w[p]?c(p):(w[p]=!0,v.push(p),v=v.concat(l(p))),p=v.pop()}function d(c){a[c]=o.inEdges(c).reduce(function(l,v){return Math.max(l,a[v.v]+o.edge(v))},0)}function h(c){var l=o.outEdges(c).reduce(function(p,w){return Math.min(p,a[w.w]-o.edge(w))},Number.POSITIVE_INFINITY),v=e.node(c);l!==Number.POSITIVE_INFINITY&&v.borderType!==s&&(a[c]=Math.max(a[c],l))}return u(d,o.predecessors.bind(o)),u(h,o.successors.bind(o)),f(t,function(c){a[c]=a[r[c]]}),a}function pt(e,n,r,t){var i=new _,a=e.graph(),o=_t(a.nodesep,a.edgesep,t);return f(n,function(s){var u;f(s,function(d){var h=r[d];if(i.setNode(h),u){var c=r[u],l=i.edge(c,h);i.setEdge(c,h,Math.max(o(e,d,u),l||0))}u=d})}),i}function gt(e,n){return le(x(n),function(r){var t=Number.NEGATIVE_INFINITY,i=Number.POSITIVE_INFINITY;return In(r,function(a,o){var s=Et(e,o)/2;t=Math.max(a+s,t),i=Math.min(a-s,i)}),t-i})}function mt(e,n){var r=x(n),t=S(r),i=k(r);f(["u","d"],function(a){f(["l","r"],function(o){var s=a+o,u=e[s],d;if(u!==n){var h=x(u);d=o==="l"?t-S(h):i-k(h),d&&(e[s]=H(u,function(c){return c+d}))}})})}function wt(e,n){return H(e.ul,function(r,t){if(n)return e[n.toLowerCase()][t];var i=B(m(e,t));return(i[1]+i[2])/2})}function bt(e){var n=X(e),r=oe(dt(e,n),ft(e,n)),t={},i;f(["u","d"],function(o){i=o==="u"?n:x(n).reverse(),f(["l","r"],function(s){s==="r"&&(i=m(i,function(c){return x(c).reverse()}));var u=(o==="u"?e.predecessors:e.successors).bind(e),d=lt(e,i,r,u),h=vt(e,i,d.root,d.align,s==="r");s==="r"&&(h=H(h,function(c){return-c})),t[o+s]=h})});var a=gt(e,t);return mt(t,a),wt(t,e.graph().align)}function _t(e,n,r){return function(t,i,a){var o=t.node(i),s=t.node(a),u=0,d;if(u+=o.width/2,g(o,"labelpos"))switch(o.labelpos.toLowerCase()){case"l":d=-o.width/2;break;case"r":d=o.width/2;break}if(d&&(u+=r?d:-d),d=0,u+=(o.dummy?n:e)/2,u+=(s.dummy?n:e)/2,u+=s.width/2,g(s,"labelpos"))switch(s.labelpos.toLowerCase()){case"l":d=s.width/2;break;case"r":d=-s.width/2;break}return d&&(u+=r?d:-d),d=0,u}}function Et(e,n){return e.node(n).width}function xt(e){e=je(e),yt(e),Fn(bt(e),function(n,r){e.node(r).x=n})}function yt(e){var n=X(e),r=e.graph().ranksep,t=0;f(n,function(i){var a=k(m(i,function(o){return e.node(o).height}));f(i,function(o){e.node(o).y=t+a/2}),t+=a+r})}function Xt(e,n){var r=n&&n.debugTiming?wr:br;r("layout",function(){var t=r("  buildLayoutGraph",function(){return Ft(e)});r("  runLayout",function(){Lt(t,r)}),r("  updateInputGraph",function(){Nt(e,t)})})}function Lt(e,n){n("    makeSpaceForEdgeLabels",function(){At(e)}),n("    removeSelfEdges",function(){Wt(e)}),n("    acyclic",function(){hr(e)}),n("    nestingGraph.run",function(){Br(e)}),n("    rank",function(){Vr(je(e))}),n("    injectEdgeLabelProxies",function(){St(e)}),n("    removeEmptyRanks",function(){gr(e)}),n("    nestingGraph.cleanup",function(){qr(e)}),n("    normalizeRanks",function(){pr(e)}),n("    assignRankMinMax",function(){Vt(e)}),n("    removeEdgeLabelProxies",function(){Dt(e)}),n("    normalize.run",function(){Nr(e)}),n("    parentDummyChains",function(){ot(e)}),n("    addBorderSegments",function(){_r(e)}),n("    order",function(){it(e)}),n("    insertSelfEdges",function(){jt(e)}),n("    adjustCoordinateSystem",function(){Er(e)}),n("    position",function(){xt(e)}),n("    positionSelfEdges",function(){Ut(e)}),n("    removeBorderNodes",function(){qt(e)}),n("    normalize.undo",function(){Cr(e)}),n("    fixupEdgeLabelCoords",function(){Yt(e)}),n("    undoCoordinateSystem",function(){xr(e)}),n("    translateGraph",function(){Gt(e)}),n("    assignNodeIntersects",function(){Bt(e)}),n("    reversePoints",function(){$t(e)}),n("    acyclic.undo",function(){lr(e)})}function Nt(e,n){f(e.nodes(),function(r){var t=e.node(r),i=n.node(r);t&&(t.x=i.x,t.y=i.y,n.children(r).length&&(t.width=i.width,t.height=i.height))}),f(e.edges(),function(r){var t=e.edge(r),i=n.edge(r);t.points=i.points,g(i,"x")&&(t.x=i.x,t.y=i.y)}),e.graph().width=n.graph().width,e.graph().height=n.graph().height}var kt=["nodesep","edgesep","ranksep","marginx","marginy"],Ct={ranksep:50,edgesep:20,nodesep:50,rankdir:"tb"},Ot=["acyclicer","ranker","rankdir","align"],Mt=["width","height"],Pt={width:0,height:0},Rt=["minlen","weight","width","height","labeloffset"],Tt={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:"r"},It=["labelpos"];function Ft(e){var n=new _({multigraph:!0,compound:!0}),r=ne(e.graph());return n.setGraph(oe({},Ct,ee(r,kt),Y(r,Ot))),f(e.nodes(),function(t){var i=ne(e.node(t));n.setNode(t,Mn(ee(i,Mt),Pt)),n.setParent(t,e.parent(t))}),f(e.edges(),function(t){var i=ne(e.edge(t));n.setEdge(t,oe({},Tt,ee(i,Rt),Y(i,It)))}),n}function At(e){var n=e.graph();n.ranksep/=2,f(e.edges(),function(r){var t=e.edge(r);t.minlen*=2,t.labelpos.toLowerCase()!=="c"&&(n.rankdir==="TB"||n.rankdir==="BT"?t.width+=t.labeloffset:t.height+=t.labeloffset)})}function St(e){f(e.edges(),function(n){var r=e.edge(n);if(r.width&&r.height){var t=e.node(n.v),i=e.node(n.w),a={rank:(i.rank-t.rank)/2+t.rank,e:n};P(e,"edge-proxy",a,"_ep")}})}function Vt(e){var n=0;f(e.nodes(),function(r){var t=e.node(r);t.borderTop&&(t.minRank=e.node(t.borderTop).rank,t.maxRank=e.node(t.borderBottom).rank,n=k(n,t.maxRank))}),e.graph().maxRank=n}function Dt(e){f(e.nodes(),function(n){var r=e.node(n);r.dummy==="edge-proxy"&&(e.edge(r.e).labelRank=r.rank,e.removeNode(n))})}function Gt(e){var n=Number.POSITIVE_INFINITY,r=0,t=Number.POSITIVE_INFINITY,i=0,a=e.graph(),o=a.marginx||0,s=a.marginy||0;function u(d){var h=d.x,c=d.y,l=d.width,v=d.height;n=Math.min(n,h-l/2),r=Math.max(r,h+l/2),t=Math.min(t,c-v/2),i=Math.max(i,c+v/2)}f(e.nodes(),function(d){u(e.node(d))}),f(e.edges(),function(d){var h=e.edge(d);g(h,"x")&&u(h)}),n-=o,t-=s,f(e.nodes(),function(d){var h=e.node(d);h.x-=n,h.y-=t}),f(e.edges(),function(d){var h=e.edge(d);f(h.points,function(c){c.x-=n,c.y-=t}),g(h,"x")&&(h.x-=n),g(h,"y")&&(h.y-=t)}),a.width=r-n+o,a.height=i-t+s}function Bt(e){f(e.edges(),function(n){var r=e.edge(n),t=e.node(n.v),i=e.node(n.w),a,o;r.points?(a=r.points[0],o=r.points[r.points.length-1]):(r.points=[],a=i,o=t),r.points.unshift(ke(t,a)),r.points.push(ke(i,o))})}function Yt(e){f(e.edges(),function(n){var r=e.edge(n);if(g(r,"x"))switch((r.labelpos==="l"||r.labelpos==="r")&&(r.width-=r.labeloffset),r.labelpos){case"l":r.x-=r.width/2+r.labeloffset;break;case"r":r.x+=r.width/2+r.labeloffset;break}})}function $t(e){f(e.edges(),function(n){var r=e.edge(n);r.reversed&&r.points.reverse()})}function qt(e){f(e.nodes(),function(n){if(e.children(n).length){var r=e.node(n),t=e.node(r.borderTop),i=e.node(r.borderBottom),a=e.node($(r.borderLeft)),o=e.node($(r.borderRight));r.width=Math.abs(o.x-a.x),r.height=Math.abs(i.y-t.y),r.x=a.x+r.width/2,r.y=t.y+r.height/2}}),f(e.nodes(),function(n){e.node(n).dummy==="border"&&e.removeNode(n)})}function Wt(e){f(e.edges(),function(n){if(n.v===n.w){var r=e.node(n.v);r.selfEdges||(r.selfEdges=[]),r.selfEdges.push({e:n,label:e.edge(n)}),e.removeEdge(n)}})}function jt(e){var n=X(e);f(n,function(r){var t=0;f(r,function(i,a){var o=e.node(i);o.order=a+t,f(o.selfEdges,function(s){P(e,"selfedge",{width:s.label.width,height:s.label.height,rank:o.rank,order:a+ ++t,e:s.e,label:s.label},"_se")}),delete o.selfEdges})})}function Ut(e){f(e.nodes(),function(n){var r=e.node(n);if(r.dummy==="selfedge"){var t=e.node(r.e.v),i=t.x+t.width/2,a=t.y,o=r.x-i,s=t.height/2;e.setEdge(r.e,r.label),e.removeNode(n),r.label.points=[{x:i+2*o/3,y:a-s},{x:i+5*o/6,y:a-s},{x:i+o,y:a},{x:i+5*o/6,y:a+s},{x:i+2*o/3,y:a+s}],r.label.x=r.x,r.label.y=r.y}})}function ee(e,n){return H(Y(e,n),Number)}function ne(e){var n={};return f(e,function(r,t){n[t.toLowerCase()]=r}),n}export{_ as G,Mn as d,f,g as h,b as i,Xt as l,m,O as r,ve as u};
