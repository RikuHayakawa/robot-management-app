/*
  Warnings:

  - You are about to drop the column `createdAt` on the `WaypointLog` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `WaypointLog` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WaypointLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "robotId" INTEGER NOT NULL,
    "nodeId" INTEGER NOT NULL,
    "battery" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "WaypointLog_robotId_fkey" FOREIGN KEY ("robotId") REFERENCES "Robot" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WaypointLog_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WaypointLog" ("battery", "id", "nodeId", "robotId", "timestamp") SELECT "battery", "id", "nodeId", "robotId", "timestamp" FROM "WaypointLog";
DROP TABLE "WaypointLog";
ALTER TABLE "new_WaypointLog" RENAME TO "WaypointLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
