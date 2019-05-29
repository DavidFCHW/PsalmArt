<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 07/05/2019
 * Time: 16:02
 */

if(isset($_GET['psalm'])) {
    $file = fopen("psalm_req.txt", "w") or die ("Unable to open file");
    fwrite($file, $_GET['psalm']);
    fclose($file);
    exec('node server.js');
    exec('node ImageScript.js');
    readFile('image.html');
}