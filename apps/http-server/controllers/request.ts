import { prismaClient } from "@repo/db/client";
import { type Request, type Response } from "express";
import { success } from "zod";



export const sendRequest = async (req: Request, res: Response) => {
    try {
        const senderId = req.user
        const { receiverId } = req.body

        // Validation
        if (!senderId) {
            return res.status(401).json({
                message: "Unauthorized - User not authenticated",
                success: false
            })
        }

        if (!receiverId || receiverId.trim() === '') {
            return res.status(400).json({
                message: "Receiver ID is required",
                success: false
            })
        }

        // Prevent self-request
        if (senderId === receiverId) {
            return res.status(400).json({
                message: "You cannot send a friend request to yourself",
                success: false
            })
        }

        // Check if receiver exists
        const receiverExists = await prismaClient.user.findUnique({
            where: { id: receiverId }
        })

        if (!receiverExists) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // Check if already friends
        const existingFriendship = await prismaClient.friendship.findFirst({
            where: {
                OR: [
                    { user1Id: senderId, user2Id: receiverId },
                    { user1Id: receiverId, user2Id: senderId }
                ]
            }
        })

        if (existingFriendship) {
            return res.status(400).json({
                message: "You are already friends with this user",
                success: false
            })
        }

        // Check if request already sent
        const checkIfAlreadySent = await prismaClient.friendRequest.findFirst({
            where: {
                senderId: senderId,
                receiverId: receiverId,
                status: 'PENDING'
            }
        })

        if (checkIfAlreadySent) {
            return res.status(400).json({
                message: "Friend request already sent",
                success: false
            })
        }

        // Check if reverse request exists
        const reverseRequest = await prismaClient.friendRequest.findFirst({
            where: {
                senderId: receiverId,
                receiverId: senderId,
                status: 'PENDING'
            }
        })

        if (reverseRequest) {
            return res.status(400).json({
                message: "This user has already sent you a friend request",
                success: false
            })
        }

        // Create friend request
        const response = await prismaClient.friendRequest.create({
            data: {
                senderId: senderId,
                receiverId: receiverId
            }
        })

        return res.status(201).json({
            message: "Friend request sent successfully",
            success: true,
            data: response
        })

    } catch (error: any) {
        console.error("Error sending friend request:", error)
        if (error.code === 'P2002') {
            return res.status(400).json({
                message: "Friend request already exists",
                success: false
            })
        }

        if (error.code === 'P2003') {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        return res.status(500).json({
            message: "Server error while sending request",
            success: false,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
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

    if(!senderId){
      throw new Error("senderId is required");
    }

    if (!friendId || !content) {
      return res.status(400).json({ message: "Missing data" });
    }
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

    const [u1, u2] = [senderId, friendId].sort();

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



export const findPeople = async (req: Request, res: Response) => {
  try{
    const userId = req.user;
    const {userName} = req.query;

    if(!userName){
      return res.status(400).json({
        message:"user name is required"
      })
    }

    const response = await prismaClient.user.findMany({
      where:{
        username: {
          startsWith: userName as string,
          mode: "insensitive"
        }
      },
      select:{
        username: true,
        name: true,
        id: true
      }
    })

    if(response.length === 0){
      return res.status(404).json({
        message:"No user found with this username",
        success:false
      })
    }

    return res.status(200).json({
      message:"user found",
      success:true,
      response
    })

  }catch(error){
    return res.status(500).json({
      message:"Server error while finding people",
      success: false
    })
  }
}