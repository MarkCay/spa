<?php
require "QueryBuilder.php";
require "DatabaseConfig.php";
class Database extends QueryBuilder
{
  private DatabaseConfig $config;
  private $db;
  private $stmt;
  public function __construct(DatabaseConfig $config, bool $do_connect = FALSE)
  {
    $this->config = $config;
    if ($do_connect) {
      $this->connect();
    }
  }

  public function connect()
  {
    $host = $this->config->host;
    $database = $this->config->database;
    $dsn = "mysql:host=$host;dbname=$database";
    try {
      $this->db = new PDO($dsn, $this->config->user, $this->config->password);
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
      die("<b>Connection failed: </b>" . $e->getMessage());
    }
  }

  public function disconnect()
  {
    $this->db = NULL;
  }

  private function execute(string $query)
  {
    $this->stmt = $this->db->prepare($query);
    $this->stmt->execute();
  }

  public function query(string $query)
  {
    $this->execute($query);
    return $this;
  }

  public function all()
  {
    $this->stmt->setFetchMode(PDO::FETCH_ASSOC);
    return $this->stmt->fetchAll();
  }

  public function firstRow()
  {
    $this->stmt->setFetchMode(PDO::FETCH_ORI_FIRST);
    return $this->stmt->fetch();
  }

  public function lastRow()
  {
    $all = $this->all();
    return $all[count($all) - 1];
  }

  public function lastInsertId()
  {
    $this->db->lastInsertId();
  }

  public function lastQueryString()
  {
    return $this->stmt->queryString;
  }

  public function get()
  {
    $query = "";
    if (count($this->select) !== 0) {
      $query .= "SELECT ";
      $query .= implode(', ', $this->select);
    }
    if ($this->from !== '') {
      $query .= " FROM $this->from";
    }
    if (count($this->where) !== 0) {
      $where = " WHERE ";
      foreach ($this->where as $value) {
        if (is_array($value)) {
          foreach ($value as $k => $v) {
            $where .= "$k = '$v'";
          }
        } else {
          $where .= "$value";
        }
      }
      $query .= $where;
    }
    // debug($query, TRUE);
    $this->query($query);
    return $this;
  }
}