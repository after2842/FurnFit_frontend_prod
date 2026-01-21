import Navbar from "@/components/Navbar";
import PreferencesScreen from "@/components/Preference";
import Bottom from "@/components/Bottom";
export default function Home() {
  return (
    <div>
      <Navbar />
      <PreferencesScreen />
      <Bottom />
    </div>
  );
}
