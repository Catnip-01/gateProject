import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutUs from "./pages/aboutUs";
import Resources from "./pages/resources";
import PYQs from "./pages/pyqs";
import Navbar from "./components/navbar";
import QuestionAnswerPage from "./pages/questions";
import TestPage from "./pages/testPage";
import QuestionForm from "./components/questionForm";
import Layout from "./components/layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/pyqs" element={<PYQs />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/questions" element={<QuestionAnswerPage />} />
        <Route path="/questionForm" element={<QuestionForm />} />
        <Route path="/testpage" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;



package week4;

import java.sql.*;

public class Stu {
    private static final String URL = "jdbc:mysql://localhost:3306/bank";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
            conn.setAutoCommit(false);

            try (PreparedStatement ps = conn.prepareStatement("INSERT INTO bank (no, name, type, balance) VALUES (?, ?, ?, ?)")) {
                // Insert accounts
                insertAccount(ps, 101, "Alice", "Savings", 5000.75);
                conn.commit();
                System.out.println("Inserted sample accounts.");

                displayAccounts(conn);

                // Demonstrate rollback on error
                try (Statement stmt = conn.createStatement()) {
                    stmt.executeUpdate("INSERT INTO bank (no, name, type, balance) VALUES (104, 'Dave', 'Current', -1500.0)");
                    conn.commit();
                } catch (SQLException e) {
                    conn.rollback();
                    System.out.println("Rolled back on error: " + e.getMessage());
                }

                // Demonstrate savepoint rollback
                Savepoint sp = conn.setSavepoint("BeforeFaultyInsert");
                try {
                    insertAccount(ps, 105, "Eve", "Savings", 12000.0);
                    conn.commit();
                    try (Statement stmt = conn.createStatement()) {
                        stmt.executeUpdate("INSERT INTO bank (no, name, type, balance) VALUES (107, 'Grace', 'Checking', NULL)");
                        conn.commit();
                    }
                } catch (SQLException e) {
                    conn.rollback(sp);
                    System.out.println("Rolled back to savepoint: " + e.getMessage());
                }

                displayAccounts(conn);
            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void insertAccount(PreparedStatement ps, int no, String name, String type, double balance) throws SQLException {
        ps.setInt(1, no);
        ps.setString(2, name);
        ps.setString(3, type);
        ps.setDouble(4, balance);
        ps.executeUpdate();
    }

    private static void displayAccounts(Connection conn) throws SQLException {
        try (Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM bank")) {
            while (rs.next()) {
                System.out.printf("No: %d, Name: %s, Type: %s, Balance: %.2f%n", rs.getInt("no"),
                        rs.getString("name"), rs.getString("type"), rs.getDouble("balance"));
            }
        }
    }
}

import java.sql.*;

public class CustomerDatabase {
    static final String JDBC_URL = "jdbc:mysql://localhost:3306/bank";
    static final String USER = "root";
    static final String PASSWORD = "";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(JDBC_URL, USER, PASSWORD)) {
            createTable(conn);
            insertSampleData(conn);
            displayAllCustomers(conn);
            displayDatabaseMetadata(conn);
            displayResultSetMetadata(conn);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void createTable(Connection conn) {
        String createTableSQL = "CREATE TABLE IF NOT EXISTS Customer ("
                + "ID INT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(255), "
                + "Type_of_Customer VARCHAR(255), Amount_Spent DECIMAL(10, 2))";
        executeUpdate(conn, createTableSQL, "Customer table created or exists.");
    }

    public static void insertSampleData(Connection conn) {
        String insertSQL = "INSERT INTO Customer (Name, Type_of_Customer, Amount_Spent) VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {
            insertCustomer(pstmt, "John Doe", "Regular", 150.75);
            insertCustomer(pstmt, "Jane Smith", "Premium", 320.50);
            insertCustomer(pstmt, "Bill Gates", "VIP", 5000.00);
            System.out.println("Sample records inserted.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void insertCustomer(PreparedStatement pstmt, String name, String type, double amount) throws SQLException {
        pstmt.setString(1, name);
        pstmt.setString(2, type);
        pstmt.setBigDecimal(3, BigDecimal.valueOf(amount));
        pstmt.executeUpdate();
    }

    public static void displayAllCustomers(Connection conn) {
        String selectSQL = "SELECT * FROM Customer";
        try (Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(selectSQL)) {
            System.out.println("\nCustomer Table:");
            while (rs.next()) {
                System.out.printf("ID: %d, Name: %s, Type: %s, Amount: %.2f\n",
                        rs.getInt("ID"), rs.getString("Name"),
                        rs.getString("Type_of_Customer"), rs.getBigDecimal("Amount_Spent"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void displayDatabaseMetadata(Connection conn) {
        try {
            DatabaseMetaData metaData = conn.getMetaData();
            System.out.printf("\nDB Metadata:\nProduct: %s\nVersion: %s\nDriver: %s\n",
                    metaData.getDatabaseProductName(), metaData.getDatabaseProductVersion(),
                    metaData.getDriverName());
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void displayResultSetMetadata(Connection conn) {
        String selectSQL = "SELECT * FROM Customer";
        try (Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(selectSQL)) {
            ResultSetMetaData rsMetaData = rs.getMetaData();
            System.out.println("\nResultSet Metadata:");
            for (int i = 1; i <= rsMetaData.getColumnCount(); i++) {
                System.out.printf("Column %d: %s (%s)\n",
                        i, rsMetaData.getColumnName(i), rsMetaData.getColumnTypeName(i));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void executeUpdate(Connection conn, String sql, String successMessage) {
        try (Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
            System.out.println(successMessage);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}