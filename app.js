fetch("http://127.0.0.1:3002/db.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(reportdata) {
    print(reportdata[0].component);
  });

function print(reportdata) {
  const docDefinition = {
    content: [
      { text: "Checklist Items:", style: "header" },
      {
        ul: checklists(reportdata.checklistItems)
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
  console.log(data);

  return data.map(item => {
    return {
      columns: [
        { text: `${item.name} :`, bold: true, width: "auto" },
        { text: `${item.value}`, width: "auto", margin: [5, 0, 0, 0] }
      ]
    };
  });
}
