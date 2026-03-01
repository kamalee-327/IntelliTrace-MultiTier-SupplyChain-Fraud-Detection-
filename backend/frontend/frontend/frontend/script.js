async function submitData() {
    const data = {
        productId: document.getElementById("productId").value,
        location: document.getElementById("location").value,
        temperature: parseInt(document.getElementById("temperature").value),
        quantity: parseInt(document.getElementById("quantity").value)
    };

    const response = await fetch("http://localhost:5000/add-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    displayTransactions();
}

async function displayTransactions() {
    const response = await fetch("http://localhost:5000/transactions");
    const transactions = await response.json();

    let output = "";

    transactions.forEach(t => {
        output += `<p>
        Product: ${t.productId} | Location: ${t.location} | Temp: ${t.temperature} |
        Quantity: ${t.quantity} |
        <span class="${t.fraudFlag ? 'fraud' : ''}">
        ${t.fraudFlag ? "⚠ FRAUD: " + t.reason : "Normal"}
        </span>
        </p>`;
    });

    document.getElementById("output").innerHTML = output;
}
