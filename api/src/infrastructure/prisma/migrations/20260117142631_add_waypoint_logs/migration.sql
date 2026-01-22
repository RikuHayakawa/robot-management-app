/*
  Warnings:

  - You are about to drop the `RunHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `currentNodeId` on the `Robot` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Robot` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RunHistory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "WaypointLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "robotId" INTEGER NOT NULL,
    "nodeId" INTEGER NOT NULL,
    "battery" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WaypointLog_robotId_fkey" FOREIGN KEY ("robotId") REFERENCES "Robot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WaypointLog_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Node" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL
);
INSERT INTO "new_Node" ("id", "name", "x", "y") SELECT "id", "name", "x", "y" FROM "Node";
DROP TABLE "Node";
ALTER TABLE "new_Node" RENAME TO "Node";
CREATE TABLE "new_Robot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Robot" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Robot";
DROP TABLE "Robot";
ALTER TABLE "new_Robot" RENAME TO "Robot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
