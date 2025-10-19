import { CometCard } from "../Component/ui/comet-card.jsx";

export function CometCardDemo() {
  return (
    <CometCard>
      <button
        type="button"
        className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-orange-500 p-2  md:my-20 md:p-4"
        aria-label="View invite F7RA"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}>
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] ">
            <img
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[16px]  object-cover contrast-75"
              alt="Invite background"
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                opacity: 1,
              }} />
          </div>
        </div>
        <div
          className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
         
        </div>
      </button>
    </CometCard>
  );
}
