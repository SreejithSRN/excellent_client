import { useState, useEffect } from "react";
import { StarIcon, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { commonRequest } from "../../common/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Review {
  _id: string;
  userRef: {
    _id: string;
    name: string;
  };
  rating: number;
  reviewText: string;
  reactions: {
    like: string[];
    dislike: string[];
  };
  comments: {
    userRef: {
      _id: string;
      name: string;
    };
    commentText: string;
    createdAt: string;
  }[];
  createdAt: string;
}

const ReviewSection = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await commonRequest<Review[]>("GET", `/api/course/review/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <ToastContainer />
      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-semibold">All Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500 text-base">No reviews available for this course.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border rounded p-4">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{review.userRef.name}</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon
                      key={s}
                      className={`w-4 h-4 ${review.rating >= s ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2">{review.reviewText}</p>
              <div className="flex gap-4 mt-2 text-gray-500 text-sm">
                <div className="flex items-center gap-1 cursor-default">
                  <ThumbsUp className="w-4 h-4" /> {review.reactions.like.length}
                </div>
                <div className="flex items-center gap-1 cursor-default">
                  <ThumbsDown className="w-4 h-4" /> {review.reactions.dislike.length}
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Comments
                </h4>
                {review.comments.map((c, idx) => (
                  <div key={idx} className="pl-4 border-l mb-2">
                    <span className="font-semibold">{c.userRef.name}:</span> {c.commentText}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;