import React, { useEffect } from 'react';

export const DisqusForum: React.FC = () => {
  useEffect(() => {
    // Check if script is already added
    const existingEmbedScript = document.querySelector('script[src*="disqus.com/embed.js"]');
    if (!existingEmbedScript) {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://agentic-ai-course-sl.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      (d.head || d.body).appendChild(s);
    } else if ((window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
      });
    }

    // Embed count script
    const existingCountScript = document.getElementById('dsq-count-scr');
    if (!existingCountScript) {
      const s = document.createElement('script');
      s.id = 'dsq-count-scr';
      s.src = 'https://agentic-ai-course-sl.disqus.com/count.js';
      s.async = true;
      (document.head || document.body).appendChild(s);
    }
  }, []);

  return (
    <section id="community-discussion" className="w-full bg-white border-t border-gray-200 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 pb-4 gap-2">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 block mb-1">
              05 / COMMUNITY & DISCUSSION
            </span>
            <h3 className="font-headline text-2xl md:text-3xl font-light uppercase tracking-wider text-black">
              Roastery Discussion Forum
            </h3>
          </div>
          <p className="text-xs font-mono text-gray-500 max-w-md">
            Join the conversation with roasters, cafe owners, and green bean buyers. Ask questions about custom roasts, extraction ratios, and wholesale logistics.
          </p>
        </div>

        {/* Disqus Embed Container */}
        <div className="bg-gray-50 border border-gray-200 p-6 md:p-8 min-h-[250px]">
          <div id="disqus_thread"></div>
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" className="underline text-black">
              comments powered by Disqus.
            </a>
          </noscript>
        </div>
      </div>
    </section>
  );
};
