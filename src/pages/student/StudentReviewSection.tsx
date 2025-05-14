import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { StarIcon, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
// import { RootState } from "../../redux";
import { commonRequest } from "../../common/api";
import { toast, ToastContainer } from "react-toastify";
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

const StudentReviewSection = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  // const { data } = useSelector((state: RootState) => state.user);

  

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

  const handleReviewSubmit = async () => {
    if (!rating || !reviewText.trim()) {
      toast.error("Provide both star rating and comment")
      return;
    }
    try {
      const response=await commonRequest("POST", `/api/course/reviewRate`, {
        courseRef: id,
        rating,
        reviewText,
      });
      setRating(0);
      setReviewText("");
      fetchReviews();     
      toast.success(response.message)   
    }catch (err) {
      if (err instanceof Error) {
        toast.error(err.message); // Now show the backend error        
      }
    }
    
  };

  const handleReaction = async (reviewId: string, type: "like" | "dislike") => {
    try {
      await commonRequest("POST", `/api/course/reviewReact/${reviewId}`, { type });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (reviewId: string, commentText: string) => {
    if (!commentText.trim()) return;
    try {
      await commonRequest("POST", `/api/course/reviewComment/${reviewId}`, { commentText });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Write a Review</h2>
      <ToastContainer />
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <StarIcon
            key={s}
            className={`w-6 h-6 cursor-pointer ${rating >= s ? "text-yellow-400" : "text-gray-300"}`}
            onClick={() => setRating(s)}
          />
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button onClick={handleReviewSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
        Submit Review
      </button>

      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-semibold">All Reviews</h2>
        {reviews.map((review) => (
          <div key={review._id} className="border rounded p-4">
            <div className="flex justify-between items-center">
              <div className="font-semibold">{review.userRef.name}</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} className={`w-4 h-4 ${review.rating >= s ? "text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
            </div>
            <p className="mt-2">{review.reviewText}</p>
            <div className="flex gap-4 mt-2">
              <button
                className="flex items-center gap-1 text-sm"
                onClick={() => handleReaction(review._id, "like")}
              >
                <ThumbsUp className="w-4 h-4" /> {review.reactions.like.length}
              </button>
              <button
                className="flex items-center gap-1 text-sm"
                onClick={() => handleReaction(review._id, "dislike")}
              >
                <ThumbsDown className="w-4 h-4" /> {review.reactions.dislike.length}
              </button>
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
              <input
                type="text"
                placeholder="Add a comment"
                className="w-full border p-2 rounded mt-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleComment(review._id, (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentReviewSection;
