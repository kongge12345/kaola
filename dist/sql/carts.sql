/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2018-10-15 16:07:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `carts`
-- ----------------------------
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `sid` tinyint(1) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(999) CHARACTER SET utf8 NOT NULL,
  `price` int(99) NOT NULL,
  `title` varchar(999) CHARACTER SET utf8 NOT NULL,
  `salenumber` int(99) NOT NULL,
  `homework` varchar(999) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of carts
-- ----------------------------
INSERT INTO `carts` VALUES ('1', 'https://haitao.nosdn2.127.net/f9f517bf50a0434eb91ec6f98d8c40491517883017020jdb0cvls10046.jpg?imageView&thumbnail=800x0&quality=85,https://haitao.nos.netease.com/becd4925f00241baa27aa38370c8e35b1530871674432jj9tgvsu10911.jpg?imageView&thumbnail=800x0&quality=85', '65', '2件装 |  Vaseline 凡士林 全效滋润保湿身体乳 725毫升/瓶*2', '1000', 'Vaseline 凡士林');
INSERT INTO `carts` VALUES ('2', 'https://haitao.nosdn2.127.net/7656b2482ae34f7987197302509fec771538123232823jmlquy3n10259.jpg?imageView&thumbnail=800x0&quality=85,https://haitao.nos.netease.com/710e15a51f6a448d99e587b7fdeb4adb1537849613868jmh7yc6d10692.jpg?imageView&thumbnail=800x0&quality=85,https://haitao.nos.netease.com/31d12af8e605429e8b6402c66e87e05d1537849612636jmh7yb9010690.jpg?imageView&thumbnail=800x0&quality=85,https://haitao.nosdn2.127.net/6f52dc6f63534979ad5f0187a645a1581537849613372jmh7ybsc10691.jpg?imageView&thumbnail=800x0&quality=85,https://haitao.nosdn1.127.net/ff4f5a9853a44e4ea0f499047b202d8c1537849611439jmh7yab110688.jpg?imageView&thumbnail=800x0&quality=85,https://haitao.nos.netease.com/2f100d00400b4e558f10ec8e67d58d371537849611967jmh7yapd10689.jpg?imageView&thumbnail=800x0&quality=85', '127', '考拉工厂店 日式极简 智能清洁电动牙刷', '200', '网易考拉自营');
INSERT INTO `carts` VALUES ('3', 'https://pop.nosdn.127.net/fabfcdb6-5016-4f85-9192-0d2be3d32fb6?imageView&thumbnail=800x0&quality=85,https://pop.nosdn.127.net/c96663a0-9f32-4934-9953-598e1a75459a?imageView&thumbnail=800x0&quality=85,https://pop.nosdn.127.net/e482a2ae-e11b-47f3-a2b2-0cdd5c401a67?imageView&thumbnail=800x0&quality=85,https://pop.nosdn.127.net/e06781e1-00e8-4f2f-a824-0730267c700b?imageView&thumbnail=800x0&quality=85,https://pop.nosdn.127.net/a2b5175f-61f8-4c80-91da-af04753d46e0?imageView&thumbnail=800x0&quality=85', '899', 'Skechers斯凯奇女鞋新款蝴蝶结一脚套 网布舒适休闲鞋 68741', '1206', 'SKECHERS');
INSERT INTO `carts` VALUES ('4', 'https://haitao.nosdn1.127.net/635beaa287f247cdbfb8186cf9ac2c951510146634819j9r2bcx214330.jpg?imageView&thumbnail=800x0&quality=85', '16', '【内含疯狂古怪味道】Jelly Belly 吉力贝 迷惑怪味豆 45克/盒', '150', 'jelly Belly');
