(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{329:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getUserData=void 0;var i,o=n(104),a=(i=o)&&i.__esModule?i:{default:i};t.getUserData=function(){return new Promise(function(e,t){a.default.database().ref("usersData/"+a.default.auth().currentUser.uid).on("value",function(t){e(t.val())},function(e){t(e)})})}},330:function(e,t){e.exports={ProfileWindow:"_3q3ooEeiiniA9NGcPxYf9b",profileWindow:"_3q3ooEeiiniA9NGcPxYf9b",ProfileWindow__Main:"_2z1u6qHRs8DI-qF8IJnbBH",profileWindowMain:"_2z1u6qHRs8DI-qF8IJnbBH",ProfileWindow__Main__ProfilePic:"_3ucP5JqZyAd8k_iZllVNuR",profileWindowMainProfilePic:"_3ucP5JqZyAd8k_iZllVNuR",ProfileWindow__Main__Verified:"_27yGWKFlZdeY2x5HCchRzz",profileWindowMainVerified:"_27yGWKFlZdeY2x5HCchRzz",ProfileWindow__Main__MetaData:"MIpCcOtJhwvaEjim3fBFg",profileWindowMainMetaData:"MIpCcOtJhwvaEjim3fBFg",Highlight:"PCd4gyh8eysWuuJoSnfLL",highlight:"PCd4gyh8eysWuuJoSnfLL",MobileBorder:"Uqjwgv8SwUsQuHXC9hZaf",mobileBorder:"Uqjwgv8SwUsQuHXC9hZaf"}},574:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),o=s(i),a=n(124),r=n(123),l=n(329),u=s(n(105)),f=s(n(104)),c=s(n(330));function s(e){return e&&e.__esModule?e:{default:e}}function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var m=function(e){function t(){var e,n,i,o,a,r,l;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var u=arguments.length,f=new Array(u),c=0;c<u;c++)f[c]=arguments[c];return i=this,n=!(o=(e=_(t)).call.apply(e,[this].concat(f)))||"object"!==d(o)&&"function"!=typeof o?y(i):o,a=y(y(n)),l={userProfile:{},loading:!0},(r="state")in a?Object.defineProperty(a,r,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[r]=l,n}var n,a,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,i.Component),n=t,(a=[{key:"componentDidMount",value:function(){var e=this;f.default.auth().onAuthStateChanged(function(t){t&&(0,l.getUserData)().then(function(t){e.setState({userProfile:t,loading:!1})}).catch(function(e){})})}},{key:"componentWillUnmount",value:function(){this.setState({userProfile:{}})}},{key:"render",value:function(){var e=this.props.isAuthenticated?null:o.default.createElement(r.Redirect,{to:"/"}),t=o.default.createElement(u.default,null);return this.state.loading||(t=o.default.createElement("div",{className:c.default.ProfileWindow__Main},o.default.createElement("div",{className:c.default.ProfileWindow__Main__ProfilePic},o.default.createElement("img",{src:this.state.userProfile.photoURL,alt:this.state.userProfile.displayName+"-profile"}),o.default.createElement("img",{style:{display:this.props.isVerified?"block":"none"},className:c.default.ProfileWindow__Main__Verified,src:"https://www.continent8.com/wp-content/uploads/2017/10/tick-icon.png",alt:"verified-check"}),o.default.createElement("span",null," ",this.state.userProfile.displayName," ")),o.default.createElement("div",{className:c.default.ProfileWindow__Main__MetaData},o.default.createElement("span",{className:c.default.Highlight}," Description "),o.default.createElement("div",{className:c.default.MobileBorder},o.default.createElement("span",null," ",this.state.userProfile.metaData," "))))),o.default.createElement("div",{className:c.default.ProfileWindow},e,t)}}])&&p(n.prototype,a),s&&p(n,s),t}();t.default=(0,a.connect)(function(e){return{isAuthenticated:e.auth.isAuthenticated}})(m)}}]);
//# sourceMappingURL=4.js.map