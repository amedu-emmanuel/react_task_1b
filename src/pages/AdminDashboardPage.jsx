import React, { useEffect, useState } from "react";
import MkdSDK from "../utils/MkdSDK";
import { Container } from "../components/Container";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const { dispatch } = React.useContext(AuthContext);
  const [data, setData] = useState();
  const [page, setPage] = useState(1); // Current page
  const [totalItems, setTotalItems] = useState(); // total items
  const [numPages, setNumPages] = useState(); // total pages
  const limit = 10; // Items per page
  let sdk = new MkdSDK();
  const navigate = useNavigate();

  const fetchVideos = async (page, limit) => {
    const url = "https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE";
    const headers = {
      "Content-Type": "application/json",
      "x-project":
        "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      payload: {},
      page,
      limit,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(data.list);
        setTotalItems(data.total);
        setNumPages(data.num_pages);
        return data;
      } else {
        throw new Error("An error occurred while fetching videos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideos(page, limit);
  }, [page, limit]);
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="min-h-screen p-10 text-white bg-black">
        <div className="flex justify-between mb-20">
          <h1 className="text-3xl font-bold ">APP</h1>
          <button
            className="flex justify-center p-1 px-4 text-black bg-yellow-600 rounded-full font"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              navigate("/admin/login");
            }}
          >
            <svg
              className="w-6 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14a5 5 0 00-5 5v1a1 1 0 001 1h8a1 1 0 001-1v-1a5 5 0 00-5-5z"
              />
            </svg>
            <p>Logout</p>
          </button>
        </div>
        <div className="flex justify-between my-5 ">
          <p className="text-3xl ">Today's leaderboard</p>
          <div className="flex items-center p-2 px-4 space-x-4 text-sm bg-gray-900 rounded-lg">
            <p>30 May 2022</p>
            <p className="p-1 px-4 text-black bg-yellow-600 rounded-lg">
              SUBMISSION OPEN
            </p>
            <p>11:34</p>
          </div>
        </div>
        <div>
          <div className="w-full px-4 text-gray-600 py-">
            <div className="grid grid-cols-12">
              <p className="col-span-1">#</p>
              <div className="flex items-center col-span-6">
                <p>Title</p>
              </div>

              <div className="col-span-4">Author</div>
              <div className="col-span-1">Most Liked</div>
            </div>
          </div>
        </div>

        <div>
          <Container data={data} />
        </div>
        <div className="flex items-center justify-center item">
          <button
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <p className="text-white">
            Page {page} of {numPages}
          </p>
          <button
            className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
            onClick={handleNextPage}
            disabled={page === numPages}
          >
            Next
          </button>
        </div>

        <div className="flex justify-center my-3">
          {/* Allow users to navigate to any page */}
          {Array.from({ length: numPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-lg mx-1 ${
                index + 1 === page ? "bg-blue-500 text-white" : "bg-gray-500 text-black"
              }`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
