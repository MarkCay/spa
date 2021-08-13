<?php
require "config.php";
require "database/Database.php";
/* Turn off PHP warning */
error_reporting(E_ERROR | E_PARSE);
class Api
{
  public function __construct($x_api_key_config, $basic_auth_config)
  {
    $headers = getallheaders();
    /* If X-API Key is enabled */
    if ($x_api_key_config['is_enabled']) {
      if (!isset($headers[strtolower($x_api_key_config['key'])])) {
        $this->response(array(
          'message' => 'API key not found'
        ), 401);
      } else if (($headers[strtolower($x_api_key_config['key'])]) !== $x_api_key_config['value']) {
        $this->response(array(
          'message' => 'API invalid!'
        ), 401);
      }
    }
    /* If Basic authentication is enabled */
    if ($basic_auth_config['is_enabled']) {
      header('WWW-Authenticate: Basic realm="My Realm"');
      header('HTTP/1.0 401 Unauthorized');
      $user = $_SERVER['PHP_AUTH_USER'];
      $pass = $_SERVER['PHP_AUTH_PW'];
      if ($user !== $basic_auth_config['user'] || $pass !== $basic_auth_config['password']) {
        $this->response(array(
          'message' => 'Invalid username or password'
        ), 401);
      }
    }
  }
  public static function response($data, int $code = 200)
  {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Allow-Origin, Authorization, Basic, Access-Control-Allow-Credentials");
    header("Access-Control-Allow-Methods: GET,POST,OPTIONS");
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == "OPTIONS") {
      die();
    }
    http_response_code($code);
    echo json_encode($data);
    die();
  }
}

$api_path = str_replace('index.php', '', $_SERVER['PHP_SELF']);
$path = str_replace($api_path, '', $_SERVER['REDIRECT_URL']);
// $redirect_url = $_SERVER['REDIRECT_URL'];
$path_folder = "paths";
$api_lookup = "$path_folder/$path/index.php";
$paths = explode('/', $path);
array_pop($paths);
$removed_last_path = implode('/', $paths);
$api_lookup_with_params = "$path_folder/$removed_last_path/_.php";
$request_method = strtolower($_SERVER['REQUEST_METHOD']);
$api_lookup_with_http_method = "$path_folder/$path/index_$request_method.php";

$params = explode('/', $path);
array_shift($params);

$api = new Api($x_api_key, $basic_auth);
$db_config = new DatabaseConfig;
$db_config->host = $database['host'];
$db_config->database = $database['database'];
$db_config->user = $database['user'];
$db_config->password = $database['password'];
$db = new Database($db_config, true);
include($api_lookup_with_params);
include($api_lookup);
include("$api_lookup_with_http_method");
$api->response(array(
  'message' => 'API not found'
), 404);