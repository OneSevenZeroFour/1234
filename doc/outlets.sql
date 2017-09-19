/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : outlets

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-13 10:14:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `our_price` decimal(10,2) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('0000000001', 'Versace Collection 范思哲 秋冬新品男款针织毛衫V700471S ', '20', '599.00', 'img/oplist/a0.JPG,img/oplist/a1.JPG,img/oplist/a2.JPG,img/oplist/a3.JPG,img/oplist/a4p.JPG,img/oplist/a5.JPG', null, '2700.00', '2017-09-08 13:08:36');
INSERT INTO `goods` VALUES ('0000000002', 'BALLY 巴利 男式牛皮单肩包TERLAGO/280', '77', '4150.00', 'img/oplist/g1.JPG,img/oplist/g2.JPG,img/oplist/g3.JPG,img/oplist/g4.JPG,img/oplist/g2.JPG', null, '6500.00', '2017-09-07 20:57:52');
INSERT INTO `goods` VALUES ('0000000003', 'Versace Collection 范思哲 秋冬新品男款针织毛衫V700472S ', '44', '599.00', 'img/oplist/f4.png', null, '2700.00', '2017-09-07 19:20:18');
INSERT INTO `goods` VALUES ('0000000004', 'MICHAEL KORS 迈克科尔斯 新品女款牛皮单肩包', '34', '1690.00', 'img/oplist/m1.JPG,img/oplist/m2.JPG,img/oplist/m3.JPG', null, '2450.00', '2017-09-07 19:10:25');
INSERT INTO `goods` VALUES ('0000000005', 'BALLY 巴利 男款牛皮配条纹帆布板扣皮带B BUCKLE 35 ', '123', '1790.00', 'img/oplist/k1.png,img/oplist/k2.JPG,img/oplist/k3.JPG,img/oplist/k4.JPG', null, '2900.00', '2017-09-07 19:13:32');
INSERT INTO `goods` VALUES ('0000000006', 'BALLY 巴利 男款牛皮斜挎包POOLEY SM', '765', '4150.00', 'img/oplist/a10.JPG', null, '6390.00', '2017-09-04 14:53:41');
INSERT INTO `goods` VALUES ('0000000007', 'BURBERRY 巴宝莉 新品男款长袖棉质衬衫3991159', '344', '1299.00', 'img/oplist/f1.png,img/oplist/f2.JPG,img/oplist/f3.JPG', null, '2500.00', '2017-09-07 17:32:23');
INSERT INTO `goods` VALUES ('0000000008', ' BURBERRY 巴宝莉女款经典格纹手提包 3939377', '54', '4999.00', 'img/oplist/m4.JPG', null, '2500.00', '2017-09-07 19:28:09');
INSERT INTO `goods` VALUES ('0000000009', 'BURBERRY 巴宝莉 男款纯棉POLO衫3982164', '345', '1199.00', 'img/oplist/v1.png,img/oplist/b2.jpg,img/oplist/b3.JPG,img/oplist/b4.JPG,img/oplist/b5.JPG,img/oplist/b2.JPG', null, '10750.00', '2017-09-08 14:08:56');
INSERT INTO `goods` VALUES ('0000000010', 'BALLY 巴利 男式牛皮皮带SASENT-35/802-115', '56', '1890.00', 'img/oplist/m4.JPG', null, '2100.00', '2017-09-07 19:15:31');
INSERT INTO `goods` VALUES ('0000000011', 'Versace Collection 范思哲 新品男款短袖圆领T恤V800683 ', '21', '1290.00', 'img/oplist/c1.jpg', null, '3200.00', '2017-09-07 19:17:13');
INSERT INTO `goods` VALUES ('0000000012', ' BURBERRY 巴宝莉 男款纯棉针织T恤3974220', '55', '899.00', 'img/oplist/m1.png', null, '1900.00', '2017-09-07 19:17:20');
INSERT INTO `goods` VALUES ('0000000013', '清仓区 ARMANI JEANS 阿玛尼牛仔 新品男款纯棉短袖T恤', '35', '399.00', 'img/oplist/m1.JPG,img/oplist/m2.JPG,img/oplist/m3.JPG', null, '1400.00', '2017-09-07 19:27:19');
INSERT INTO `goods` VALUES ('0000000014', 'BALLY 巴利 新品时尚男款牛皮斜挎包单肩包TERIN0 ', '8', '2599.00', 'img/oplist/v2.JPG,img/oplist/v3.JPG,img/oplist/v4.JPG,img/oplist/v6.JPG,img/oplist/v5.JPG', null, '1150.00', '2017-09-07 19:27:08');
INSERT INTO `goods` VALUES ('0000000015', 'MICHAEL KORS 迈克科尔斯 女款牛皮手提包30T3STVT7L ', '1', '2590.00', 'img/oplist/f1.png,img/oplist/f2.JPG,img/oplist/f3.JPG', null, '5690.00', '2017-09-09 17:53:28');
INSERT INTO `goods` VALUES ('0000000016', 'FURLA FURLA 芙拉 新品女款牛皮单肩包851166 CORALLO\r\n', '324', '1499.00', 'img/oplist/a0.JPG,img/oplist/a1.JPG,img/oplist/a2.JPG,img/oplist/a3.JPG,img/oplist/a0.JPG,img/oplist/a1.JPG', null, '3700.00', '2017-09-07 20:44:06');
INSERT INTO `goods` VALUES ('0000000017', ' BURBERRY 巴宝莉 新品男款纯棉衬衫4008385 2316B', '54', '1799.00', 'img/oplist/k1.png,img/oplist/k2.JPG,img/oplist/k3.JPG,img/oplist/k4.JPG', null, '3150.00', '2017-09-09 17:53:19');
INSERT INTO `goods` VALUES ('0000000018', 'BURBERRY 巴宝莉 男款开襟外套4015559', '86', '2390.00', 'img/oplist/a0.JPG,img/oplist/a1.JPG,img/oplist/a2.JPG,img/oplist/a3.JPG', null, '2900.00', '2017-09-07 20:43:14');
INSERT INTO `goods` VALUES ('0000000019', 'GUCCI 古驰 新品男款小牛皮腰带皮带322293 AR41N ', '21', '1899.00', 'img/oplist/a10.JPG', null, '3200.00', '2017-09-09 17:54:51');
INSERT INTO `goods` VALUES ('0000000020', 'BALLY 巴利 新品时尚男款牛皮钱包钱夹TALMAN 6/271', '89', '3590.00', 'img/oplist/v2.JPG,img/oplist/v3.JPG,img/oplist/v4.JPG,img/oplist/v6.JPG,img/oplist/v5.JPG', null, '3300.00', '2017-09-07 19:20:01');
INSERT INTO `goods` VALUES ('0000000021', ' MICHAEL KORS 迈克科尔斯 女款牛皮斜挎包', '123', '2190.00', 'img/oplist/a11.jpg', null, '5800.00', '2017-09-04 14:54:23');
INSERT INTO `goods` VALUES ('0000000022', 'BURBERRY 巴宝莉 男款纯棉POLO衫3995507', '34', '1590.00', 'img/oplist/m4.JPG', null, '3150.00', '2017-09-07 19:27:55');
INSERT INTO `goods` VALUES ('0000000023', 'GUCCI 古驰 男款牛皮皮带411924 CWC1N 1000', '54', '3190.00', 'img/oplist/c1.jpg', null, '2100.00', '2017-09-07 19:28:04');
INSERT INTO `goods` VALUES ('0000000024', 'BURBERRY 巴宝莉 男款纯棉针织T恤4021426', '22', '899.00', 'img/oplist/a11.jpg', null, '3300.00', '2017-09-04 14:54:26');
INSERT INTO `goods` VALUES ('0000000025', 'BURBERRY 巴宝莉 新品男款纯棉衬衫4554724', '443', '1799.00', 'img/oplist/m1.JPG,img/oplist/m2.JPG,img/oplist/m3.JPG', null, '1400.00', '2017-09-09 17:53:09');
INSERT INTO `goods` VALUES ('0000000026', '清仓区 BURBERRY 巴宝莉 男款毛衫3943647', '45', '1200.00', 'img/oplist/m4.JPG', null, '2900.00', '2017-09-09 17:53:13');
INSERT INTO `goods` VALUES ('0000000027', 'BURBERRY 巴宝莉 男款纯棉POLO衫4010694', '98', '1590.00', 'img/oplist/a0.JPG,img/oplist/a1.JPG,img/oplist/a2.JPG,img/oplist/a3.JPG', null, '4000.00', '2017-09-09 17:55:35');
INSERT INTO `goods` VALUES ('0000000028', 'BURBERRY 巴宝莉 新品男款长裤4023258 41000', '90', '1890.00', 'img/oplist/m1.JPG,img/oplist/m2.JPG,img/oplist/m3.JPG', null, '2100.00', '2017-09-07 19:28:19');
INSERT INTO `goods` VALUES ('0000000029', ' FERRAGAMO/菲拉格慕 女款小牛皮斜挎包21E480 060021', '34', '6990.00', 'img/oplist/v2.JPG,img/oplist/v3.JPG,img/oplist/v4.JPG,img/oplist/v6.JPG,img/oplist/v5.JPG', null, '8400.00', '2017-09-09 17:55:29');
INSERT INTO `goods` VALUES ('0000000030', 'BURBERRY 巴宝莉 新品男款牛仔裤4000807', '21', '1499.00', 'img/oplist/k1.png,img/oplist/k2.JPG,img/oplist/k3.JPG,img/oplist/k4.JPG', null, '2800.00', '2017-09-09 17:54:01');
INSERT INTO `goods` VALUES ('0000000031', 'BURBERRY 巴宝莉 新品男款衬衫3991162', '43', '1299.00', 'img/oplist/f1.png,img/oplist/f2.JPG,img/oplist/f3.JPG', null, '2600.00', '2017-09-07 19:28:14');
INSERT INTO `goods` VALUES ('0000000032', ' EMPORIO ARMANI 安普里奥.阿玛尼 秋冬新品男款', '67', '990.00', 'img/oplist/m1.JPG,img/oplist/m2.JPG,img/oplist/m3.JPG', null, '2600.00', '2017-09-09 17:52:57');
INSERT INTO `goods` VALUES ('0000000033', 'Versace Collection 范思哲 新品男款短袖圆领T恤V800683 ', '65', '1490.00', 'img/oplist/a0.JPG,img/oplist/a1.JPG,img/oplist/a2.JPG,img/oplist/a3.JPG', null, '1500.00', '2017-09-08 11:23:27');
INSERT INTO `goods` VALUES ('0000000034', 'EMPORIO ARMANI 安普里奥.阿玛尼 男款手提包', '34', '3990.00', 'img/oplist/f1.png,img/oplist/f2.JPG,img/oplist/f3.JPG', null, '2200.00', '2017-09-09 17:53:50');
INSERT INTO `goods` VALUES ('0000000035', 'EMPORIO ARMANI 安普里奥.阿玛尼 男款斜挎包', '12', '2900.00', 'img/oplist/c1.jpg', null, '2900.00', '2017-09-09 17:54:38');
INSERT INTO `goods` VALUES ('0000000036', '清仓区 BALLY 巴利 男款牛皮斜挎包KENNY SM', '16', '2690.00', 'img/oplist/f1.png,img/oplist/f2.JPG,img/oplist/f3.JPG', null, '5700.00', '2017-09-09 17:52:41');
INSERT INTO `goods` VALUES ('0000000037', 'BALLY 巴利 新品时尚男款小牛皮手提包斜挎包 TIGAN 261', '12', '4150.00', 'img/oplist/g1.JPG,img/oplist/g2.JPG,img/oplist/g3.JPG,img/oplist/g4.JPG,img/oplist/g2.JPG', null, '4200.00', '2017-09-09 17:52:30');
INSERT INTO `goods` VALUES ('0000000038', 'MICHAEL KORS 迈克科尔斯 新品女款牛皮手提斜挎包', '15', '2300.00', 'img/oplist/a0.JPG,img/oplist/a1.JPG,img/oplist/a2.JPG,img/oplist/a3.JPG', null, '6750.00', '2017-09-09 17:52:46');
INSERT INTO `goods` VALUES ('0000000039', ' FURLA FURLA 芙拉 新品女款牛皮单肩包851165 GINEPRO', '23', '2190.00', 'img/oplist/c1.jpg', null, '6500.00', '2017-09-09 17:54:35');
INSERT INTO `goods` VALUES ('0000000040', 'BURBERRY 巴宝莉 女款套头衫3968495', '678', '990.00', 'img/oplist/k1.png,img/oplist/k2.JPG,img/oplist/k3.JPG,img/oplist/k4.JPG', null, '3300.00', '2017-09-09 17:54:23');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creat_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('0000000001', '110', '123', '2017-09-05 19:17:43');
INSERT INTO `user` VALUES ('0000000018', '18124092479', '9c410d1799d3621361cce73b42f5fc45', '2017-09-06 11:25:28');
INSERT INTO `user` VALUES ('0000000013', 'lantao1015@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-06 11:21:00');
