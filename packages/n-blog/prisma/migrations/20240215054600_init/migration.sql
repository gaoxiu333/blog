/*
  Warnings:

  - Added the required column `npm` to the `Stack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repo` to the `Stack` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stack" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "repo" TEXT NOT NULL,
    "npm" TEXT NOT NULL
);
INSERT INTO "new_Stack" ("createdAt", "name", "updatedAt") SELECT "createdAt", "name", "updatedAt" FROM "Stack";
DROP TABLE "Stack";
ALTER TABLE "new_Stack" RENAME TO "Stack";
CREATE UNIQUE INDEX "Stack_name_key" ON "Stack"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
