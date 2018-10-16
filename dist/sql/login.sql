/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2018-10-15 16:06:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `login`
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `sid` tinyint(8) unsigned NOT NULL AUTO_INCREMENT,
  `tel` varchar(11) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(99) CHARACTER SET utf8 NOT NULL,
  `regdate` time NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('14', '99999999999', 'b706835de79a2b4e80506f582af3676a', '11:11:34');
INSERT INTO `login` VALUES ('15', '88888888888', '0a113ef6b61820daa5611c870ed8d5ee', '11:27:46');
INSERT INTO `login` VALUES ('16', '11111111111', '698d51a19d8a121ce581499d7b701668', '11:42:40');
