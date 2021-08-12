<?php

$members = array(
  array('first_name' => 'Mark Gabrielle', 'middle_name' => 'Recoco', 'last_name' => 'Cay'),
);
$post_data = json_decode(file_get_contents('php://input'));
$api->response($members, 200);