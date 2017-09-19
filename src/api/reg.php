<?php
    /*
        sql语句返回值
            * select : 数据
            * insert : true/false
            * delect : true/false
            * update : true/false
        XSS跨域脚本攻击
            * 永远不要相信客户端输入的信息的安全性
            * 对输入进行过滤
            * 对输出进行处理
     */
    include 'connect.php';
    
    $username = isset($_GET['username']) ? $_GET['username'] : 'lantao1015@qq.com';
    $password = isset($_GET['password']) ? $_GET['password'] : '123456';
    // $email = isset($_GET['email']) ? $_GET['email'] : '';
    // $grade = isset($_GET['grade']) ? $_GET['grade'] : '';
    // $gender = isset($_GET['gender']) ? $_GET['gender'] : '';
    // $birthday = isset($_GET['birthday']) ? $_GET['birthday'] : '';
    // $phone = isset($_GET['phone']) ? $_GET['phone'] : '110';

    //查看用户名是否已经存在
    $sql = "select username from user where username ='$username'";
    $result = $conn->query($sql);
    // var_dump($result);

    // 如果用户名已经存在
    // 给前端返回一个fail
    
    if($result->num_rows>0){
        echo "fail";
    }else{
        // 密码md5加密
        $password = md5($password);


        /*
            password_hash()     //对密码加密.
                * PASSWORD_DEFAULT：Bcrypt加密算法，字段超过60个字符长度，
                * PASSWORD_BCRYPT：字符串长度总为60。
            password_verify()    //验证已经加密的密码，检验其hash字串是否一致.
         */
        // $password = password_hash($password,PASSWORD_DEFAULT);

        $sql = "insert into user (username,password) values('$username','$password')";
        // '$username','$password','$email','$grade','$gender','$birthday','$phone'


        // 获取查询结果
        $result = $conn->query($sql);

        if ($result) {
            echo "插入数据成功";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    
    

    // 释放查询内存(销毁)
    //$result->free();

    //关闭连接
    $conn->close();
?>