import { useEffect, useState } from "react";
import { config } from "../../../common/config";
import { toast } from "react-toastify";
import { commonRequest } from "../../../common/api";
import { useNavigate } from "react-router-dom";

export const TakeAssessmentModal = ({
  courseId,
  onClose,
}: {
  courseId: string;
  onClose: () => void;
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  type Question = {
    questionText: string;
    options: { label: string; value: string }[];
    answerKey: string;
  };

  type AssessmentResponse = {
    success: boolean;
    data?: {
      questions: Question[];
    };
  };

  type SubmitAssessmentResponse = {
    score: number;
    mark: number;
    isPassed: boolean;
  };

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = (await commonRequest(
          "GET",
          `/api/course/getTestAssessment/${courseId}`,
          null,
          config
        )) as AssessmentResponse;

        if (res.success && res.data?.questions) {
          setQuestions(res.data.questions);
          setAnswers(new Array(res.data.questions.length).fill(""));
        } else {
          toast.error("No assessment found for this course.");
          onClose();
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching assessment.");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [courseId]);

  const handleOptionSelect = (qIndex: number, value: string) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    const isComplete = answers.every((ans) => ans !== "");
    if (!isComplete) {
      toast.warn("Please answer all questions before submitting.");
      return;
    }

    try {
      const res = await commonRequest<SubmitAssessmentResponse>(
        "POST",
        `/api/course/submitAssessment/${courseId}`,
        { answers },
        config
      );

      const { success, data, message } = res;

      if (success && data) {
        if (data.mark >= 50) {
          toast.success(
            `Congrats! You scored ${data.score} out of ${questions.length} and passed with ${data.mark} marks. You can now download your certificate.`
          );
        } else {
          toast.error(
            `You scored ${data.score} out of ${questions.length} and got ${data.mark} marks. Unfortunately, you did not pass the exam. Better luck next time`
          );
        }
        setTimeout(() => {
          navigate("/student/assessments", { replace: true });
        }, 2500);
      } else {
        toast.error(message || "Submission failed");
      }

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error submitting assessment");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow">Loading assessment...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-full flex flex-col">
        <div className="overflow-y-auto flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Take Assessment
          </h2>
          {questions.map((q, i) => (
            <div key={i} className="mb-6 border-b pb-4">
              <p className="font-semibold mb-2">
                Q{i + 1}: {q.questionText}
              </p>
              {q.options.map((opt: any, j: number) => (
                <label key={j} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt.label}
                    checked={answers[i] === opt.label}
                    onChange={() => handleOptionSelect(i, opt.label)}
                  />
                  <span>
                    {opt.label}. {opt.value}
                  </span>
                </label>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
