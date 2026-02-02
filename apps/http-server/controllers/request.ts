import { prismaClient } from "@repo/db/client";
import { type Request, type Response } from "express";



export const sendRequest = async (req: Request, res: Response) => {
    try{
        const senderId = req.user
        const {receiverId} = req.body;
    if(!senderId || !receiverId){
        return res.status(404).json({
            message:"Required all credentials",
            success: false
        })
    }

    const response = await prismaClient.friendRequest.create({
        data:{
            senderId: senderId,
            receiverId: receiverId
        }
    })

    if(!response){
        return res.status(403).json({
            success:false,
            message:"Error while sending request"
        })
    }

    return res.status(202).json({
        message:"Request sent successfully",
        success:true
    })
    }catch(error){
        return res.status(500).json({
            message:"Server error while sending request",
            success:false
        })
    }
    
}


export const getAllRequest = async (req:Request, res:Response) => {
    try{
        const userId = req.user;
        const response = await prismaClient.friendRequest.findMany({
            where:{
                receiverId: userId,
                status: "PENDING"
            }
        })

        if(!response){
            return res.status(404).json({
                message:"Error while fetching all user requests",
                success:false
            })
        }

        res.status(200).json({
            message:"All user requests",
            success:true,
            response
        })
    }catch(error){
        return res.status(500).json({
            message:"Server error while fetching all user requests",
            success:false
        })
    }
}



export const acceptRequest = async (req:Request, res:Response) => {
    try{
        const userId = req.user
        const {requestId} = req.body;

        if(!requestId) {
            return res.status(400).json({ message: "Request ID is required" });
        }

        const findFrienRequest = await prismaClient.friendRequest.findUnique({
            where:{
                id: requestId
            }
        })

        if(!findFrienRequest){
            return res.status(404).json({ message: "Request not found" });
        }

        if(findFrienRequest.receiverId !== userId){
            return res.status(403).json({message:"Not authorized"});
        }

        if(findFrienRequest.status !== "PENDING"){
            return res.status(403).json({message:"request already handled"});
        }

        const ids = [findFrienRequest.senderId, findFrienRequest.receiverId].sort();
        const user1Id = ids[0] as string;
        const user2Id = ids[1] as string;

        
        await prismaClient.$transaction([
        prismaClient.friendRequest.update({
            where: { id: requestId },
            data: { status: "ACCEPTED" },
        }),
        prismaClient.friendship.create({
            data: { user1Id, user2Id },
        }),
        ]);

        return res.status(200).json({
            message: "Friend request accepted",
        });


    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}



export const getAllFriends = async (req: Request, res: Response) => {
    try{    
        const userId = req.user;

        const friendships = await prismaClient.friendship.findMany({
            where:{
                OR:[
                    {user1Id: userId},
                    {user2Id: userId}
                ]
            },
            include: {
                user1:{
                    select:{
                        id: true,
                        name: true,
                        username: true
                    }
                },
                user2:{
                    select:{
                        id: true,
                        name: true,
                        username: true
                    }
                }
            }
        })

        // console.log(friendships);

        const friends = friendships.map((f) => 
            f.user1Id === userId ? f.user2 : f.user1
        )

        return res.status(200).json({
            message:"Your friends list",
            success:true,
            friends
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}




export const openConversation = async (req: Request, res: Response) => {
  try {
    const userId = req.user;      
    const { friendId } = req.body;   


    const [u1, u2] = [userId, friendId].sort();

    let convo = await prismaClient.conversation.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id: u1,
          user2Id: u2,
        },
      },
    });

    if (!convo) {
      convo = await prismaClient.conversation.create({
        data: { user1Id: u1, user2Id: u2 },
      });
    }

    return res.status(200).json({ conversation: convo });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const sendMessage = async (req: Request, res: Response) => {
  try {
    const senderId = req.user
    const { friendId, content } = req.body;

    console.log(friendId, content);

    if (!friendId || !content) {
      return res.status(400).json({ message: "Missing data" });
    }

    // 1️⃣ Check friendship (VERY IMPORTANT)
    const isFriend = await prismaClient.friendship.findFirst({
      where: {
        OR: [
          { user1Id: senderId, user2Id: friendId },
          { user1Id: friendId, user2Id: senderId },
        ],
      },
    });

    if (!isFriend) {
      return res.status(403).json({ message: "You are not friends" });
    }

    // 2️⃣ Normalize order
    const [u1, u2] = [senderId, friendId].sort();

    // 3️⃣ Find or create conversation
    let conversation = await prismaClient.conversation.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id: u1,
          user2Id: u2,
        },
      },
    });

    if (!conversation) {
      conversation = await prismaClient.conversation.create({
        data: {
          user1Id: u1,
          user2Id: u2,
        },
      });
    }

    // 4️⃣ Save message
    const message = await prismaClient.message.create({
      data: {
        content,
        senderId,
        conversationId: conversation.id,
      },
    });

    return res.status(201).json({
      message: "Message sent",
      data: message,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const getMessages = async (req: Request, res: Response) => {
  try {
    const conversationId = req.params.conversationId as string;
    console.log("con", conversationId);
    
    if (!conversationId) {
      return res.status(400).json({ message: "Conversation ID is required" });
    }

    const messages = await prismaClient.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
