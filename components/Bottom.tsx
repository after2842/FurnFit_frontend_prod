import { User, Instagram, Twitter, Github, Linkedin } from "lucide-react";
const Bottom = () => {
  return (
    <div className="bottom-0 z-50 bg-white/50 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center text-center justify-between">
        <img src="/logo5.svg" alt="/>" width={36} className="text-slate-400" />
        <div className="text-xs lg:text-sm">{""}</div>
        <div className="flex gap-4">
          <a
            href="#"
            className="text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <span className="sr-only">Instagram</span>
            <Instagram size={24} />
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/after2842/FurnFit_frontend_prod"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <Github size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
