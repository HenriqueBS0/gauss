<?php

use HenriqueBS0\Gauss\Controller;
use HenriqueBS0\Router\Router;

require_once __DIR__ . '/vendor/autoload.php';

define('DIRETORIO', __DIR__);

$router = new Router();

$router->get('/', [Controller::class, 'view']);

$router->resolve();