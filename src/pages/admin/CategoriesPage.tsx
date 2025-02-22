import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCategoryModal from "../../components/admin/AddCategoryModal";
import { Category } from "../../types";
import { useAppDispatch } from "../../hooks/accessHook";
import { getCategories } from "../../redux/store/actions/course/getCategoriesAction";
import { blockUnblockCat } from "../../redux/store/actions/course/blockUnblockCat";
import ConfirmationModal from "../../components/admin/ConfirmationModal";

const CategoriesPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 1,
    categoryPerPage: 3,
  });
  const [status, setStatus] = useState({ loading: true, error: "" });
  const dispatch = useAppDispatch();

  const fetchCategories = useCallback(async () => {
    setStatus((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      const { currentPage, categoryPerPage } = pagination;
      const response = await dispatch(
        getCategories({ page: currentPage, limit: categoryPerPage })
      );

      console.log(response, "iam the category details from categorypage...");

      if (response && response.payload) {
        setData(response.payload.data || []);
        setPagination((prev) => ({
          ...prev,
          totalCount: response.payload.totalCount || 1,
        }));
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, [dispatch, pagination.currentPage, pagination.categoryPerPage]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const { currentPage, categoryPerPage, totalCount } = pagination;
  const totalPages = Math.ceil(totalCount / categoryPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: page }));
    }
  };

  const handleSuccess = (message: string) => {
    toast.success("Category added sucessfully.....");
    fetchCategories();
    console.log(message);
  };

  const handleBlockUnblock = async (id: any) => {
    // Logic to toggle block/unblock for the category with the given id
    if (!id) {
      console.error("ID not found for the category");
      return;
    }
    try {
      const response = await dispatch(blockUnblockCat(id));
      if (response.payload.success) {
        fetchCategories();
      } else {
        console.error("Failed to update category status");
      }
    } catch (error) {
      console.error("Error during block/unblockCat operation:", error);
    }
    // console.log(`Block/Unblock category with ID: ${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <ToastContainer />
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600">
          Manage your categories and their details
        </p>
      </div>

      {/* Search Section */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Add Category
          </button>
          <AddCategoryModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSuccess={handleSuccess}
            category={currentCategory}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {status.loading ? (
          <div className="col-span-full text-center text-gray-500">
            Loading...
          </div>
        ) : status.error ? (
          <div className="col-span-full text-center text-red-500">
            {status.error}
          </div>
        ) : data.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No Categories Found!
          </div>
        ) : (
          data.map((category) => (
            <div
              key={category._id}
              className="relative bg-white border border-gray-300 rounded-lg shadow p-4 flex flex-col items-center text-center"
            >
              {/* Status Badge */}
              <div
                className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-full ${
                  category.isBlocked
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
                style={{ zIndex: 10 }}
              >
                {category.isBlocked ? "Blocked" : "Active"}
              </div>
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-medium text-gray-900">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {category.description}
              </p>
              <div className="mt-4 flex justify-end w-full gap-2">
                {/* <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleBlockUnblock(category._id)}
                >
                  {category.isBlocked ? "Unblock" : "Block"}
                </button> */}
                <ConfirmationModal
                  triggerText={category.isBlocked ? "Unblock" : "Block"}
                  title={`${category.isBlocked ? "Unblock" : "Block"} Category`}
                  description={`Are you sure you want to ${
                    category.isBlocked ? "unblock" : "block"
                  } the category "${category.name}"?`}
                  status={category.isBlocked ? "unblock" : "block"} 
                  onConfirm={() => handleBlockUnblock(category._id)}
                />
                <button
                  // className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600"
                  className="px-3 py-1 text-sm border bg-orange-600 border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => {
                    setCurrentCategory(category);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {isModalOpen && (
        <AddCategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setCurrentCategory(null);
          }}
          onSuccess={handleSuccess}
          category={currentCategory}
        />
      )}

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;
