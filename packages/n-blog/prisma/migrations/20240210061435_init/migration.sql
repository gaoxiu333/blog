/*
  Warnings:

  - You are about to alter the column `openIssuesCount` on the `Package` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
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
INSERT INTO "new_Package" ("commitsCount", "contributorsCount", "description", "downloads", "errors", "homepage", "id", "issuesUrl", "language", "name", "openIssuesCount", "packageName", "repo", "stars", "tag", "updateDate", "updatedAt", "version") SELECT "commitsCount", "contributorsCount", "description", "downloads", "errors", "homepage", "id", "issuesUrl", "language", "name", "openIssuesCount", "packageName", "repo", "stars", "tag", "updateDate", "updatedAt", "version" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
