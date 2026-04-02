import { useState } from "react";

const ReviewCard=({review})=>{
    return (
        <>
            <h1>{review.reviewer}</h1>
            <h1>{review.rating}</h1>
            <h1>{review.comment}</h1>
        </>
    )
}

export default ReviewCard