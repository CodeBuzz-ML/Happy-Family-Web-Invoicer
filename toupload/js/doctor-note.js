// Ensure user is logged in
clinicAuth.checkLogin();

document.getElementById("generateNote").addEventListener("click", () => {
  const patientName = document.getElementById("patientName").value.trim();
  const patientAge = document.getElementById("patientAge").value.trim();
  const patientGender = document.getElementById("patientGender").value;
  const noteDate = document.getElementById("noteDate").value;
  const doctorNote = document.getElementById("doctorNote").value.trim();

  if (!patientName || !noteDate || !doctorNote) {
    alert("Please fill in at least Patient Name, Date, and Doctor's Note.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const img = new Image();
  img.src = "../assets/doc-header.png";
  img.onload = () => {
    // Header logo
    doc.addImage(img, "PNG", 15, 10, 180, 30);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Doctor's Note", 105, 50, null, null, "center");

    // Draw line under title
    doc.setLineWidth(0.5);
    doc.line(15, 55, 195, 55);

    // Patient details box
    let y = 65;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Patient Details:", 15, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setLineWidth(0.3);
    doc.rect(15, y - 6, 180, 45); // increased height for padding

    let detailY = y;
    doc.text(`Name: ${patientName}`, 20, detailY);
    detailY += 10;
    if (patientAge) doc.text(`Age: ${patientAge}`, 20, detailY);
    detailY += 10;
    if (patientGender) doc.text(`Gender: ${patientGender}`, 20, detailY);
    detailY += 10;
    doc.text(`Date: ${noteDate}`, 20, detailY); // more space from bottom

    y += 55; // adjust y for next section

    // Doctor's note box
    doc.setFont("helvetica", "bold");
    doc.text("Note:", 15, y);
    y += 8;
    doc.setFont("helvetica", "normal");

    // Split note text into lines
    const pageWidth = 180;
    const noteLines = doc.splitTextToSize(doctorNote, pageWidth);

    // Draw box with padding
    const noteHeight = noteLines.length * 7 + 10; // extra padding top/bottom
    doc.rect(15, y - 5, pageWidth, noteHeight);

    doc.text(noteLines, 17, y); // slightly inset for padding

    y += noteHeight + 15;

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Doctor's Signature: ____________________", 15, y);
    doc.text("Clinic Contact: +91-9373369214", 15, y + 5);
    doc.text("Clinic Address: O209, Greens Centre, Aditya Birla Hospital Road, Chinchwad, Pune - 411033", 15, y + 10);

    doc.save(`DoctorNote_${patientName}_${noteDate}.pdf`);
  };

  img.onerror = () => {
    alert("Failed to load logo. PDF cannot be generated.");
  };
});
