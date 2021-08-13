<?php

class QueryBuilder
{
  public array $select = [];
  public string $from;
  public array $where = [];
  private $table;
  public array $join = [];

  public function select(string $select)
  {
    array_push($this->select, $select);
    return $this;
  }

  public function from(string $from)
  {
    $this->from = $from;
    return $this;
  }

  private function is_string($data)
  {
    return is_string($data) or is_numeric($data);
  }

  public function where($p1, $p2 = NULL, $p3 = NULL, $p4 = NULL)
  {
    $where_stmt = "";

    if (is_array($p1)) {
    }

    debug($where_stmt);

    return $this;
  }

  // public function where($p1, $p2, $p3, $p4 = 'AND')
  // {
  // }

  public function join(string $table, $where)
  {
    array_push($this->join, [$table, $where]);
  }
}