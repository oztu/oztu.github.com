var styles = document.createElement('link');
styles.src='https://oztu.github.io/turn/clippy.css';
document.body.appendChild(styles);
var script = document.createElement('script');
script.src='https://oztu.github.io/turn/clippy.min.js';
document.body.appendChild(script);
script.onload = initTurnHelper;

function initTurnHelper(){
	alert('ready!');
}