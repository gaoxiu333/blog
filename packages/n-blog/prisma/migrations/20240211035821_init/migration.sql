-- CreateTable
CREATE TABLE "Projects" (
    "packageName" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stack" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "Package" (
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
    "createdDate" DATETIME,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_packageName_key" ON "Projects"("packageName");

-- CreateIndex
CREATE UNIQUE INDEX "Stack_name_key" ON "Stack"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Package_name_key" ON "Package"("name");
