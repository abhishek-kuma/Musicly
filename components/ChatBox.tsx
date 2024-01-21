'use client'
import * as React from "react"
import { CheckIcon, PaperPlaneIcon, PlusIcon } from "@radix-ui/react-icons"
import { IoMdClose } from "react-icons/io";
import { useGlobalContextProvider } from "@/assets/GlobalContext";
import authService from "@/appwrite/config"
import { appWriteChatCollectionId, appWriteDatabaseId } from '@/appwrite/secrets';
import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"


interface gloablInfoInterface {
  chatboxOpen: boolean;
  setchatboxOpen: Function;
  userid: string;
  name: string;
}

interface Payload {
  receiverid: string;
  content: string;
}

interface Message {
  role: string;
  content: string;
}

const users = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
    id: "9898"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "https://github.com/shadcn.png",
    id: "8989"
  },
] as const

type User = (typeof users)[number]

export default function ChatBox() {
  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length
  const [open, setOpen] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])
  const { chatboxOpen, setchatboxOpen, userid, name } = useGlobalContextProvider() as gloablInfoInterface
  const [ReceiverId, setReceiverId] = React.useState("");
  const [ReceiverName, setReceiverName] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);

  async function getPrevMsgs() {
    try {
      const resp = await authService.getPrevMessages({ userid: userid, receiverid: ReceiverId })
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }


  React.useEffect(() => {
    getPrevMsgs();
    const unsubscribe = authService.client.subscribe(`databases.${appWriteDatabaseId}.collections.${appWriteChatCollectionId}.documents`, (response: { payload: Payload }) => {
      if (response.payload.receiverid === userid) {
        console.log("A new document is created", response);
        setMessages([
          ...messages,
          {
            role: "agent",
            content: response.payload.content,
          },
        ])
      }

      return () => {
        unsubscribe();
      };
    });
  }, [chatboxOpen])


  async function handleSendMessage() {
    try {
      console.log("button is clicked")
      if (inputLength === 0) return
      setMessages([
        ...messages,
        {
          role: "user",
          content: input,
        },
      ])
      await authService.sendChat({ content: input, senderId: userid, receiverId: ReceiverId, senderName: name, receiverName: ReceiverName })
      setInput("")

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <>
      <Card className="">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>

                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">New message</span>
                </Button>

              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>


                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto rounded-full bg-red-500"
                  onClick={() => setchatboxOpen(false)}

                >
                  <IoMdClose className="h-4 w-4" />
                  <span className="sr-only">Close Chat</span>
                </Button>




              </TooltipTrigger>
              <TooltipContent sideOffset={10}>Close Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-[350px]">
            <div className="space-y-4">

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            // onSubmit={(event) => {
            //   event.preventDefault()
            //   if (inputLength === 0) return
            //   setMessages([
            //     ...messages,
            //     {
            //       role: "user",
            //       content: input,
            //     },
            //   ])
            //   setInput("")
            // }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage()
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <PaperPlaneIcon className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Invite a user to this thread. This will create a new group
              message.
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        // Setting the current user ID and the User Name of the person we want to send message

                        setReceiverId(user.id);
                        setReceiverName(user.name);

                        console.log("Receiver ID is : ", ReceiverId);
                        console.log("Receiver Name is : ", ReceiverName);

                        return setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser !== user
                          )
                        )
                      }

                      return setSelectedUsers(
                        [...users].filter((u) =>
                          [...selectedUsers, user].includes(u)
                        )
                      )
                    }}

                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt="Image" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.includes(user) ? (
                      <CheckIcon className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedUsers.length === 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedUsers.map((user) => (
                  <Avatar
                    key={user.email}
                    className="inline-block border-2 border-background"
                  >
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select users you want to chat with.
              </p>
            )}
            <Button
              disabled={selectedUsers.length !== 1}
              onClick={() => {
                setOpen(false)
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}