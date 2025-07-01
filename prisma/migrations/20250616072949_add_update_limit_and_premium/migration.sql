-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updateCount" INTEGER NOT NULL DEFAULT 0;
