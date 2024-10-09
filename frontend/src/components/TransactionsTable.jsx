import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";
import BarChart from "./BarChart";
import Statistics from "./Statistics";
import PieChart from "./PieChart"; // Import the PieChart component

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
  const [perPage] = useState(10); // Set default items per page

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
          perPage, // Include perPage in the request
        },
      });
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      fetchTransactions();
    }
  };

  const handleMonthChange = (e) => {
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
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
          textAlign: "center",
          color: "primary",
        }}
      >
        Transactions Dashboard
      </h2>

      {/* Grid for search and month select */}
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: "16px" }}
      >
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

      {/* Transactions Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.price.toFixed(2)}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.sold ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    style={{
                      width: "100%", // Makes the image responsive
                      maxHeight: "200px", // Set a maximum height to maintain space
                      objectFit: "cover", // Maintain aspect ratio and cover the space
                      borderRadius: "8px", // Optional: Add rounded corners for better aesthetics
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Buttons */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: "16px" }}
      >
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

      {/* Pie Chart Component */}
      <PieChart month={month} />
    </div>
  );
};

export default TransactionsTable;
