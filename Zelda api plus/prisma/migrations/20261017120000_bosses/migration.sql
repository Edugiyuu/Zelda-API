-- CreateTable
CREATE TABLE "bosses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "bosses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boss_appearances" (
    "boss_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "boss_appearances_pkey" PRIMARY KEY ("boss_id","game_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bosses_name_key" ON "bosses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");

-- AddForeignKey
ALTER TABLE "boss_appearances" ADD CONSTRAINT "boss_appearances_boss_id_fkey" FOREIGN KEY ("boss_id") REFERENCES "bosses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boss_appearances" ADD CONSTRAINT "boss_appearances_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

