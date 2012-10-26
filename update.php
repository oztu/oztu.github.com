<?php 

$githubIpAddresses = array('207.97.227.253','50.57.128.197','108.171.174.178');

if(!in_array($_SERVER['REMOTE_ADDR'], $githubIpAddresses)){
    die("I won't listen to you.");
}


echo exec('git pull');

?>
