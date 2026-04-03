/*
  Warnings:

  - Made the column `cuid` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cuid" SET NOT NULL;
