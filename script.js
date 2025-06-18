const formData = {
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
  q6: null,
  q7: null,
  q8: null,
  q9: null
};

// กำหนดให้ปุ่มแต่ละคำถามมี id เป็น q1 ถึง q9
document.querySelectorAll(".question-text").forEach((questionDiv, index) => {
  const qKey = `q${index + 1}`;
  const buttons = questionDiv.querySelectorAll(".option-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      formData[qKey] = parseInt(btn.dataset.value);

      // highlight ปุ่มที่เลือก
      buttons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
});

// ปุ่ม submit
async function submitToServer() {
  try {
    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    alert(result.message);
  } catch (err) {
    console.error("ส่งข้อมูลล้มเหลว:", err);
    alert("เกิดข้อผิดพลาดขณะส่งข้อมูล");
  }
}