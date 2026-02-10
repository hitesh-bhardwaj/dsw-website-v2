// components/CornerDecorations.tsx
export default function CornerDecorations({
  hoverColor = "#0205fa",
  baseColor = "black",
}) {
  const line = `
    w-[8px] h-[1px]
    duration-300 ease-in-out
  `;

  return (
    <>
      {/* Top Left */}
      <div className="absolute -top-[0.25%] -left-[0.25%] w-fit h-fit group-hover:-top-[3%] group-hover:-left-[3%] duration-300 ease-in-out">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[3.5px] -left-1/2`}
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-[0.8%] -right-[1.5%] w-fit h-fit rotate-90 group-hover:-top-[2.2%] group-hover:-right-[4.5%] duration-300 ease-in-out">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[3.5px] -left-1/2`}
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[0.7%] -left-[1.4%] w-fit h-fit -rotate-90 group-hover:-bottom-[2.2%] group-hover:-left-[4.5%] duration-300 ease-in-out">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[3.5px] -left-1/2`}
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute -bottom-[0.3%] -right-[0.25%] w-fit h-fit rotate-180 group-hover:-bottom-[3%] group-hover:-right-[3%] duration-300 ease-in-out">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[3.5px] -left-1/2`}
        />
      </div>
    </>
  );
}
