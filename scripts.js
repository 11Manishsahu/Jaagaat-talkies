function addToCart() {
  const email = document.getElementById("email").value;
  const showtime = document.getElementById("showtime").value;

  if (!email || !showtime) {
    alert("Please fill all fields.");
    return;
  }

  localStorage.setItem("ticket", JSON.stringify({ email, showtime }));
  alert("Ticket added to cart.");
}

window.onload = function () {
  const cartPage = document.getElementById("cartDetails");
  if (cartPage) {
    const ticket = JSON.parse(localStorage.getItem("ticket"));
    if (!ticket) {
      cartPage.innerHTML = "<p>No ticket in cart.</p>";
      document.getElementById("payNow").style.display = "none";
    } else {
      cartPage.innerHTML = `
        <p><strong>Show Time:</strong> ${ticket.showtime}</p>
        <p><strong>Email:</strong> ${ticket.email}</p>
      `;
    }

    document.getElementById("payNow").onclick = function () {
      const options = {
        key: "RAZORPAY_KEY", // Replace this with your actual key
        amount: 50000,
        currency: "INR",
        name: "Jagat Talkies",
        description: "Saiyara 4D Ticket",
        handler: function (response) {
          alert("Payment Successful! Ticket sent to " + ticket.email);
          localStorage.removeItem("ticket");
          window.location.href = "index.html";
        },
        prefill: {
          email: ticket.email,
        },
        theme: {
          color: "#e50914"
        }
      };
      const rzp = new Razorpay(options);
      rzp.open();
    };
  }

  const supportBtn = document.getElementById("supportBtn");
  if (supportBtn) {
    supportBtn.onclick = () => {
      alert("Need help? Contact us at support@jagattalkies.com");
    };
  }
};


