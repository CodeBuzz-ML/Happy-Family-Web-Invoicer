document.getElementById("generateInvoice").addEventListener("click", () => {
    const patientName = document.getElementById("patientName").value.trim();
    const invoiceDate = document.getElementById("invoiceDate").value;
    const consultationCharges = parseFloat(document.getElementById("consultationCharges").value) || 0;
    const medicineCharges = parseFloat(document.getElementById("medicineCharges").value) || 0;
    const courierCharges = parseFloat(document.getElementById("courierCharges").value) || 0;
    const otherCharges = parseFloat(document.getElementById("otherCharges").value) || 0;
  
    if (!patientName || !invoiceDate) {
      alert("Please enter patient name and date.");
      return;
    }
  
    const grandTotal = consultationCharges + medicineCharges + courierCharges + otherCharges;
  
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const img = new Image();
    img.src = "../assets/doc-header.png";
    img.onload = () => {
      // Header logo
      doc.addImage(img, "PNG", 15, 10, 180, 30);
  
      // Invoice title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Invoice", 105, 50, null, null, "center");
  
      // Patient info
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Patient Name: ${patientName}`, 15, 65);
      doc.text(`Invoice Date: ${invoiceDate}`, 15, 75);
  
      // Draw line
      doc.setLineWidth(0.5);
      doc.line(15, 80, 195, 80);
  
      // Table header
      let startY = 90;
      doc.setFont("helvetica", "bold");
      doc.text("Description", 25, startY);
      doc.text("Amount INR", 150, startY, { align: "right" });
  
      doc.setLineWidth(0.3);
      doc.line(15, startY + 2, 195, startY + 2);
  
      // Table rows
      doc.setFont("helvetica", "normal");
      startY += 10;
      if (consultationCharges) {
        doc.text("Consultation / Followup", 25, startY);
        doc.text(consultationCharges.toFixed(2), 195, startY, { align: "right" });
        startY += 10;
      }
      if (medicineCharges) {
        doc.text("Medicine Charges", 25, startY);
        doc.text(medicineCharges.toFixed(2), 195, startY, { align: "right" });
        startY += 10;
      }
      if (courierCharges) {
        doc.text("Courier Charges", 25, startY);
        doc.text(courierCharges.toFixed(2), 195, startY, { align: "right" });
        startY += 10;
      }
      if (otherCharges) {
        doc.text("Other Charges", 25, startY);
        doc.text(otherCharges.toFixed(2), 195, startY, { align: "right" });
        startY += 10;
      }
  
      // Draw line before total
      doc.setLineWidth(0.5);
      doc.line(15, startY + 2, 195, startY + 2);
      startY += 10;
  
      // Grand total
      doc.setFont("helvetica", "bold");
      doc.text("Grand Total", 25, startY);
      doc.text(grandTotal.toFixed(2), 195, startY, { align: "right" });
  
      // Footer
      startY += 20;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Clinic Contact: +91-9373369214", 15, startY + 5);

  
      doc.save(`${patientName}_${invoiceDate}_Invoice.pdf`);
    };
  
    img.onerror = () => {
      alert("Failed to load logo. PDF cannot be generated.");
    };
  });
  