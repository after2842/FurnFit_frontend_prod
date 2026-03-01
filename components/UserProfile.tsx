"use client"; // Fix typo: should be "use client" not "use state"
import { ConnectInstagram } from "./ConnectIg";
import UserHistory from "./UserHistory";
import { useState } from "react";
import YourFit from "./YourFit";

interface ArchetypeScore {
  label: string;
  score: number;
  confidence: number;
  evidence_refs: string[];
}

interface EvidenceItem {
  post_shortcode: string;
  excerpt: string;
}

interface InstagramAnalysis {
  username: string;
  summary: string;
  aesthetic_archetypes: ArchetypeScore[];
  lifestyle_and_occasion: ArchetypeScore[];
  color_and_pattern_affinity: ArchetypeScore[];
  evidence_index: EvidenceItem[];
  overall_confidence: number;
  missing_data: string[];
}
interface UserProfileProps {
  isAuthed: boolean;
}

export default function UserProfile({ isAuthed }: UserProfileProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [InstaAnalysis, setInstaAnalysis] = useState<InstagramAnalysis | null>(
    null
  );

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
                setInstaAnalysis(data);
              }}
            />
          ) : (
            <div>{InstaAnalysis && <YourFit data={InstaAnalysis} />}</div>
          )}
        </>
      )}
    </div>
  );
}
