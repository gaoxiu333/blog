-- CreateTable
CREATE TABLE "Package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "updateDate" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "createAt" TEXT NOT NULL,
    "contributorsCount" INTEGER NOT NULL,
    "commitsCount" INTEGER NOT NULL,
    "repo" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "issuesUrl" TEXT NOT NULL,
    "openIssuesCount" TEXT NOT NULL,
    "downloads" INTEGER NOT NULL,
    "errors" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
