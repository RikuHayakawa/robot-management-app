'use client';

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20">
      <div className="relative h-20 w-20">
        {/* パルスする外側のリング（ソナー効果） */}
        <div
          className="absolute inset-0 rounded-full border-2 border-primary/40 [animation:loading-pulse-ring_1.6s_ease-out_infinite]"
          aria-hidden
        />

        {/* 土台のトラック */}
        <div
          className="absolute inset-0 rounded-full border-[3px] border-[rgba(255,255,255,0.12)]"
          aria-hidden
        />

        {/* スピナー（primary 一色）＋ グロー */}
        <div
          className="absolute inset-0 rounded-full [box-shadow:0_0_24px_rgba(59,130,246,0.35)] animate-spin"
          style={{
            background: `conic-gradient(from 0deg, var(--color-primary) 0deg 120deg, transparent 120deg)`,
            mask: 'radial-gradient(circle, transparent 56%, black 56%)',
            WebkitMask: 'radial-gradient(circle, transparent 56%, black 56%)',
          }}
          aria-hidden
        />

      </div>

      <p className="mt-5 text-sm text-muted">読み込み中</p>
    </div>
  );
};
