(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{329:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getUserData=void 0;var o,i=n(104),a=(o=i)&&o.__esModule?o:{default:o};t.getUserData=function(){return new Promise(function(e,t){a.default.database().ref("usersData/"+a.default.auth().currentUser.uid).on("value",function(t){e(t.val())},function(e){t(e)})})}},330:function(e,t){e.exports={ProfileWindow:"_3q3ooEeiiniA9NGcPxYf9b",profileWindow:"_3q3ooEeiiniA9NGcPxYf9b",ProfileWindow__Main:"_2z1u6qHRs8DI-qF8IJnbBH",profileWindowMain:"_2z1u6qHRs8DI-qF8IJnbBH",ProfileWindow__Main__ProfilePic:"_3ucP5JqZyAd8k_iZllVNuR",profileWindowMainProfilePic:"_3ucP5JqZyAd8k_iZllVNuR",ProfileWindow__Main__Verified:"_27yGWKFlZdeY2x5HCchRzz",profileWindowMainVerified:"_27yGWKFlZdeY2x5HCchRzz",ProfileWindow__Main__MetaData:"MIpCcOtJhwvaEjim3fBFg",profileWindowMainMetaData:"MIpCcOtJhwvaEjim3fBFg",Highlight:"PCd4gyh8eysWuuJoSnfLL",highlight:"PCd4gyh8eysWuuJoSnfLL",MobileBorder:"Uqjwgv8SwUsQuHXC9hZaf",mobileBorder:"Uqjwgv8SwUsQuHXC9hZaf"}},574:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),i=c(o),a=n(123),r=n(329),l=c(n(105)),u=c(n(104)),f=c(n(330));function c(e){return e&&e.__esModule?e:{default:e}}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var h=function(e){function t(){var e,n,o,i,a,r,l;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var u=arguments.length,f=new Array(u),c=0;c<u;c++)f[c]=arguments[c];return o=this,n=!(i=(e=p(t)).call.apply(e,[this].concat(f)))||"object"!==s(i)&&"function"!=typeof i?y(o):i,a=y(y(n)),l={userProfile:{},loading:!0},(r="state")in a?Object.defineProperty(a,r,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[r]=l,n}var n,a,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(t,o.Component),n=t,(a=[{key:"componentDidMount",value:function(){var e=this;u.default.auth().onAuthStateChanged(function(t){t&&(0,r.getUserData)().then(function(t){e.setState({userProfile:t,loading:!1})}).catch(function(e){})})}},{key:"componentWillUnmount",value:function(){this.setState({userProfile:{}})}},{key:"render",value:function(){var e=i.default.createElement(l.default,null);return this.state.loading||(e=i.default.createElement("div",{className:f.default.ProfileWindow__Main},i.default.createElement("div",{className:f.default.ProfileWindow__Main__ProfilePic},i.default.createElement("img",{src:this.state.userProfile.photoURL,alt:this.state.userProfile.displayName+"-profile"}),i.default.createElement("img",{style:{display:this.props.isVerified?"block":"none"},className:f.default.ProfileWindow__Main__Verified,src:"https://www.continent8.com/wp-content/uploads/2017/10/tick-icon.png",alt:"verified-check"}),i.default.createElement("span",null," ",this.state.userProfile.displayName," ")),i.default.createElement("div",{className:f.default.ProfileWindow__Main__MetaData},i.default.createElement("span",{className:f.default.Highlight}," Description "),i.default.createElement("div",{className:f.default.MobileBorder},i.default.createElement("span",null," ",this.state.userProfile.metaData," "))))),i.default.createElement("div",{className:f.default.ProfileWindow},e)}}])&&d(n.prototype,a),c&&d(n,c),t}();t.default=(0,a.connect)(function(e){})(h)}}]);
//# sourceMappingURL=4.js.map