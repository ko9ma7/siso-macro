const Spinner = () => {
    return (
        <div className="absolute w-full h-full flex justify-center items-center gap-1 bg-[#000000] bg-opacity-40 rounded-[8px]">
            <div className="w-[14px] h-[14px] bg-[#DCCBFF] rounded-[40px] animate-[bounce_1s_ease-in-out_infinite]" />
            <div className="w-[14px] h-[14px] bg-[#FFDCD7] rounded-[40px] animate-[rebounce_1s_ease-in-out_infinite]" />
            <div className="w-[14px] h-[14px] bg-[#FFE7B8] rounded-[40px] animate-[bounce_1s_ease-in-out_infinite]" />
        </div>
    );
}
export default Spinner;