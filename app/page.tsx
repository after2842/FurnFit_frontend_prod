import Navbar from "@/components/Navbar";
import PreferencesScreen from "@/components/Preference";
import Bottom from "@/components/Bottom";
import { Post } from "@/components/Post";
import { IgProfile } from "@/components/IgProfile";
export default function Home() {
  return (
    <div>
      <Navbar />
      <PreferencesScreen />

      <IgProfile />

      <Bottom />
    </div>
  );
}
