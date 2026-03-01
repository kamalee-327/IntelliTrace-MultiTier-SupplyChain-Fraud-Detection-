const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let transactions = [];

app.post("/add-transaction", (req, res) => {
    const { productId, location, temperature, quantity } = req.body;

    let fraudFlag = false;
    let reason = "Normal";

    // Fraud Rules
    if (temperature > 50) {
        fraudFlag = true;
        reason = "Abnormal temperature detected";
    }

    if (quantity < 0) {
        fraudFlag = true;
        reason = "Invalid quantity entry";
    }

    const transaction = {
        productId,
        location,
        temperature,
        quantity,
        fraudFlag,
        reason
    };

    transactions.push(transaction);

    res.json(transaction);
});

app.get("/transactions", (req, res) => {
    res.json(transactions);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
