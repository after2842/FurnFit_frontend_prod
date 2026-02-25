"use client"; // Fix typo: should be "use client" not "use state"
import { ConnectInstagram } from "./ConnectIg";
import UserHistory from "./UserHistory";
import { useState } from "react";
import YourFit from "./YourFit";

interface InstagramPost {
  id: string;
  caption: string;
  firstComment: string;
  images: string[];
  timestamp: string;
}
interface UserProfileProps {
  isAuthed: boolean;
}

export default function UserProfile({ isAuthed }: UserProfileProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [instagramData, setInstagramData] = useState<InstagramPost[]>([]);

  return (
    <div>
      {!isAuthed ? (
        "please login"
      ) : (
        <>
          <UserHistory />
          {!isConnected ? (
            <ConnectInstagram
              onConnected={(data) => {
                setIsConnected(true);
                setInstagramData(data);
              }}
            />
          ) : (
            <div>
              <YourFit posts={instagramData} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
