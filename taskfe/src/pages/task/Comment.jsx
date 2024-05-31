const Comment = ({comment})=>{
    return <div className="border-solid border-[1px] p-[8px] my-[20px] border-[#666666] rounded-[12px]">
        <h1 className="m-[0px] text-[16px]">{comment?.name}</h1>
        <p className="m-[0px] text-[#666666]">{comment?.detail}</p>
    </div>
}


export default Comment;