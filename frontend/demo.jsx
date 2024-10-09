/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchTransactions } from "../api";

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions(month, page, search).then((res) => {
      setTransactions(res.data.transactions);
      setTotalPages(Math.ceil(res.data.totalTransactions / 10)); // Assuming 10 transactions per page
    });
  }, [month, page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div>
      <h2>Transactions Table</h2>
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th> {/* Add a column for Image */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction._id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>
                <img
                  src={transaction.image} // Render the image from the 'image' field
                  alt={transaction.title}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }} // Adjust size
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
