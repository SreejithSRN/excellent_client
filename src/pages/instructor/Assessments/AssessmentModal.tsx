import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { commonRequest } from "../../../common/api";
import { config } from "../../../common/config";

type Option = { label: string; value: string };

const defaultOptions: Option[] = [
  { label: "A", value: "" },
  { label: "B", value: "" },
  { label: "C", value: "" },
  { label: "D", value: "" },
];

const createInitialQuestions = () =>
  Array.from({ length: 2 }, () => ({
    questionText: "",
    options: defaultOptions.map((opt) => ({ ...opt })),
    answerKey: "",
  }));

export const AssessmentModal = ({
  courseId,
  initialQuestions,
  onClose,
  onAssessmentCreated
}: {
  courseId: string;
  initialQuestions?: any[];
  onClose: () => void;
  onAssessmentCreated:()=>void
}) => {
  const [questions, setQuestions] = useState(createInitialQuestions());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuestions) {
      setQuestions(
        initialQuestions.map((q) => ({
          questionText: q.questionText || "",
          options: q.options || defaultOptions.map((opt) => ({ ...opt })),
          answerKey: q.answerKey || "",
        }))
      );
    }
  }, [initialQuestions]);

  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex].value = value;
    setQuestions(updated);
  };

  const handleQuestionTextChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleAnswerKeyChange = (qIndex: number, answer: string) => {
    const updated = [...questions];
    updated[qIndex].answerKey = answer;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    const isValid = questions.every(
      (q) =>
        q.questionText.trim() &&
        q.options.every((opt) => opt.value.trim()) &&
        q.answerKey
    );

    if (!isValid) {
      toast.error("Please fill all fields.");
      return;
    }

    // Check for duplicate question texts
    const questionTexts = questions.map((q) =>
      q.questionText.trim().toLowerCase()
    );
    const hasDuplicate = new Set(questionTexts).size !== questionTexts.length;

    if (hasDuplicate) {
      toast.error("Duplicate questions are not allowed.");
      return;
    }

    try {
      setLoading(true);
      const payload = { courseId, questions };

      const response = await commonRequest(
        "POST",
        `/api/course/createAssesment`,
        payload,
        config
      );
    
      if (response.success) {
        toast.success("Assessment saved successfully!");
        onAssessmentCreated();
        onClose();
      } else {
        toast.error(response.message)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4 py-6">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-full flex flex-col">
        <div className="overflow-y-auto flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create/Edit Assessment
          </h2>
          {questions.map((q, i) => (
            <div key={i} className="mb-6 border-b pb-4">
              <label className="block font-semibold mb-1">
                Question {i + 1}
              </label>
              <input
                type="text"
                value={q.questionText}
                onChange={(e) => handleQuestionTextChange(i, e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              {q.options.map((opt, j) => (
                <div key={j} className="flex items-center gap-2 mb-1">
                  <span className="w-5">{String.fromCharCode(65 + j)}.</span>
                  <input
                    type="text"
                    value={opt.value}
                    onChange={(e) => handleOptionChange(i, j, e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              <div className="mt-2">
                <label className="block mb-1 font-semibold">
                  Correct Answer
                </label>
                <select
                  value={q.answerKey}
                  onChange={(e) => handleAnswerKeyChange(i, e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select correct option</option>
                  {["A", "B", "C", "D"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
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
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
};
