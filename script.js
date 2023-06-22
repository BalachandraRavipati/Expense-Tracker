const transaction = [];
const category = { expense: "EXPENSE", income: "INCOME" };

$(document).ready(function () {
  $("#expense").prop("checked", true);
  $("#button").click(function () {
    const buttonText = $("#button").text();
    if (buttonText === "CANCEL") {
      $("#inputContainer").css("display", "none");
      $("#button").text("ADD");
    } else {
      $("#inputContainer").css("display", "flex");
      $("#button").text("CANCEL");
    }
  });
  $(".addTransactionContainer button").click(function () {
    const inputAmount = Number($("#amount").val());
    const description = $("#description").val();
    const selectedCategory = $("input[name='category']:checked").val();
    let totalExpense = Number($("#expenseAmount").text().replace("$", ""));
    let totalIncome = Number($("#incomeAmount").text().replace("$", ""));

    if (inputAmount && description && selectedCategory) {
      transaction.push({
        amount: inputAmount,
        description: description,
        category: selectedCategory,
      });
      $("#transactionContainer").html("");

      for (let i = 0; i < transaction.length; i++) {
        const childDiv = $("<div></div>")
          .append("<div>" + transaction[i].description + "</div>")
          .append("<div>" + "$" + transaction[i].amount + "</div>");
        childDiv.addClass(`transaction`);
        if (selectedCategory === "EXPENSE") {
          childDiv.addClass("expense");
        } else {
          childDiv.addClass("income");
        }
        $("#transactionContainer").append(childDiv);
      }

      if (selectedCategory === "EXPENSE") {
        totalExpense = totalExpense + inputAmount;
      } else {
        totalIncome = totalIncome + inputAmount;
      }

      $("#expenseAmount").text("$" + totalExpense);
      $("#incomeAmount").text("$" + totalIncome);
      $("#balanceValue").text("$" + (totalIncome - totalExpense));
      $("#inputContainer").css("display", "none");
      $("#button").text("ADD");
      $("#amount").val("");
      $("#description").val("");
      $("#expense").prop("checked", true);
      $("#searchInput").val("");
    }
  });
  $("#searchInput").on("input", function () {
    const searchValue = $("#searchInput").val();
    const filteredTrasactions = [];
    for (let i = 0; i < transaction.length; i++) {
      if (transaction[i].description.includes(searchValue)) {
        filteredTrasactions.push(transaction[i]);
      }
    }
    $("#transactionContainer").html("");
    for (let i = 0; i < filteredTrasactions.length; i++) {
      const childDiv = $("<div></div>")
        .append("<div>" + filteredTrasactions[i].description + "</div>")
        .append("<div>" + "$" + filteredTrasactions[i].amount + "</div>");
      childDiv.addClass(`transaction`);
      if (filteredTrasactions[i].category === "EXPENSE") {
        childDiv.addClass("expense");
      } else {
        childDiv.addClass("income");
      }
      $("#transactionContainer").append(childDiv);
    }
  });
});
