-- CreateTable
CREATE TABLE "PostDB" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostDB_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostDB" ADD CONSTRAINT "PostDB_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserDB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
