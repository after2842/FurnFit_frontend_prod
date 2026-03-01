import Image from "next/image";
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
export default function YourFit({ data }: { data: InstagramAnalysis }) {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Summary */}
      <h2 className="text-2xl font-bold text-slate-900">Your Fit</h2>
      <p className="text-lg text-slate-700">
        <p className="text-slate-600 text-sm mt-1 mb-6">
          Overall Confidence: {(data.overall_confidence * 100).toFixed(0)}%
        </p>
      </p>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Summary</h1>
        <p className="text-slate-700">{data.summary}</p>
      </div>
      <div className="flex justify-between mt-12 gap-8">
        <div className="flex-1">
          <div className="mb-6 border p-4 border-black rounded-md h-full">
            <div className="">
              <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">
                My Aesthetic
              </h3>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              {data.aesthetic_archetypes.map((archetype, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className={`font-medium ${
                      archetype.score * 100 >= 85
                        ? "text-indigo-600"
                        : archetype.score * 100 >= 60
                        ? "text-black"
                        : archetype.score * 100 >= 40
                        ? "text-black"
                        : "text-black"
                    }`}
                  >
                    {archetype.label.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lifestyle and Occasion */}
        <div className="flex-1">
          <div className="mb-6 border p-4 border-black rounded-md h-full">
            <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">
              Life & Style
            </h3>
            <div className="flex flex-col items-center space-y-2">
              {data.lifestyle_and_occasion.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className={`font-medium ${
                      item.score * 100 >= 85
                        ? "text-indigo-600"
                        : item.score * 100 >= 60
                        ? "text-black"
                        : item.score * 100 >= 40
                        ? "text-black"
                        : "text-black"
                    }`}
                  >
                    {item.label.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Color and Pattern Affinity */}
        <div className="flex-1">
          <div className="mb-6 border p-4 border-black rounded-md h-full">
            <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">
              Color & Pattern
            </h3>
            <div className="flex flex-col items-center space-y-2">
              {data.color_and_pattern_affinity.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className={`font-medium ${
                      item.score * 100 >= 85
                        ? "text-indigo-600"
                        : item.score * 100 >= 60
                        ? "text-black"
                        : item.score * 100 >= 40
                        ? "text-black"
                        : "text-black"
                    }`}
                  >
                    {item.label.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
