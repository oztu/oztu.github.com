var styles = document.createElement('link');
styles.src='https://oztu.github.io/turn/clippy.css';
document.body.appendChild(styles);

var jqueryScript = document.createElement('script');
jqueryScript.src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
document.body.appendChild(jqueryScript);

jqueryScript.onload = loadClippy;

function loadClippy(){
	var script = document.createElement('script');
	script.src='https://oztu.github.io/turn/clippy.min.js';
	document.body.appendChild(script);
	script.onload = initTurnHelper;
}


function initTurnHelper(){
	 clippy.load('Clippy', function(agent) {
        // Do anything with the loaded agent
        agent.show();
        window.a = agent;
    });
}