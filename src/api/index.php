<?php
    include 'connect.php';

    $sql = "select * from category_index" ;
    $result = $conn->query($sql);
    // var_dump($result);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $res = array(
        'data'=>$row
    );
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>