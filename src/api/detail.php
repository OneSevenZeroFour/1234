<?php
    include 'connect.php';
    $goodsid = isset($_GET['goodsid']) ? $_GET['goodsid'] : '';
    $cate = isset($_GET['cate']) ? $_GET['cate'] : '';
    // $cartqty = isset($_GET['cartqty']) ? $_GET['cartqty'] : '';
    $sql = "select * from goods where id = '$goodsid'";
    // $sql = "select * from goods where id = 00000003";

    // if($cate){
    //     $sql .= "and category = '$cate'";
    // }
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    //格式化数组
    $res = array(
        'data'=>$row,
        'status'=>200,
        'msg'=>'success'
        // 'cartqty'=>$cartqty
    );
    // var_dump($row);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    $conn->close();

?>