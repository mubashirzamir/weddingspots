import React, { useState } from "react";
import AddReview from './AddReview';
import ReviewList from './ReviewList';

const ReviewParent = () => {

    const [buttonPress, setButtonPress] = useState(false);

    return (
        <div className="mt-5">
            <AddReview onButtonPressChange={() => setButtonPress(!buttonPress)} />
            <ReviewList buttonPress={buttonPress} />
        </div>
    )
}

export default ReviewParent