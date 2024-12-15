/*
  Warnings:

  - The values [quaterly] on the enum `PlanPeriod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlanPeriod_new" AS ENUM ('yearly', 'monthly', 'quarterly');
ALTER TABLE "Plan" ALTER COLUMN "period" TYPE "PlanPeriod_new" USING ("period"::text::"PlanPeriod_new");
ALTER TYPE "PlanPeriod" RENAME TO "PlanPeriod_old";
ALTER TYPE "PlanPeriod_new" RENAME TO "PlanPeriod";
DROP TYPE "PlanPeriod_old";
COMMIT;
