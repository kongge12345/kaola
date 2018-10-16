/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2018-10-15 16:07:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `banner`
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `sid` tinyint(1) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(200) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('1', 'https://haitao.nos.netease.com/8XUlTWFnwgc21aUv10LI8nuPCT1809301647_1920_506.jpg?imageView&thumbnail=1920x0&quality=90');
INSERT INTO `banner` VALUES ('2', 'https://haitao.nosdn2.127.net/ZIgMNMSRrIuV4K6s1T1809301804_1920_506.jpg?imageView&thumbnail=1920x0&quality=90');
INSERT INTO `banner` VALUES ('3', 'https://haitao.nosdn2.127.net/ra2JTyAUzaX5JlIWPCMnW1T1809301409_1920_506.jpg?imageView&thumbnail=1920x0&quality=90');
INSERT INTO `banner` VALUES ('4', 'https://haitao.nosdn2.127.net/w8rcgZpgtx2XgklhPCT1809291104_1920_506.jpg?imageView&thumbnail=1920x0&quality=90');
INSERT INTO `banner` VALUES ('5', 'https://haitao.nosdn2.127.net/FHqg0bq9W3Z5Z6n510.8PCnMRt_mOnlXGT1809291444_1920_506.jpg?imageView&thumbnail=1920x0&quality=90');
