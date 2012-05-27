<?php

require_once dirname(__FILE__) . '/github-api3-php/lib/vendor/Symfony/Component/ClassLoader/UniversalClassLoader.php';

/**
 * Configure the autoloader
 *
 * The Symfony ClassLoader Component is used, but could easy be substituted for
 * another autoloader.
 *
 * @link https://github.com/symfony/ClassLoader
 * @link http://symfony.com/doc/current/cookbook/tools/autoloader.html
 */
$loader = new Symfony\Component\ClassLoader\UniversalClassLoader();
// Register the location of the GitHub namespace
$loader->registerNamespaces(array(
    'Buzz'              => __DIR__.'/github-api3-php/lib/vendor/Buzz/lib',
    'GitHub'            => __DIR__.'/github-api3-php/lib'
));
$loader->register();