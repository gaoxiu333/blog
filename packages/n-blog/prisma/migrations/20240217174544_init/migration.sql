-- CreateTable
CREATE TABLE "Stack" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "repo" TEXT NOT NULL,
    "npm" TEXT NOT NULL,
    "tag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Npm" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL,
    "downloads" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "tag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Github" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL,
    "version" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "commits" INTEGER NOT NULL,
    "contributors" INTEGER NOT NULL,
    "issues" INTEGER NOT NULL,
    "issuesLink" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "tag" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Stack_name_key" ON "Stack"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Npm_name_key" ON "Npm"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Github_name_key" ON "Github"("name");
