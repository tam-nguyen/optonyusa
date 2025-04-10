/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80041 (8.0.41)
 Source Host           : localhost:3306
 Source Schema         : optonyusa

 Target Server Type    : MySQL
 Target Server Version : 80041 (8.0.41)
 File Encoding         : 65001

 Date: 10/04/2025 11:24:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for public_vehicles
-- ----------------------------
DROP TABLE IF EXISTS `public_vehicles`;
CREATE TABLE `public_vehicles` (
  `id` decimal(10,0) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `body_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `maintenance_status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_maintenance` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of public_vehicles
-- ----------------------------
BEGIN;
INSERT INTO `public_vehicles` (`id`, `name`, `body_type`, `maintenance_status`, `img_url`, `last_maintenance`) VALUES (1, 'Ford 150', 'Pickup', 'In Use', 'https://d2qldpouxvc097.cloudfront.net/image-by-path?bucket=a5-gallery-serverless-prod-chromebucket-1iz9ffi08lwxm&key=450117%2Ffront34%2Flg', '2024-12-01');
INSERT INTO `public_vehicles` (`id`, `name`, `body_type`, `maintenance_status`, `img_url`, `last_maintenance`) VALUES (2, 'Blasius Chevycadillac', 'SUV', 'Undergoing Maintance', 'https://di-uploads-pod9.dealerinspire.com/blasiuschevycadillacredesign/uploads/2024/09/blazer-ev-riptide-blue-metallic.png', '2025-01-01');
INSERT INTO `public_vehicles` (`id`, `name`, `body_type`, `maintenance_status`, `img_url`, `last_maintenance`) VALUES (3, 'Ford Mustang', 'Sedan', 'In Use', 'https://www.briarwoodford.com/static/dealer-17694/23Ford-MustangMachE-GT-ShadowBlack-Jellybean.png', '2025-02-01');
INSERT INTO `public_vehicles` (`id`, `name`, `body_type`, `maintenance_status`, `img_url`, `last_maintenance`) VALUES (4, 'Gemn Volve', 'Pickup', 'In Use', 'https://www.gmenvolve.com/content/dam/gmenvolve/na/us/en/index/fleet/electric/25-chevy-silverado-ev/01-images/2024-gm-envolve-silverado-ev-page-find-truck-5WT.jpg?imwidth=1200', '2025-03-01');
INSERT INTO `public_vehicles` (`id`, `name`, `body_type`, `maintenance_status`, `img_url`, `last_maintenance`) VALUES (5, 'Hyundai 2024 Kon', 'SUV', 'Upcoming Maintancenent', 'https://s7d1.scene7.com/is/image/hyundai/2024-kona-ev-limited-meta-blue-pearl-013:16-9?wid=640&hei=360&fmt=webp-alpha', '2025-04-01');
INSERT INTO `public_vehicles` (`id`, `name`, `body_type`, `maintenance_status`, `img_url`, `last_maintenance`) VALUES (6, 'Telsa', 'SUV', NULL, NULL, NULL);
INSERT INTO `public_vehicles` (`id`, `name`, `body_type`, `maintenance_status`, `img_url`, `last_maintenance`) VALUES (7, 'tam', 'hello', 'test', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
