-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "since" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 1.0,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Restaurant" ("createdAt", "id", "imageUrl", "location", "name", "ownerName", "since", "userId") SELECT "createdAt", "id", "imageUrl", "location", "name", "ownerName", "since", "userId" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
