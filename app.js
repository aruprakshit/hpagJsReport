fetch("http://127.0.0.1:3002/db.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(reportdata) {
    print(reportdata[1].component);
  });

function print(reportdata) {
  const docDefinition = {
    content: [
      { text: "Checklist Items:", style: "header" },
      {
        ul: checklists(reportdata.checklistItems)
      },
      { text: "Guidance :", style: "header" },
      { text: reportdata.guidance },
      { text: "Report Text :", style: "header" },
      { text: reportdata.reporttext },
      { text: "Findings/Deficiencies :", style: "header" },
      { text: reportdata.findings },
      {
        columns: [
          { text: "Status :", width: "32%" },
          { text: "Responsibility :", width: "32%" },
          [
            { text: `Due Date : ${reportData.duedate}` },
            { text: `Closing Date : ${reportData.closingdate}` }
          ]
        ]
      }
    ],
    styles: {
      header: {
        bold: true,
        fontsize: 15
      }
    }
  };

  pdfMake.createPdf(docDefinition).open();
}

function checklists(data) {
  return data.map(item => {
    return {
      columns: [
        { text: `${item.name} :`, bold: true, width: "auto" },
        { text: `${item.value}`, width: "auto", margin: [5, 0, 0, 0] }
      ]
    };
  });
}
