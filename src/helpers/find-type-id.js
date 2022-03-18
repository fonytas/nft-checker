const findTypeId = (tokenId) => {
    const offset = 17
    //         // tokenid/(2^bitoofset) ปัดลง --> * (2^bitoofset) กลับเข้าไป
    return Math.floor(tokenId/(Math.pow(2, offset))) * (Math.pow(2, offset))
}

export default findTypeId
