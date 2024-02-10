/*
  Warnings:

  - The primary key for the `Package` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Package` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Package" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "updateDate" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "contributorsCount" INTEGER NOT NULL,
    "commitsCount" INTEGER NOT NULL,
    "repo" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "issuesUrl" TEXT NOT NULL,
    "openIssuesCount" INTEGER NOT NULL,
    "downloads" INTEGER NOT NULL,
    "errors" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Package" ("commitsCount", "contributorsCount", "description", "downloads", "errors", "homepage", "issuesUrl", "language", "name", "openIssuesCount", "packageName", "repo", "stars", "tag", "updateDate", "updatedAt", "version") SELECT "commitsCount", "contributorsCount", "description", "downloads", "errors", "homepage", "issuesUrl", "language", "name", "openIssuesCount", "packageName", "repo", "stars", "tag", "updateDate", "updatedAt", "version" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
CREATE UNIQUE INDEX "Package_name_key" ON "Package"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
