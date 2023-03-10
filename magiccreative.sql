/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : magiccreative

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 09/03/2023 20:09:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for claims
-- ----------------------------
DROP TABLE IF EXISTS `claims`;
CREATE TABLE `claims`  (
  `claims_id` int(255) NOT NULL COMMENT '可以随机，也可以自增长',
  `claims_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '索赔号：随机数就行用uuid吧',
  `claims_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '申请索赔的时间年月日时分秒',
  `claims_money` float(255, 2) NULL DEFAULT NULL COMMENT '申请索赔的金额，不能超过保险赔偿的最大金额',
  `claims_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '申请的转台 approved同意  negotiation理赔成功， blocked申请失败',
  `policies_id` int(255) NULL DEFAULT NULL COMMENT '购买的保险订单id，可以从这个在policies中找到订单信息从而找到这个保险的最大赔偿金额',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '申请索赔描述',
  `root_id` int(11) NULL DEFAULT NULL COMMENT '处理索赔的保险员',
  PRIMARY KEY (`claims_id`) USING BTREE,
  INDEX `policies_id`(`policies_id`) USING BTREE,
  INDEX `root_id`(`root_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of claims
-- ----------------------------
INSERT INTO `claims` VALUES (1, '2023040401', '20230404', 15000.00, 'approved', 1, '', NULL);
INSERT INTO `claims` VALUES (2, '2023040402', '20230404', 20000.00, 'negotiation', 1, NULL, NULL);
INSERT INTO `claims` VALUES (3, '2023050501', '20230505', 200000.00, 'blocked', 2, NULL, NULL);
INSERT INTO `claims` VALUES (4, '2023060601', '20230606', 50000.00, 'negotiation', 2, NULL, NULL);

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `cust_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '客户id',
  `cust_account` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '客户账号',
  `cust_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '客户密码',
  `cust_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '客户名字',
  `role` int(1) NULL DEFAULT 2 COMMENT '客户的权限 没用 0超管 1保险员 2用户，用户全部默认是2',
  `cust_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '地址',
  `cust_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '手机',
  `cust_birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '生日',
  `cust_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '邮件',
  `cust_sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '性别  后面需要的话用户表可以加上一个头像',
  PRIMARY KEY (`cust_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 123 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, 'test01', '123', '欧阳烨', 3, '湖南省张家界市吉首大学仙人阁', '13500000000', '20010927', '2247678912', '女');
INSERT INTO `customer` VALUES (2, 'test02', '123', '许建胜', 3, '湖北省武汉市', '13888888888', '20010910', '960455454@qq.com', '男');
INSERT INTO `customer` VALUES (5, 'test03', '123', '李志文', 3, '湖南省', '12222222222', '20010909', '2222222222@qq.com', '男');
INSERT INTO `customer` VALUES (6, 'test035', '123', '李志文', 3, '湖南省', '12222222222', '20010909', '2222222222@qq.com', '男');
INSERT INTO `customer` VALUES (7, 'test037', '123', '李志文', 3, '湖南省', '12222222222', '20010909', '2222222222@qq.com', '男');
INSERT INTO `customer` VALUES (8, 'test036', '123', '李志文', 3, '湖南省', '12222222222', '20010909', '2222222222@qq.com', '男');
INSERT INTO `customer` VALUES (20, 'test035', '123', '李志文', 3, '湖南省', '12222222222', '20010909', '2222222222@qq.com', '男');
INSERT INTO `customer` VALUES (10, 'test035', '123', '李志文', 3, '湖南省', '12222222222', '20010909', '2222222222@qq.com', '男');
INSERT INTO `customer` VALUES (21, 'test035', '123', '李志文', 3, '湖南省', '12222222222', '20010909', '2222222222@qq.com', '男');
INSERT INTO `customer` VALUES (22, 'test0323', '123', '李志伟', 3, '张家界', '12345565555', '20000101', '960455454', '女');
INSERT INTO `customer` VALUES (23, 'test0323', '123', '李志伟', 3, '张家界', '12345565555', '20000101', '960455454', '女');
INSERT INTO `customer` VALUES (12, 'test0323', '123', '李志伟', 3, '张家界', '12345565555', '20000101', '960455454', '女');
INSERT INTO `customer` VALUES (122, 'test0323', '123', '李志伟', 3, '张家界', '12345565555', '20000101', '960455454', '女');

-- ----------------------------
-- Table structure for insurance_policies
-- ----------------------------
DROP TABLE IF EXISTS `insurance_policies`;
CREATE TABLE `insurance_policies`  (
  `policies_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `number` int(255) NOT NULL COMMENT '订单号  用uuid或者随机id都行',
  `start_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '购买的保险时间',
  `end_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '保险到期时间（尽量以年为单位计算）',
  `insurance_cost` float(255, 2) NULL DEFAULT NULL COMMENT '总共花费',
  `type_id` int(255) NULL DEFAULT NULL COMMENT '保险的类别id',
  `cust_id` int(255) NULL DEFAULT NULL COMMENT '用户id',
  `root_id` int(255) NULL DEFAULT NULL COMMENT '保险员id',
  PRIMARY KEY (`policies_id`) USING BTREE,
  INDEX `type_id`(`type_id`) USING BTREE,
  INDEX `cust_id`(`cust_id`) USING BTREE,
  INDEX `root_id`(`root_id`) USING BTREE,
  INDEX `number`(`number`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of insurance_policies
-- ----------------------------
INSERT INTO `insurance_policies` VALUES (1, 2023030401, '202303', '202403', 2000.00, 1, 1, 1);
INSERT INTO `insurance_policies` VALUES (2, 2023030402, '202303', '202503', 5000.00, 4, 2, 1);
INSERT INTO `insurance_policies` VALUES (4, 2023030801, '20230308', '20240308', 1000.00, 1, 1, 1);
INSERT INTO `insurance_policies` VALUES (5, 2023030801, '20230308', '20240308', 1000.00, 1, 2, 2);
INSERT INTO `insurance_policies` VALUES (9, 2023030801, '20230308', '20240308', 1000.00, 1, 2, 1);

-- ----------------------------
-- Table structure for insurance_types
-- ----------------------------
DROP TABLE IF EXISTS `insurance_types`;
CREATE TABLE `insurance_types`  (
  `type_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '保险id',
  `insuranceName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '保险名称',
  `upperLimit` float(255, 2) NULL DEFAULT NULL COMMENT '保险最高上限金额 （不管索赔理赔最高都是这个）',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '描述',
  `rate` float(255, 2) NULL DEFAULT NULL COMMENT '赔率，用户够买保险* 赔率为自己的理赔最高金额，索赔如果超过则不合理',
  `ranges` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '可以运用的范围，和上面的描述差不多',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of insurance_types
-- ----------------------------
INSERT INTO `insurance_types` VALUES (1, '医疗保险', 20000.00, '分为住院医疗险和门诊医疗险。它的主要作用在于解决医疗费用，是社保的重要补充', 50.00, NULL);
INSERT INTO `insurance_types` VALUES (2, '重疾保险', 400000.00, '重大疾病保险，提供如恶性肿瘤、急性心肌梗塞、脑中风后遗症等重大疾病的保障', 80.00, NULL);
INSERT INTO `insurance_types` VALUES (3, '寿险', 100000.00, '寿险保障简单，仅身故责任，杠杆率高，很少的保费可以撬动很大的保额，很少的钱就能获得很高的保障', 30.00, NULL);
INSERT INTO `insurance_types` VALUES (4, '意外险', 500000.00, '意外险杠杆高、提供伤残保障、没有等待期、没有健康告知门槛低。', 10.00, NULL);
INSERT INTO `insurance_types` VALUES (5, '养老保险', 100000.00, '养老保险测试', 30.00, '1212123321313');
INSERT INTO `insurance_types` VALUES (6, '修改测试', 100.00, '修改测试', 10.00, '1234');
INSERT INTO `insurance_types` VALUES (7, '养老保险2', 100000.00, '养老保险测试', 30.00, '');

-- ----------------------------
-- Table structure for lipei
-- ----------------------------
DROP TABLE IF EXISTS `lipei`;
CREATE TABLE `lipei`  (
  `lipei_id` int(255) NOT NULL COMMENT '理赔id',
  `lipei_number` int(255) NULL DEFAULT NULL COMMENT '理赔订单号',
  `lipei_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '理赔的时间',
  `lipei_money` float(255, 2) NULL DEFAULT NULL COMMENT '理赔的金额，不能超出产品的最高金额且不超过用户的购买金额*赔率',
  `claims_id` int(255) NULL DEFAULT NULL COMMENT '用户id',
  `number` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '购买的订单号',
  `root_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '处理理赔的保险员（注意理赔代表改订单的索赔状态改为negotiation）',
  PRIMARY KEY (`lipei_id`) USING BTREE,
  INDEX `claims_id`(`claims_id`) USING BTREE,
  INDEX `number`(`number`) USING BTREE,
  INDEX `root_id`(`root_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lipei
-- ----------------------------
INSERT INTO `lipei` VALUES (1, 2023040401, '20230404', 15000.00, 1, '2023030401', '1');
INSERT INTO `lipei` VALUES (2, 2023040402, '20230404', 5000.00, 2, '2023030402', '1');
INSERT INTO `lipei` VALUES (3, 2023060601, '20230606', 30000.00, 3, '2023030801', '2');

-- ----------------------------
-- Table structure for root
-- ----------------------------
DROP TABLE IF EXISTS `root`;
CREATE TABLE `root`  (
  `root_id` int(255) NOT NULL COMMENT '保险员或者经理id',
  `root_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '名字',
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '密码',
  `role` int(1) NULL DEFAULT NULL COMMENT '权限 0 经理 1管理员',
  `root_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '手机号',
  PRIMARY KEY (`root_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of root
-- ----------------------------
INSERT INTO `root` VALUES (1, '余博奇', 'admin', '123', 0, '13888888888');
INSERT INTO `root` VALUES (2, '张思维', 'zsw111', '123', 1, '18374938190');

SET FOREIGN_KEY_CHECKS = 1;
