import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [complaint, setComplaint] = useState("");
  const [result, setResult] = useState(null);
  const [complaints, setComplaints] = useState(() => {
  const savedComplaints = localStorage.getItem("complaints");
  return savedComplaints ? JSON.parse(savedComplaints) : [];
});
  const totalComplaints = complaints.length;

const openComplaints = complaints.filter(
  (item) => item.status === "Open"
).length;

const inProgressComplaints = complaints.filter(
  (item) => item.status === "In Progress"
).length;

const resolvedComplaints = complaints.filter(
  (item) => item.status === "Resolved"
).length;

const highPriorityComplaints = complaints.filter(
  (item) => item.priority === "High"
).length;

const averageConfidence =
  complaints.length > 0
    ? Math.round(
        complaints.reduce((total, item) => total + item.confidence, 0) /
        complaints.length
      )
    : 0;

const categoryCounts = {};

  complaints.forEach((item) => {
    categoryCounts[item.category] =
      (categoryCounts[item.category] || 0) + 1;
});

const priorityCounts = {
  High: complaints.filter((item) => item.priority === "High").length,
  Medium: complaints.filter((item) => item.priority === "Medium").length,
  Low: complaints.filter((item) => item.priority === "Low").length,
};

useEffect(() => {
  localStorage.setItem("complaints", JSON.stringify(complaints));
}, [complaints]);

  const analyzeComplaint = () => {
    if (!complaint.trim()) {
      alert("Please enter a complaint first.");
      return;
    }

    const text = complaint.toLowerCase();

    let category = "General";
    let priority = "Medium";
    let department = "Customer Support";
    let sentiment = "Neutral";
    let confidence = 60;
    let recommendation = "Review the complaint and assign it to the appropriate support team.";
    let action = "Review and assign the complaint.";

    if (
  text.includes("fraud") ||
  text.includes("scam") ||
  text.includes("unauthorized") ||
  text.includes("stolen") ||
  text.includes("suspicious transaction")
) {
  category = "Security / Fraud";
  department = "Security Team";
  recommendation = "Verify the suspicious activity and investigate the account or transaction.";
  confidence = 97;
  action = "Assign to Security Team for fraud investigation.";
} else if (
  text.includes("payment") ||
  text.includes("money") ||
  text.includes("transaction") ||
  text.includes("charged") ||
  text.includes("billing")
) {
  category = "Payment Issue";
  department = "Finance";
  recommendation = "Verify the transaction and check the payment or billing status.";
  confidence = 95;
  action = "Assign to Finance Team for transaction verification.";
} else if (
  text.includes("login") ||
  text.includes("password") ||
  text.includes("account") ||
  text.includes("sign in") ||
  text.includes("locked")
) {
  category = "Account Issue";
  department = "IT Support";
  recommendation = "Verify the user's account and assist with password or login recovery.";
  confidence = 93;
  action = "Assign to IT Support for account recovery.";
} else if (
  text.includes("delivery") ||
  text.includes("order") ||
  text.includes("shipping") ||
  text.includes("product") ||
  text.includes("package")
) {
  category = "Order / Delivery";
  department = "Operations";
  recommendation = "Check the order status and update the customer on the delivery timeline.";
  confidence = 92;
  action = "Assign to Operations Team to check the order status.";
} else if (
  text.includes("bug") ||
  text.includes("error") ||
  text.includes("crash") ||
  text.includes("not working") ||
  text.includes("technical")
) {
  category = "Technical Issue";
  department = "Technical Support";
  recommendation = "Investigate the technical issue and assign it to the technical support team.";
  confidence = 94;
  action = "Assign to Technical Support for investigation.";
} else if (
  text.includes("refund") ||
  text.includes("return") ||
  text.includes("money back") ||
  text.includes("reimbursement")
) {
  category = "Refund Issue";
  department = "Finance";
  recommendation = "Verify the refund request and check the transaction details.";
  confidence = 96;
  action = "Assign to Finance Team to verify the refund.";
} else if (
  text.includes("service") ||
  text.includes("support") ||
  text.includes("help") ||
  text.includes("assistance") ||
  text.includes("poor service")
) {
  category = "Service Issue";
  department = "Customer Support";
  recommendation = "Review the customer's issue and provide appropriate support.";
  confidence = 88;
  action = "Assign to Customer Support for resolution.";
}

    if (
      text.includes("urgent") ||
      text.includes("immediately") ||
      text.includes("critical") ||
      text.includes("emergency")
    ) {
      priority = "High";
    } else if (
      text.includes("minor") ||
      text.includes("small")
    ) {
      priority = "Low";
    }

    if (
      text.includes("angry") ||
      text.includes("bad") ||
      text.includes("terrible") ||
      text.includes("frustrated") ||
      text.includes("disappointed")
    ) {
      sentiment = "Negative";
    } else if (
      text.includes("happy") ||
      text.includes("good") ||
      text.includes("excellent") ||
      text.includes("thank")
    ) {
      sentiment = "Positive";
    }

    
      const newComplaint = {
  id: complaints.length > 0
  ? Math.max(...complaints.map((item) => item.id)) + 1
  : 1,
  text: complaint,
  category,
  priority,
  department,
  sentiment,
  confidence,
  recommendation,
  action,
  status: "Open",
};

setResult(newComplaint);

setComplaints((previousComplaints) => [
  ...previousComplaints,
  newComplaint,
]);
   
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>AI Complaint Categorization System</h1>
          <p>AI-powered complaint analysis and routing</p>
        </div>

        <div className="status">
          <span></span>
          System Online
        </div>
      </header>

      <main className="container">
    <section className="dashboard">
        <h2>Complaint Dashboard</h2>

        <div className="dashboard-cards">

            <div className="dashboard-card">
                <h3>Total Complaints</h3>
                <p>{totalComplaints}</p>
            </div>

            <div className="dashboard-card">
                <h3>Open</h3>
                <p>{openComplaints}</p>
            </div>

            <div className="dashboard-card">
                <h3>In Progress</h3>
                <p>{inProgressComplaints}</p>
            </div>

            <div className="dashboard-card">
                <h3>Resolved</h3>
                <p>{resolvedComplaints}</p>
            </div>

            <div className="dashboard-card">
              <h3>High Priority</h3>
              <p>{highPriorityComplaints}</p>
            </div>

            <div className="dashboard-card">
              <h3>Avg. Confidence</h3>
              <p>{averageConfidence}%</p>
            </div>

        </div>
        <div className="category-analytics">
  <h3>Complaint Categories</h3>

  {Object.entries(categoryCounts).length === 0 ? (
    <p>No complaints yet.</p>
  ) : (
    Object.entries(categoryCounts).map(([category, count]) => (
      <div className="category-row" key={category}>
  <div className="category-info">
    <span>{category}</span>
    <strong>{count}</strong>
  </div>

  <div className="category-bar">
    <div
      className="category-fill"
      style={{
        width: `${totalComplaints > 0 ? (count / totalComplaints) * 100 : 0}%`,
      }}
    ></div>
  </div>
</div>
    ))
  )}
</div>
<div className="priority-analytics">
  <h3>Priority Distribution</h3>

  <div className="priority-row">
  <div className="priority-info">
    <span>High</span>
    <strong>{priorityCounts.High}</strong>
  </div>

  <div className="priority-bar">
    <div
      className="priority-fill"
      style={{
        width: `${totalComplaints > 0 ? (priorityCounts.High / totalComplaints) * 100 : 0}%`,
      }}
    ></div>
  </div>
</div>

<div className="priority-row">
  <div className="priority-info">
    <span>Medium</span>
    <strong>{priorityCounts.Medium}</strong>
  </div>

  <div className="priority-bar">
    <div
      className="priority-fill"
      style={{
        width: `${totalComplaints > 0 ? (priorityCounts.Medium / totalComplaints) * 100 : 0}%`,
      }}
    ></div>
  </div>
</div>

<div className="priority-row">
  <div className="priority-info">
    <span>Low</span>
    <strong>{priorityCounts.Low}</strong>
  </div>

  <div className="priority-bar">
    <div
      className="priority-fill"
      style={{
        width: `${totalComplaints > 0 ? (priorityCounts.Low / totalComplaints) * 100 : 0}%`,
      }}
    ></div>
  </div>
</div>
</div>
<div className="recent-complaints">
  <h3>Recent Complaints</h3>

  {complaints.length === 0 ? (
    <p>No complaints yet.</p>
  ) : (
    complaints
      .slice(-5)
      .reverse()
      .map((item) => (
        <div className="recent-complaint-row" key={item.id}>
          <div>
            <strong>#{item.id}</strong>
            <span>{item.text}</span>
          </div>

                    <span>{item.category}</span>

          <span className={`priority-badge ${item.priority.toLowerCase()}`}>
            {item.priority}
          </span>

          <span className={`recent-status ${item.status.toLowerCase().replace(" ", "-")}`}>
            {item.status}
          </span>
        </div>
      ))
  )}
</div>
    </section>
        <section className="input-card">
          <h2>Submit a Complaint</h2>
          
          <p className="description">
            Enter a customer complaint and let the system analyze it.
          </p>

          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Example: I made a payment but the money was deducted and my order was not confirmed..."
          />

          <button onClick={analyzeComplaint}>
            Analyze Complaint
          </button>
        </section>

        {result && (
          <section className="result-section">
            <h2>AI Analysis Result</h2>

            <div className="result-grid">

              <div className="result-card">
                <span>Category</span>
                <strong>{result.category}</strong>
              </div>

              <div className="result-card">
                <span>Priority</span>
                <strong className={`priority-result ${result.priority.toLowerCase()}`}>
                {result.priority}
                </strong>
              </div>

              <div className="result-card">
                <span>Department</span>
                <strong>{result.department}</strong>
              </div>

              <div className="result-card">
                <span>Sentiment</span>
                <strong className={`sentiment-result ${result.sentiment.toLowerCase()}`}>
                {result.sentiment}
                </strong>
              </div>

              <div className="result-card confidence-card">
  <span>Confidence</span>

  <strong>{result.confidence}%</strong>

  <div className="confidence-bar">
    <div
      className="confidence-fill"
      style={{ width: `${result.confidence}%` }}
    ></div>
  </div>
</div>

            </div>

            <div className="recommendation">
            <h3>AI Recommendation</h3>
            <p>{result.recommendation}</p>
            </div>

            <div className="recommendation">
              <h3>Recommended Action</h3>
              <p>{result.action}</p>
            </div>

            <div className="routing">
              <h3>Complaint Routing</h3>

              <div className="flow">
  <div>Complaint</div>
  <span>→</span>

  <div>AI Analysis</div>
  <span>→</span>

  <div>{result.category}</div>
  <span>→</span>

  <div>{result.priority}</div>
  <span>→</span>

  <div>{result.department}</div>
  <span>→</span>

  <div>{result.status}</div>
</div>
            </div>
          </section>
        )}
        {complaints.length > 0 && (
          <section className="result-section">
            <h2>Complaint History</h2>

<button
    className="clear-button"
    onClick={() => setComplaints([])}
>
    Clear History
</button>

            <div className="history-table">
              <div className="history-header">
                <span>ID</span>
                <span>Complaint</span>
                <span>Category</span>
                <span>Priority</span>
                <span>Department</span>
                <span>Sentiment</span>
                <span>Confidence</span>
                <span>Status</span>
              </div>

              {complaints.map((item) => (
                <div className="history-row" key={item.id}>
                  <span>#{item.id}</span>
                  <span>{item.text}</span>
                  <span>{item.category}</span>
                  <span className={`priority-badge ${item.priority.toLowerCase()}`}>
                    {item.priority}
                  </span>
                  <span>{item.department}</span>
                  <span>{item.sentiment}</span>
                  <span>{item.confidence}%</span>
                 <select
                  className={`status-select ${item.status.toLowerCase().replace(" ", "-")}`}
                  value={item.status}
                 onChange={(e) => {
  const updatedStatus = e.target.value;

  setComplaints((previousComplaints) =>
    previousComplaints.map((complaint) =>
      complaint.id === item.id
        ? { ...complaint, status: updatedStatus }
        : complaint
    )
  );

  if (result && result.id === item.id) {
    setResult((previousResult) => ({
      ...previousResult,
      status: updatedStatus,
    }));
  }
}}
>
  <option value="Open">Open</option>
  <option value="In Progress">In Progress</option>
  <option value="Resolved">Resolved</option>
</select>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;