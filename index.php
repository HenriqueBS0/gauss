<?php

use HenriqueBS0\Router\Router;

require_once __DIR__ . '/vendor/autoload.php';

$router = new Router();

$router->get('/', function() {
    require_once(__DIR__ . '/src/view.php');
});

$router->resolve();