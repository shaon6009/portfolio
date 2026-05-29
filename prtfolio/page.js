import { createClient } from '@supabase/supabase-js';
import ProjectCard from '@/components/ProjectCard';

async function getPortfolioData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) return [];
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Supabase load connection error:", error);
    return [];
  }
  return data;
}

export default async function HomePage() {
  const projects = await getPortfolioData();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold tracking-tight text-slate-900 text-sm uppercase">
            SHAON <span className="text-teal-600">.</span> BI
          </span>
          <nav className="flex gap-6 text-xs font-semibold tracking-wider uppercase text-slate-600">
            <a href="#experience" className="hover:text-teal-600 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-teal-600 transition-colors">Analytics Engine</a>
            <a href="#athletic" className="hover:text-teal-600 transition-colors">The Pitch</a>
          </nav>
        </div>
      </header>

      {/* Corporate Executive Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/60 rounded-full px-4 py-1 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-teal-800 text-[11px] font-bold uppercase tracking-widest">Available for MNC Internships & Analytics Roles</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            MD RAKIBUL HASAN SHAON
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            Business Intelligence Professional with a background in Software Engineering. Transforming complex data into core structural logistics KPIs and automated executive dashboards.
          </p>
          <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-wider">
            <div className="bg-white border border-slate-200 text-slate-800 px-5 py-3 rounded-xl shadow-sm">
              🏆 NASA Space Apps Finalist
            </div>
            <div className="bg-white border border-slate-200 text-slate-800 px-5 py-3 rounded-xl shadow-sm">
              📊 Medallion Pipeline Specialist
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience" className="max-w-5xl mx-auto px-6 py-20 w-full">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 text-center mb-12">Corporate Experience & Milestones</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Data Analyst and AI Engineer</h3>
                <p className="text-sm text-teal-600 font-semibold">ByteBlooper</p>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">Feb 2025 - Dec 2025</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
              <li>Analyzed operational datasets using SQL and Python to streamline data architectures.</li>
              <li>Developed custom Tableau and Power BI dashboards tracking resource performance.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Project Coordinator</h3>
                <p className="text-sm text-teal-600 font-semibold">Golden Vault</p>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">Apr 2024 - Jan 2025</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
              <li>Coordinated cross-functional teams ensuring pipeline milestone delivery.</li>
              <li>Managed resource planning configurations and task workflows.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Business Intelligence Project Showcase */}
      <section id="projects" className="bg-slate-100 border-y border-slate-200/60 px-6 py-20 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 text-center mb-2">Business Intelligence Pipeline Portfolio</h2>
          <p className="text-slate-500 text-sm text-center mb-12">Live operations synced securely via your Google Drive Storage</p>
          
          {projects.length === 0 ? (
            <div className="bg-white text-center p-12 rounded-2xl border border-slate-200 text-sm text-slate-500 max-w-md mx-auto">
              No live database projects injected yet. Please visit the admin dashboard to add your first project.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <ProjectCard 
                  key={proj.id}
                  title={proj.title}
                  description={proj.description}
                  category={proj.category}
                  technologies={proj.technologies}
                  media_url={proj.media_url}
                  media_type={proj.media_type}
                  github_link={proj.github_link}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Culture & Leadership section */}
      <section id="athletic" className="max-w-4xl mx-auto px-6 py-20 w-full text-center">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 uppercase mb-4">Leadership & The Athletic Edge</h2>
        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
          Bringing core strategic focus, split-second analytical reflexes, and deep defensive synchronization from my athletic background as a **competitive football goalkeeper and defender** right into critical corporate project management spaces.
        </p>
      </section>

      <footer className="bg-white border-t border-slate-100 mt-auto py-8 px-6 text-center text-xs text-slate-400 font-medium uppercase tracking-wider">
        © 2026 MD RAKIBUL HASAN SHAON. Built with Next.js & Google Cloud.
      </footer>
    </div>
  );
}
