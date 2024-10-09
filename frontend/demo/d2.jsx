import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js"; // Adjust the path based on your project structure
import BarChart from "./BarChart"; // Import the new bar chart component
import Statistics from "./Statistics"; // Import the new statistics box component

// Material UI imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("March");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          month,
          search,
          page,
        },
      });
      console.log("API Response:", response.data); // Log the response
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      fetchTransactions(); // Fetch initial list when search is cleared
    }
  };

  const handleMonthChange = (e) => {
    console.log("Changing month to:", e.target.value); // Check month change
    setMonth(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign: "center", color: "primary" }}>
        Transactions Dashboard
      </h2>

      {/* Grid for search and month select */}
      <Grid container spacing={2} justifyContent="space-between" alignItems="center" style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by title/description/price"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            value={month}
            onChange={handleMonthChange}
            displayEmpty
            variant="outlined"
          >
            {months.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      {/* Transactions Table with Borders */}
      <TableContainer component={Paper}>
        <Table sx={{ border: "1px solid #ddd" }}>
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid #ddd" }}>
              <TableCell sx={{ borderRight: "1px solid #ddd" }}>ID</TableCell>
              <TableCell sx={{ borderRight: "1px solid #ddd" }}>Title</TableCell>
              <TableCell sx={{ borderRight: "1px solid #ddd" }}>Description</TableCell>
              <TableCell sx={{ borderRight: "1px solid #ddd" }}>Price</TableCell>
              <TableCell sx={{ borderRight: "1px solid #ddd" }}>Category</TableCell>
              <TableCell sx={{ borderRight: "1px solid #ddd" }}>Sold</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} sx={{ borderBottom: "1px solid #ddd" }}>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>{transaction._id}</TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>{transaction.title}</TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>{transaction.description}</TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>{transaction.price.toFixed(2)}</TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>{transaction.category}</TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>{transaction.sold ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    style={{ width: "500px", height: "100px", objectFit: "cover" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Buttons */}
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "16px" }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Grid>
      </Grid>

      {/* Statistics Component */}
      <Statistics month={month} />

      {/* Bar Chart Component */}
      <BarChart month={month} />
    </div>
  );
};

export default TransactionsTable;
