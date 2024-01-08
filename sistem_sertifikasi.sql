-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Des 2023 pada 17.14
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistem_sertifikasi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `approval`
--

CREATE TABLE `approval` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isApproved` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `assesion`
--

CREATE TABLE `assesion` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `asesorRecommendation` varchar(191) DEFAULT NULL,
  `assesionNumber` int(11) NOT NULL DEFAULT 0,
  `assesorLead` varchar(191) DEFAULT NULL,
  `assesorName` varchar(191) DEFAULT NULL,
  `lspAdmin` varchar(191) DEFAULT NULL,
  `idSchema` varchar(191) DEFAULT NULL,
  `idAssesmentImpl` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `assesmentimplementation`
--

CREATE TABLE `assesmentimplementation` (
  `id` varchar(191) NOT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idSptAssesor` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `assesmentschedule`
--

CREATE TABLE `assesmentschedule` (
  `id` varchar(191) NOT NULL,
  `schedule` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idAssesion` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `asstestresult`
--

CREATE TABLE `asstestresult` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idBaSk` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `authentication`
--

CREATE TABLE `authentication` (
  `token` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `authentication`
--

INSERT INTO `authentication` (`token`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItekhKYVFBSHNRIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTcwMzg2NjM4NX0.mFX8XmxuSfzPsjWJcvfioxKpo8EB62njRfT0s6f640E');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bask`
--

CREATE TABLE `bask` (
  `id` varchar(191) NOT NULL,
  `noBaDate` varchar(191) DEFAULT NULL,
  `noSkDate` varchar(191) DEFAULT NULL,
  `plenoDate` varchar(191) DEFAULT NULL,
  `baDate` varchar(191) DEFAULT NULL,
  `skDate` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idAssesmentSchedule` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `blankapplication`
--

CREATE TABLE `blankapplication` (
  `id` varchar(191) NOT NULL,
  `blankReceiptDate` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idCertApplication` varchar(191) NOT NULL,
  `dateBlank` varchar(191) DEFAULT NULL,
  `dateHandover` varchar(191) DEFAULT NULL,
  `noBlank` varchar(191) DEFAULT NULL,
  `noHandover` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `carddist`
--

CREATE TABLE `carddist` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idPacking` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `certapplication`
--

CREATE TABLE `certapplication` (
  `id` varchar(191) NOT NULL,
  `assesmentDate` varchar(191) NOT NULL,
  `idCertPurpose` varchar(191) NOT NULL,
  `receiptDate` varchar(191) NOT NULL,
  `referenceNumber` varchar(191) NOT NULL,
  `tukName` varchar(191) NOT NULL,
  `idApproval` varchar(191) NOT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `certdist`
--

CREATE TABLE `certdist` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idCardDist` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `certholder`
--

CREATE TABLE `certholder` (
  `id` varchar(191) NOT NULL,
  `certHolder` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idCertApplication` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `certmanager`
--

CREATE TABLE `certmanager` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idPrintBlank` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `certpurpose`
--

CREATE TABLE `certpurpose` (
  `id` varchar(191) NOT NULL,
  `purpose` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `certscanner`
--

CREATE TABLE `certscanner` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idPrintBlank` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `certstamp`
--

CREATE TABLE `certstamp` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idPrintBlank` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `certstorage`
--

CREATE TABLE `certstorage` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idPrintBlank` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `directursign`
--

CREATE TABLE `directursign` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idPrintBlank` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `invoicedist`
--

CREATE TABLE `invoicedist` (
  `id` varchar(191) NOT NULL,
  `invoiceDate` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idCertApplication` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `minerbadata`
--

CREATE TABLE `minerbadata` (
  `id` varchar(191) NOT NULL,
  `no` varchar(191) DEFAULT NULL,
  `date` varchar(191) DEFAULT NULL,
  `idCertApplication` varchar(191) NOT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `minerbadist`
--

CREATE TABLE `minerbadist` (
  `id` varchar(191) NOT NULL,
  `no` varchar(191) DEFAULT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idMinerbaData` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `packing`
--

CREATE TABLE `packing` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idSendCommand` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `paymentconfirmation`
--

CREATE TABLE `paymentconfirmation` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `proofUrl` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idCertApplication` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `printassesion`
--

CREATE TABLE `printassesion` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `idAssTestResult` varchar(191) NOT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `printblank`
--

CREATE TABLE `printblank` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `idPrintAssesion` varchar(191) NOT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `printcompensation`
--

CREATE TABLE `printcompensation` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `idPrintBlank` varchar(191) NOT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `receipt`
--

CREATE TABLE `receipt` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idCertDist` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `role`
--

CREATE TABLE `role` (
  `id` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `role`
--

INSERT INTO `role` (`id`, `role`) VALUES
('role-kU7DHnOdz', 'Admin'),
('role-LSR6nViDP', 'Admin Uji'),
('role-WgedAAvBl', 'Administrasi'),
('role-H4at9j-lj', 'Direktur'),
('role-_q2KtPU04', 'IT'),
('role-KKyYyNqpe', 'Sekretaris'),
('role-GINslqz85', 'Sertifikasi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `schema`
--

CREATE TABLE `schema` (
  `id` varchar(191) NOT NULL,
  `schema` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sendcommand`
--

CREATE TABLE `sendcommand` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idSystemMiners` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sptassesor`
--

CREATE TABLE `sptassesor` (
  `id` varchar(191) NOT NULL,
  `noSptAssesor` varchar(191) DEFAULT NULL,
  `assesorDate` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idCertApplication` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `systemminers`
--

CREATE TABLE `systemminers` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idPrintBlank` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tukconfirmation`
--

CREATE TABLE `tukconfirmation` (
  `id` varchar(191) NOT NULL,
  `date` varchar(191) DEFAULT NULL,
  `isProcessed` tinyint(1) NOT NULL DEFAULT 0,
  `idReceipt` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `fullname` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `idRole` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `username`, `fullname`, `password`, `idRole`) VALUES
('user-zHJaQAHsQ', 'admin', 'Admin', '$2b$10$ozdP/zJfG1.7hCWVUnlxCublt.DiJ/zOokcRs/fLOcOw7BQS6HZ9q', 'role-kU7DHnOdz');

-- --------------------------------------------------------

--
-- Struktur dari tabel `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('00476ddb-57c9-4ca8-a2d1-835a9760763e', 'b32d37f29d72aeffcef90809660c731445b4304f0db2c3048560a0189f5d2bcd', '2023-12-29 16:09:20.935', '20231214164643_create_assesment_implementation_table', NULL, NULL, '2023-12-29 16:09:20.894', 1),
('04c18a53-e5cd-495d-818f-7e4dde8c8f20', 'eafbd173fd3fda17200ae2f5587b1f1aaf252f4bd22a13a1bdb66ad993b51abc', '2023-12-29 16:09:20.598', '20231208160839_create_user_table', NULL, NULL, '2023-12-29 16:09:20.550', 1),
('06ca24a6-f752-4e9e-a9f7-2c1cae29b503', 'cc1326ab3da80d3943a1105f2ebb9b1dee6d9e4f0fda2db19b69304bb2c4801e', '2023-12-29 16:09:20.875', '20231214105815_', NULL, NULL, '2023-12-29 16:09:20.846', 1),
('0c7caab2-bf05-4986-8cd3-fc09d24c2eb6', 'a5b436d05067454ccd88a1501fb206174ac4f464c3385f6ee7d677b729d53153', '2023-12-29 16:09:21.814', '20231217163250_create_cert_storage_table', NULL, NULL, '2023-12-29 16:09:21.785', 1),
('13969bef-d7da-4731-aeb2-fd3b46361ec6', 'a1463a0408f4af2d3f621d9e15c0c9b9216b1d9bb159109ce69e669b1cf40860', '2023-12-29 16:09:21.293', '20231215163402_create_blank_application', NULL, NULL, '2023-12-29 16:09:21.267', 1),
('174a46b7-0166-4c65-801f-d51e8a5f3660', '4d68e873fdc8f3c7447afe3aefeff0142844abf43c096a4a8183d3c60473098d', '2023-12-29 16:09:21.785', '20231217155816_create_cert_scanner_table', NULL, NULL, '2023-12-29 16:09:21.757', 1),
('1e51035d-6e34-4e11-8f30-e10313ae0ffc', '51cd8362f6b2ad1f96891d6b16fac1a70e7cc0a60b170d4ead176e2d11da807f', '2023-12-29 16:09:20.942', '20231214165952_fix_typo_column_name', NULL, NULL, '2023-12-29 16:09:20.939', 1),
('1fb029d8-8b49-4111-8bb0-c67e7f1dd82d', '7ebbf5f35d6f8d4916baacad2112056d78b586cbde3d1ebcd3f09d096db78ab6', '2023-12-29 16:09:21.598', '20231217110550_remove_many_to_many_relation', NULL, NULL, '2023-12-29 16:09:21.508', 1),
('2143edeb-0987-4823-8616-c2eb49715eda', '27ce568b845b3a6c7c354a2155ba40ff4b75e7aba700155bf7f79e69c1275868', '2023-12-29 16:09:21.229', '20231215140359_set_is_processed_default_value_to_false', NULL, NULL, '2023-12-29 16:09:21.227', 1),
('231b7010-3150-469a-9894-c6bcb214dd16', 'b3aad395f0eb8364f040da574aace434521b436b9013a1ec17219dd67fbad8eb', '2023-12-29 16:09:22.023', '20231218034903_create_receipt_table', NULL, NULL, '2023-12-29 16:09:21.998', 1),
('23cc330a-747f-4ae1-a81d-93e02e7c80c5', 'b95924e32f7bc38da977cb0199bad8f75cb15f3d8a0f4b750afa38b37d1f3180', '2023-12-29 16:09:21.038', '20231215110122_create_assesment_schedule', NULL, NULL, '2023-12-29 16:09:21.034', 1),
('27b9e23e-38bd-4766-a1b2-a6ea232c0395', 'f04c2d5d656af5bb77b3f5d742fab7ccaf4b9a7f7d27aef6f3e576277542501e', '2023-12-29 16:09:21.176', '20231215140046_test_result_table_created', NULL, NULL, '2023-12-29 16:09:21.143', 1),
('2e07fcd9-e590-4bbc-b1ca-c82aee69581b', '76083fdc0ba11722cca4ac05e9ba1fc6978ef427e518e4d9c8bcd8937db37d56', '2023-12-29 16:09:21.454', '20231217082033_create_many_to_many_relation_between_assesion_and_assesion_impl', NULL, NULL, '2023-12-29 16:09:21.384', 1),
('3429c3c9-8165-404a-b4d0-e3abc3816e00', 'c08f00b0b187fd9c24f9c5914818e78d15f86d9a20503a062113897bfb047ac0', '2023-12-29 16:09:20.808', '20231213121558_add_relation_between_cert_applicaton_table_and_approval_table', NULL, NULL, '2023-12-29 16:09:20.783', 1),
('35a60b5d-f6f1-429f-8ac6-095ea691501d', 'dc9d5634323ece717867c8cf791013215afb84f480d9fcb51793120fcdda0159', '2023-12-29 16:09:21.226', '20231215140147_change_test_result_into_ass_test_result', NULL, NULL, '2023-12-29 16:09:21.177', 1),
('35e8f1ee-4bd6-47a7-9fcb-8400d5919e40', 'f590192459b385a70dada65e7a65c3290abed4450789279354696bbb46fe78eb', '2023-12-29 16:09:22.553', '20231229153735_change_column_constraint_name_in_user_table', NULL, NULL, '2023-12-29 16:09:22.529', 1),
('3a585117-c739-4066-b94b-5135ed72f9fd', '0a868ce274daed0eea1855f20dda87a1aab392ee4295ac471d257df16590fb81', '2023-12-29 16:09:21.682', '20231217134515_add_is_processed_in_print_table', NULL, NULL, '2023-12-29 16:09:21.676', 1),
('3d0d7ce4-45f4-418b-bea8-ceabc56681cb', 'd4970043b645aa5f560ab662c9c9cbd3b749de1359c8420f6f9b12170d71a60d', '2023-12-29 16:09:21.266', '20231215152506_create_cert_holder_table', NULL, NULL, '2023-12-29 16:09:21.230', 1),
('46e712ce-ec19-4bc1-abb0-751ccc47a288', '8bfedb854fab5afae9225ef9f71541c0df967b67fbc20148663ea69bcb3eaeee', '2023-12-29 16:09:21.973', '20231218034713_create_card_dist_table', NULL, NULL, '2023-12-29 16:09:21.944', 1),
('473ba9c2-115d-47b1-aa09-531d2833d61d', '5c67ae6df9b0b6b1a1787778b64e51f89b3d07f38549a7c9424360ba6c7d3658', '2023-12-29 16:09:22.327', '20231227134011_create_minerba_data_and_minerba_dist', NULL, NULL, '2023-12-29 16:09:22.271', 1),
('4c638c11-f3f3-43a6-82d9-1e40effd3d23', '92f7f2d0fdbab3293cb69a3d776d128ba2f7f59a0de539f75cc2bc6964a00668', '2023-12-29 16:09:20.724', '20231213025453_change_tanggal_into_date_in_approval_table', NULL, NULL, '2023-12-29 16:09:20.704', 1),
('4e73a853-5f82-4ca9-ac5b-e91fd33dc907', 'b80496ffc3ba0ef69e0959e7c613b87c41299140ffada43eb5183ac4f3a9bcd7', '2023-12-29 16:09:20.704', '20231213025427_create_approval_table', NULL, NULL, '2023-12-29 16:09:20.699', 1),
('519f80da-a9c7-473d-be1f-f82564a8e659', 'e0dec80311ad5d194aaec3c6adcab841efafee78aa438439db46368bb7ff2b7b', '2023-12-29 16:09:20.938', '20231214165754_set_assesion_number_default_value', NULL, NULL, '2023-12-29 16:09:20.935', 1),
('5abf1b4a-fa9b-4e52-a685-60cf58fe2e60', 'a3e78e33003baed8a550f7ee040c5a1255347f237a5bfb2f9cb9e1e767257ef6', '2023-12-29 16:09:20.630', '20231210040620_create_authentication_table', NULL, NULL, '2023-12-29 16:09:20.626', 1),
('5cf784bb-31eb-4ad3-941a-c3037ec28a7d', 'c483f0bd746ad77bf68609af770361793f7d0430f8e15af5558b3cd7f247363f', '2023-12-29 16:09:21.917', '20231218033033_create_send_command_table', NULL, NULL, '2023-12-29 16:09:21.886', 1),
('5ec252f9-8bce-4776-a7fa-8075e3f89603', '5a42e2a6f34c6e6334b15207b8eb4bab6a55aec7aab242bcc766276c77b5a153', '2023-12-29 16:09:20.989', '20231215030252_change_id_schema_to_nullable', NULL, NULL, '2023-12-29 16:09:20.968', 1),
('616d189c-58c4-4e93-8c9f-8b5913eac251', 'f04c2d5d656af5bb77b3f5d742fab7ccaf4b9a7f7d27aef6f3e576277542501e', '2023-12-29 16:09:21.136', '20231215134535_create_test_result_table', NULL, NULL, '2023-12-29 16:09:21.103', 1),
('64f31abb-170e-4d88-86d4-ee95c1ae07b7', 'bfedd6dcd1a9a3e4415ef321db8f051f67abab7b7854a0c797e5fa0137e78c2f', '2023-12-29 16:09:21.757', '20231217153714_create_cert_stamp_table', NULL, NULL, '2023-12-29 16:09:21.729', 1),
('673703eb-bd09-40c0-90e6-cc1cea873b5e', '6a50a20daa193ef83ffe994ee483414280fbade1e419f6b91e6591ab54e64caa', '2023-12-29 16:09:20.679', '20231211111638_', NULL, NULL, '2023-12-29 16:09:20.671', 1),
('6cd58cf7-085d-4c5e-81ee-251456b45559', 'dcf5002362ae28120fe1635d9997b689e9b5dc8e6103ee06c110189994423676', '2023-12-29 16:09:20.832', '20231213121916_change_id_aproval_into_id_approval', NULL, NULL, '2023-12-29 16:09:20.809', 1),
('6dc240aa-8a1e-46ed-bc3c-611c09a93986', '8c57ba1f7c3ebc98b35e907edc164973da706548508a946707f2b6ef7e57367a', '2023-12-29 16:09:22.528', '20231229152833_change_relation_between_user_and_role', NULL, NULL, '2023-12-29 16:09:22.492', 1),
('70bb9036-cb7e-441e-bbdc-380d26f0e672', 'a5f3bcc555af6ce27703dd086aa75a4050f1417ecf8220ac7982a36949d02b4a', '2023-12-29 16:09:22.056', '20231218081739_remove_id_schema_from_assesment_implementation_table', NULL, NULL, '2023-12-29 16:09:22.051', 1),
('72837e86-e053-44fa-908f-3094d553a775', 'c05e3c054b22643ce8d99f0d8876b33c5c5b8f3402cbe131a3e578cd14dd8622', '2023-12-29 16:09:20.670', '20231211111607_change_skema_table_name_into_schema', NULL, NULL, '2023-12-29 16:09:20.648', 1),
('7728f3d3-cb1c-438d-bb5d-8810cc0b3ed2', 'ebadafa1ed2dbeaa952d6ab75d583e7151c52685f70d936d600ee81a61c258b4', '2023-12-29 16:09:20.730', '20231213030145_set_is_approved_default_value_to_false', NULL, NULL, '2023-12-29 16:09:20.728', 1),
('7d2935f2-c70f-4a8f-a12b-52c35e0adb29', '18b742e4476d9902171ef367318138981d035ce4f01aa8e94fb7573645678c7b', '2023-12-29 16:09:20.777', '20231213061309_change_column_name_into_cames_case_format', NULL, NULL, '2023-12-29 16:09:20.753', 1),
('87023839-2aca-4c77-8a40-2c4ac7155412', '7ab560b92269e61a37fac09edeb3fe280240adb193281d0eacfe6ae8eb7101d6', '2023-12-29 16:09:21.350', '20231217032047_create_invoice_dist_table', NULL, NULL, '2023-12-29 16:09:21.293', 1),
('87558249-8d76-45be-aecf-ee9a2283dfb4', '909f9373326b9d2a31eda4a3f9d95fb920db94a7d86638d566e48d9ac01bd673', '2023-12-29 16:09:21.462', '20231217085754_move_some_column_in_assesment_implementation_to_assesion', NULL, NULL, '2023-12-29 16:09:21.455', 1),
('89cfd34d-3c03-4c3a-a1f6-f1264b97af8e', 'b47e78ad955c658ffc160e1c04ef1edb5f55ee5fd92cecf496532b7f2c6689d2', '2023-12-29 16:09:20.845', '20231213144915_', NULL, NULL, '2023-12-29 16:09:20.832', 1),
('8efba91f-8b86-4033-abfa-6d241e9381b6', 'e188d086c15be13e4470808844e620845fdb8dd265e217f17733aa170a014047', '2023-12-29 16:09:21.998', '20231218034810_create_cert_dist_table', NULL, NULL, '2023-12-29 16:09:21.973', 1),
('92125033-d603-4ba9-8c40-cc5888bcfe66', '4ea91e16e671c559fbc1560c1feacdf4c3672c8ae142c96a5c93dda35d34713c', '2023-12-29 16:09:21.034', '20231215075305_', NULL, NULL, '2023-12-29 16:09:20.995', 1),
('937e8349-ace3-4bcc-a80c-12323daf566f', '123665b33d991c786d8027be9cbf6afa7984a322c6d9d54cc5a00f72d7e6eb2a', '2023-12-29 16:09:20.687', '20231211122034_change_certification_purposes_table_name_into_cert_purpose', NULL, NULL, '2023-12-29 16:09:20.680', 1),
('94090b78-1fb5-4808-b27d-d800741a233b', 'e2b8416d5040b818e9dc55b954a558e10ce1ea45afe46082ea608bd8b8fbb336', '2023-12-29 16:09:20.968', '20231214170213_fix_typo_column_name', NULL, NULL, '2023-12-29 16:09:20.943', 1),
('949cf038-5894-4b0c-8517-06152e6da41f', '99d9683928452ec29f5b5595eb37214f4964f3703022f8c1c735e3aa15300b1d', '2023-12-29 16:09:22.046', '20231218044545_create_tuk_confirmation_table', NULL, NULL, '2023-12-29 16:09:22.023', 1),
('974db0a2-718a-483e-b823-e3345d80e2a2', '00442f772c5cfdbbc808b9ae94b9ef866dabd786b01cac7c58a425a55587a10f', '2023-12-29 16:09:20.549', '20231208152138_create_roles_table', NULL, NULL, '2023-12-29 16:09:20.544', 1),
('abf23bac-3ea0-479d-b345-81cc6ffbef21', '4e225b70d470b00ca6f53b1c347743edf5018ec05fac83ee18bc604844eac989', '2023-12-29 16:09:21.142', '20231215140024_test_result_table_deleted', NULL, NULL, '2023-12-29 16:09:21.137', 1),
('accf7b8c-a15d-4286-9de6-c3e22af289a7', 'a8958eb15775d0edd25e60a27411a0bf2da458e538d4b67d0f8670fde235d9f3', '2023-12-29 16:09:21.071', '20231215110344_add_relation_between_assesion_and_assesment_schedule_table', NULL, NULL, '2023-12-29 16:09:21.039', 1),
('af8a5aa9-9668-4b60-b7ae-e4407116f579', '9839789164bea293db1711b76b61a27569e0641b135a88036a2f5763fa219890', '2023-12-29 16:09:22.061', '20231222063500_separate_no_and_date_in_blank_application', NULL, NULL, '2023-12-29 16:09:22.057', 1),
('b150ada8-4ee0-4b42-b1d6-8e58bdca9b07', '6d6e3c7d6582b71ccd40b2d25869902a8064c855213059d964de131b960d6801', '2023-12-29 16:09:22.361', '20231227141625_change_minerba_dist_relation_with_minerba_data', NULL, NULL, '2023-12-29 16:09:22.333', 1),
('b26e1bc4-fa74-4d3a-8bf0-761dff3cdbd2', 'e0ff36220121c5501d13b8d6ff1f4449935a3fcba1c102d5351f11cf03f540b2', '2023-12-29 16:09:21.703', '20231217144603_create_directur_sign_table', NULL, NULL, '2023-12-29 16:09:21.683', 1),
('b301f3fb-094e-43f8-9a96-08334af845d3', 'df40c0572fbce5fdecb3c2fcc5cc564cb8bfa8d99a56efa124658d100a9b4d04', '2023-12-29 16:09:22.203', '20231222070156_change_some_table_relation', NULL, NULL, '2023-12-29 16:09:22.061', 1),
('b460a98d-61f3-4373-9475-dd2fbb0151ff', 'f60d8fae5d3ee78ce15540b1d6d3475944dd5708176f10b0f1d5a2fcb8bd4eea', '2023-12-29 16:09:22.397', '20231228054335_change_payment_confirmation_relation_with_cert_application', NULL, NULL, '2023-12-29 16:09:22.361', 1),
('b9dad8aa-9d98-4c36-a5a3-c7f897475ad0', 'de5e537cae72ce172e2b168377ced99a5212c30b42c5cebe8b7926791677f353', '2023-12-29 16:09:20.699', '20231212055815_change_tujuan_column_name_into_purpose_in_cert_purpose_table', NULL, NULL, '2023-12-29 16:09:20.687', 1),
('bc0dbea1-05c1-40b6-b899-f8226f507b17', '3bff4235e81f424054fd76ed2e540a2b3e7133ec07b16bca225d57721eaadc33', '2023-12-29 16:09:22.427', '20231228054702_change_send_command_relation_with_system_miners', NULL, NULL, '2023-12-29 16:09:22.398', 1),
('c3a17be2-bfac-4d35-a788-0be3940b808d', '092979d5497ff2a611b450237c52f65cf6a184845b358085891b2308df01d3f9', '2023-12-29 16:09:21.886', '20231218020549_create_payment_confirmation_table', NULL, NULL, '2023-12-29 16:09:21.839', 1),
('c3a8e061-fd2d-4c41-81c0-1194e20d29a1', '567b4f09c5e3f2104a5d10d8cd482ab123ae58a5e6f2eeec44fcc2bc6f03f6d9', '2023-12-29 16:09:21.676', '20231217120623_create_print_assesion_print_blank_print_compensation_table', NULL, NULL, '2023-12-29 16:09:21.599', 1),
('c3ca2c3d-7fc2-4cf1-9ca6-00ae476de824', 'a548f2636877c474ec04cf5b6bafb3df89312d136d8f2ef3be5d1ffc0b3e9215', '2023-12-29 16:09:21.102', '20231215132025_create_ba_sk_table', NULL, NULL, '2023-12-29 16:09:21.072', 1),
('d1c4c5f3-4a43-4caf-bf4c-4c5a35b876c4', '6719ce558f9639fc15289536457dcd7549532b11935cce3a6e4d7d2ba5c633de', '2023-12-29 16:09:20.752', '20231213035800_create_cert_application_table', NULL, NULL, '2023-12-29 16:09:20.731', 1),
('d722af60-c037-432f-8a7c-d21f474ff53a', 'cff2a49f9f5d3b28a67eaad73b6ca80a43369bbc38cb682553c2537dd5dcec5e', '2023-12-29 16:09:20.894', '20231214150940_make_no_spt_assesor_and_assesor_date_nullable', NULL, NULL, '2023-12-29 16:09:20.876', 1),
('d8d29393-d7d2-43c4-96e1-385b662444b2', '08deaba4ac00142c813cb43b5978a80fbf832e3ea53bed66ba0e0335b55081a6', '2023-12-29 16:09:20.638', '20231211022640_create_skema_and_tujuan_sertifikasi_table', NULL, NULL, '2023-12-29 16:09:20.631', 1),
('dc496a5f-5920-48b6-91df-33537df8c0c5', 'ba615a2b068a52b784437cc6ad1f179f1cc9aea0f3c59d6968291cb3826a6bc4', '2023-12-29 16:09:22.332', '20231227134835_add_is_processed_column', NULL, NULL, '2023-12-29 16:09:22.327', 1),
('dc5f0290-01ad-4e58-9924-0a070367a926', 'fb7dd41cb67a23993d9040f49ca7c2c36e520ce5a2a4a65de00ca32c045b010d', '2023-12-29 16:09:20.647', '20231211055528_create_role_in_role_table_unique', NULL, NULL, '2023-12-29 16:09:20.639', 1),
('de28386b-163e-4e13-b5e5-5bace6738dae', '28aa53dd584fc29ae05472b2d2ddda15b6c64e03274bb3fcaf15ac115b110b80', '2023-12-29 16:09:21.838', '20231218014640_create_system_miners_table', NULL, NULL, '2023-12-29 16:09:21.814', 1),
('e31b113c-6426-4789-be04-3f639b3542c7', 'aa656ea01a03a189987d70fc6e81f4df0238d3ec4f75d4b5b3371300f6b3e868', '2023-12-29 16:09:22.271', '20231225161827_add_unique_relation', NULL, NULL, '2023-12-29 16:09:22.204', 1),
('e4e1a182-e740-4f4c-9ca2-d0fd8de6ea92', '4badde691900dbbfdec7f3f93909a4078d61e4e568b1d81cbfcb3c964437adfb', '2023-12-29 16:09:20.626', '20231208171025_set_on_delete_and_on_update_mechanism', NULL, NULL, '2023-12-29 16:09:20.599', 1),
('e5cf5562-e1ab-48e6-a6e9-9120dd102e12', '8ea7f422254e240a4aceed02c32f806492160d576c481b933319e0b67bd5bef9', '2023-12-29 16:09:21.729', '20231217145950_create_cert_manager_table', NULL, NULL, '2023-12-29 16:09:21.704', 1),
('e71f23f0-af88-4317-9efa-5b94bbfa7328', '8031640847c13bd209cac2756e0a5da1dfec54bb660969ae3ccd5e19216772f5', '2023-12-29 16:09:20.994', '20231215074800_create_assesion_table', NULL, NULL, '2023-12-29 16:09:20.990', 1),
('ea424036-be47-4968-8abc-317bfdc54845', 'c42e9885a20eb1731549c8a22e3311647f8f66d0a22b5cf79b1090e7aa138680', '2023-12-29 16:09:21.944', '20231218034630_create_packing_table', NULL, NULL, '2023-12-29 16:09:21.918', 1),
('eb581a3c-5006-4bf1-a305-e07633c2530d', '5b3a406e2a0252f49239b2e19f5563adbd171f8258eb642b1832a30c8953586c', '2023-12-29 16:09:21.383', '20231217065418_change_relation', NULL, NULL, '2023-12-29 16:09:21.351', 1),
('eea48179-98b8-4e35-b3c0-09973779d1e5', '8c9f9812d5563f3c812ec44f7b7da6c410f8dac6d38a4e987bfefcd29a141f9d', '2023-12-29 16:09:20.782', '20231213115102_create_spt_asesor_table', NULL, NULL, '2023-12-29 16:09:20.778', 1),
('efb7984a-2e86-416f-8742-0c7c3c5310d3', '5981eb0f9165d8481c4ad8561205c00ed91b0f3dee467db6d45f1a5df9a00288', '2023-12-29 16:09:22.492', '20231229075359_create_many_to_many_relation_between_user_and_role', NULL, NULL, '2023-12-29 16:09:22.428', 1),
('f3709fc2-07af-4e58-ace7-06a6752592ea', '67cbd661db437b4fd8cc50cb1f227036810e564af3db56bd3d254cda4e723007', '2023-12-29 16:09:21.508', '20231217090735_move_some_columns_from_assesment_implementation_to_assesion', NULL, NULL, '2023-12-29 16:09:21.462', 1),
('f45dba56-8ea1-4514-a01d-1d6f7ff57ba2', 'f20064f67799f48fe65723b0c8bd64e3151da57a273ab229fb7fab7391484e5e', '2023-12-29 16:09:22.050', '20231218044621_create_description_column_in_tuk_confirmation_table', NULL, NULL, '2023-12-29 16:09:22.047', 1),
('f9fefa32-3642-47da-b510-a7075635c604', '564df0fc3a045497559fb5877d296945a08cbe4f07638091aad15193bdb9ee85', '2023-12-29 16:09:20.728', '20231213025959_change_is_approve_into_is_approved_in_approval_table', NULL, NULL, '2023-12-29 16:09:20.725', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `approval`
--
ALTER TABLE `approval`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `assesion`
--
ALTER TABLE `assesion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Assesion_idSchema_fkey` (`idSchema`),
  ADD KEY `Assesion_idAssesmentImpl_fkey` (`idAssesmentImpl`);

--
-- Indeks untuk tabel `assesmentimplementation`
--
ALTER TABLE `assesmentimplementation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AssesmentImplementation_idSptAssesor_key` (`idSptAssesor`);

--
-- Indeks untuk tabel `assesmentschedule`
--
ALTER TABLE `assesmentschedule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AssesmentSchedule_idAssesion_key` (`idAssesion`);

--
-- Indeks untuk tabel `asstestresult`
--
ALTER TABLE `asstestresult`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AssTestResult_idBaSk_key` (`idBaSk`);

--
-- Indeks untuk tabel `authentication`
--
ALTER TABLE `authentication`
  ADD UNIQUE KEY `Authentication_token_key` (`token`);

--
-- Indeks untuk tabel `bask`
--
ALTER TABLE `bask`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `BaSk_idAssesmentSchedule_key` (`idAssesmentSchedule`);

--
-- Indeks untuk tabel `blankapplication`
--
ALTER TABLE `blankapplication`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `BlankApplication_idCertApplication_key` (`idCertApplication`);

--
-- Indeks untuk tabel `carddist`
--
ALTER TABLE `carddist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CardDist_idPacking_key` (`idPacking`);

--
-- Indeks untuk tabel `certapplication`
--
ALTER TABLE `certapplication`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CertApplication_idApproval_key` (`idApproval`),
  ADD KEY `CertApplication_idCertPurpose_fkey` (`idCertPurpose`);

--
-- Indeks untuk tabel `certdist`
--
ALTER TABLE `certdist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CertDist_idCardDist_key` (`idCardDist`);

--
-- Indeks untuk tabel `certholder`
--
ALTER TABLE `certholder`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CertHolder_idCertApplication_key` (`idCertApplication`);

--
-- Indeks untuk tabel `certmanager`
--
ALTER TABLE `certmanager`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CertManager_idPrintBlank_key` (`idPrintBlank`);

--
-- Indeks untuk tabel `certpurpose`
--
ALTER TABLE `certpurpose`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `certscanner`
--
ALTER TABLE `certscanner`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CertScanner_idPrintBlank_key` (`idPrintBlank`);

--
-- Indeks untuk tabel `certstamp`
--
ALTER TABLE `certstamp`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CertStamp_idPrintBlank_key` (`idPrintBlank`);

--
-- Indeks untuk tabel `certstorage`
--
ALTER TABLE `certstorage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CertStorage_idPrintBlank_key` (`idPrintBlank`);

--
-- Indeks untuk tabel `directursign`
--
ALTER TABLE `directursign`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `DirecturSign_idPrintBlank_key` (`idPrintBlank`);

--
-- Indeks untuk tabel `invoicedist`
--
ALTER TABLE `invoicedist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `InvoiceDist_idCertApplication_key` (`idCertApplication`);

--
-- Indeks untuk tabel `minerbadata`
--
ALTER TABLE `minerbadata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MinerbaData_idCertApplication_key` (`idCertApplication`);

--
-- Indeks untuk tabel `minerbadist`
--
ALTER TABLE `minerbadist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MinerbaDist_idMinerbaData_key` (`idMinerbaData`);

--
-- Indeks untuk tabel `packing`
--
ALTER TABLE `packing`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Packing_idSendCommand_key` (`idSendCommand`);

--
-- Indeks untuk tabel `paymentconfirmation`
--
ALTER TABLE `paymentconfirmation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `PaymentConfirmation_idCertApplication_key` (`idCertApplication`);

--
-- Indeks untuk tabel `printassesion`
--
ALTER TABLE `printassesion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `PrintAssesion_idAssTestResult_key` (`idAssTestResult`);

--
-- Indeks untuk tabel `printblank`
--
ALTER TABLE `printblank`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `PrintBlank_idPrintAssesion_key` (`idPrintAssesion`);

--
-- Indeks untuk tabel `printcompensation`
--
ALTER TABLE `printcompensation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `PrintCompensation_idPrintBlank_key` (`idPrintBlank`);

--
-- Indeks untuk tabel `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Receipt_idCertDist_key` (`idCertDist`);

--
-- Indeks untuk tabel `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Role_role_key` (`role`);

--
-- Indeks untuk tabel `schema`
--
ALTER TABLE `schema`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Schema_schema_key` (`schema`);

--
-- Indeks untuk tabel `sendcommand`
--
ALTER TABLE `sendcommand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SendCommand_idSystemMiners_key` (`idSystemMiners`);

--
-- Indeks untuk tabel `sptassesor`
--
ALTER TABLE `sptassesor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SptAssesor_idCertApplication_key` (`idCertApplication`);

--
-- Indeks untuk tabel `systemminers`
--
ALTER TABLE `systemminers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SystemMiners_idPrintBlank_key` (`idPrintBlank`);

--
-- Indeks untuk tabel `tukconfirmation`
--
ALTER TABLE `tukconfirmation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `TukConfirmation_idReceipt_key` (`idReceipt`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD KEY `User_idRole_fkey` (`idRole`);

--
-- Indeks untuk tabel `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `assesion`
--
ALTER TABLE `assesion`
  ADD CONSTRAINT `Assesion_idAssesmentImpl_fkey` FOREIGN KEY (`idAssesmentImpl`) REFERENCES `assesmentimplementation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Assesion_idSchema_fkey` FOREIGN KEY (`idSchema`) REFERENCES `schema` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `assesmentimplementation`
--
ALTER TABLE `assesmentimplementation`
  ADD CONSTRAINT `AssesmentImplementation_idSptAssesor_fkey` FOREIGN KEY (`idSptAssesor`) REFERENCES `sptassesor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `assesmentschedule`
--
ALTER TABLE `assesmentschedule`
  ADD CONSTRAINT `AssesmentSchedule_idAssesion_fkey` FOREIGN KEY (`idAssesion`) REFERENCES `assesion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `asstestresult`
--
ALTER TABLE `asstestresult`
  ADD CONSTRAINT `AssTestResult_idBaSk_fkey` FOREIGN KEY (`idBaSk`) REFERENCES `bask` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `bask`
--
ALTER TABLE `bask`
  ADD CONSTRAINT `BaSk_idAssesmentSchedule_fkey` FOREIGN KEY (`idAssesmentSchedule`) REFERENCES `assesmentschedule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `blankapplication`
--
ALTER TABLE `blankapplication`
  ADD CONSTRAINT `BlankApplication_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `certapplication` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `carddist`
--
ALTER TABLE `carddist`
  ADD CONSTRAINT `CardDist_idPacking_fkey` FOREIGN KEY (`idPacking`) REFERENCES `packing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `certapplication`
--
ALTER TABLE `certapplication`
  ADD CONSTRAINT `CertApplication_idApproval_fkey` FOREIGN KEY (`idApproval`) REFERENCES `approval` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CertApplication_idCertPurpose_fkey` FOREIGN KEY (`idCertPurpose`) REFERENCES `certpurpose` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `certdist`
--
ALTER TABLE `certdist`
  ADD CONSTRAINT `CertDist_idCardDist_fkey` FOREIGN KEY (`idCardDist`) REFERENCES `carddist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `certholder`
--
ALTER TABLE `certholder`
  ADD CONSTRAINT `CertHolder_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `certapplication` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `certmanager`
--
ALTER TABLE `certmanager`
  ADD CONSTRAINT `CertManager_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `printblank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `certscanner`
--
ALTER TABLE `certscanner`
  ADD CONSTRAINT `CertScanner_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `printblank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `certstamp`
--
ALTER TABLE `certstamp`
  ADD CONSTRAINT `CertStamp_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `printblank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `certstorage`
--
ALTER TABLE `certstorage`
  ADD CONSTRAINT `CertStorage_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `printblank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `directursign`
--
ALTER TABLE `directursign`
  ADD CONSTRAINT `DirecturSign_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `printblank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `invoicedist`
--
ALTER TABLE `invoicedist`
  ADD CONSTRAINT `InvoiceDist_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `certapplication` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `minerbadata`
--
ALTER TABLE `minerbadata`
  ADD CONSTRAINT `MinerbaData_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `certapplication` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `minerbadist`
--
ALTER TABLE `minerbadist`
  ADD CONSTRAINT `MinerbaDist_idMinerbaData_fkey` FOREIGN KEY (`idMinerbaData`) REFERENCES `minerbadata` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `packing`
--
ALTER TABLE `packing`
  ADD CONSTRAINT `Packing_idSendCommand_fkey` FOREIGN KEY (`idSendCommand`) REFERENCES `sendcommand` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `paymentconfirmation`
--
ALTER TABLE `paymentconfirmation`
  ADD CONSTRAINT `PaymentConfirmation_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `certapplication` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `printassesion`
--
ALTER TABLE `printassesion`
  ADD CONSTRAINT `PrintAssesion_idAssTestResult_fkey` FOREIGN KEY (`idAssTestResult`) REFERENCES `asstestresult` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `printblank`
--
ALTER TABLE `printblank`
  ADD CONSTRAINT `PrintBlank_idPrintAssesion_fkey` FOREIGN KEY (`idPrintAssesion`) REFERENCES `printassesion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `printcompensation`
--
ALTER TABLE `printcompensation`
  ADD CONSTRAINT `PrintCompensation_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `printblank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `Receipt_idCertDist_fkey` FOREIGN KEY (`idCertDist`) REFERENCES `certdist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sendcommand`
--
ALTER TABLE `sendcommand`
  ADD CONSTRAINT `SendCommand_idSystemMiners_fkey` FOREIGN KEY (`idSystemMiners`) REFERENCES `systemminers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sptassesor`
--
ALTER TABLE `sptassesor`
  ADD CONSTRAINT `SptAssesor_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `certapplication` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `systemminers`
--
ALTER TABLE `systemminers`
  ADD CONSTRAINT `SystemMiners_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `printblank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tukconfirmation`
--
ALTER TABLE `tukconfirmation`
  ADD CONSTRAINT `TukConfirmation_idReceipt_fkey` FOREIGN KEY (`idReceipt`) REFERENCES `receipt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_idRole_fkey` FOREIGN KEY (`idRole`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
