/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Nucleo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Nucleo_nome_key" ON "Nucleo"("nome");
