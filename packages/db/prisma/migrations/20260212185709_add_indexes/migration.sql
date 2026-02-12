-- CreateIndex
CREATE INDEX "FriendRequest_receiverId_status_idx" ON "public"."FriendRequest"("receiverId", "status");

-- CreateIndex
CREATE INDEX "FriendRequest_createdAt_idx" ON "public"."FriendRequest"("createdAt");
