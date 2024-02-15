-- CreateTable
CREATE TABLE "Stack" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Npm" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Github" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Stack_name_key" ON "Stack"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Npm_name_key" ON "Npm"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Github_name_key" ON "Github"("name");
