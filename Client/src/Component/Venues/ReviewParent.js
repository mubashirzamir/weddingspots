import React, { useState, useEffect, useCallback } from "react";
import AddReview from './AddReview'
import ReviewList from './ReviewList'

const ReviewParent = () => {

    const [buttonPress, setButtonPress] = useState(false);

    return (
        <div className="mt-4">
            <AddReview onButtonPressChange={() => setButtonPress(!buttonPress)} />
            <ReviewList buttonPress={buttonPress} />
        </div>
    )
}

export default ReviewParent