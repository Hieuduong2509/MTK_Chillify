import React from "react";

const ProgressBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-sidebar-dark backdrop-blur-xl border-t border-slate-200 dark:border-border-dark px-6 flex items-center justify-between z-50">
      {/* <!-- Current Song --> */}
      <div className="flex items-center gap-4 w-1/3">
        <div className="w-14 h-14 rounded-lg overflow-hidden shadow-md">
          <img
            className="w-full h-full object-cover"
            data-alt="Miniature neon album cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUw5NjpGhtIUgy_UnHZPJriFj2HFylOzheIICwLjUWs4dsintHCCzJ8-ybMLHR2WKXxMmgcVMVsccheIdovaLDeDqd_vcfIpxd4uQyZv7tkUm5Y4CD0yT_e0_S7uhbDFIh_CDPvsIpr-3yOsEY1Gt_pNwrbqxl6A9x2i6zgxIaLHk9I53MfvW34pxxNsRapsgmARu5_Pjx3TqAmPBLoqVVBlbnI1qIbU449XHlaxy_nW_sO43G6BwGXjbyX2RjVCAy91zw0UDEWS8R"
          />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            Neon Nights
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Synthetix
          </p>
        </div>
        <button
          className="ml-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
          title="Love this song"
        >
          <span className="material-symbols-outlined text-xl">favorite</span>
        </button>
      </div>
      {/* <!-- Controls --> */}
      <div className="flex flex-col items-center gap-2 w-1/3">
        <div className="flex items-center gap-6">
          <button
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Shuffle"
          >
            <span className="material-symbols-outlined">shuffle</span>
          </button>
          <button className="text-slate-600 dark:text-white hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-2xl">
              skip_previous
            </span>
          </button>
          <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <span className="material-symbols-outlined fill-1 text-2xl">
              play_arrow
            </span>
          </button>
          <button className="text-slate-600 dark:text-white hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-2xl">
              skip_next
            </span>
          </button>
          <button
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Repeat"
          >
            <span className="material-symbols-outlined">repeat</span>
          </button>
        </div>
        <div className="w-full max-w-lg flex items-center gap-3">
          <span className="text-[14px] text-slate-500">1:24</span>
          <div className="flex-1 h-1 bg-slate-200 dark:bg-border-dark rounded-full relative overflow-hidden group cursor-pointer">
            <div className="absolute left-0 top-0 h-full w-[40%] bg-primary group-hover:bg-primary/80"></div>
          </div>
          <span className="text-[14px] text-slate-500">3:45</span>
        </div>
      </div>
      {/* <!-- Volume & Tools --> */}
      <div className="flex items-center justify-end gap-4 w-1/3">
        <button className="text-slate-400 hover:text-white transition-colors cursor-pointer">
          <span className="material-symbols-outlined">lyrics</span>
        </button>
        <button className="text-slate-400 hover:text-white transition-colors cursor-pointer">
          <span className="material-symbols-outlined">queue_music</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer">
            volume_up
          </span>
          <div className="w-24 h-1 bg-slate-200 dark:bg-border-dark rounded-full relative overflow-hidden group cursor-pointer">
            <div className="absolute left-0 top-0 h-full w-[70%] bg-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
