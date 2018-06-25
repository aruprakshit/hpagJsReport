fetch("http://127.0.0.1:3002/db.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(reportdata) {
    print(reportdata[1].component);
  });

function print(reportData) {
  const docDefinition = {
    content: [
      { text: reportData.name },
      { text: "Checklist Items:", style: "header" },
      {
        ul: checklists(reportData.checklistItems)
      },
      { text: "Guidance :", style: "header" },
      { text: reportData.guidance },
      { text: "Report Text :", style: "header" },
      { text: reportData.reporttext },
      { text: "Findings/Deficiencies :", style: "header" },
      { text: reportData.findings },
      {
        columns: [
          { text: "Status :", width: "32%" },
          { text: "Responsibility :", width: "32%" },
          [
            { text: `Due Date : ${reportData.duedate}` },
            { text: `Closing Date : ${reportData.closingdate}` }
          ]
        ]
      },
      { text: "Attachments :" },
      {
        columns: [
          [
            {
              image: reportData.attachments[0].url,
              width: 150
            },
            {
              columns: [
                reportData.attachments[0].name,
                {
                  text: "View >>",
                  link: reportData.attachments[0].url,
                  decoration: "underline"
                }
              ]
            }
          ],
          [
            {
              image: reportData.attachments[1].url,
              width: 150
            },
            {
              columns: [
                reportData.attachments[1].name,
                {
                  text: "View >>",
                  link: reportData.attachments[1].url,
                  decoration: "underline"
                }
              ]
            }
          ],
          [
            {
              image: reportData.attachments[2].url,
              width: 150
            },
            {
              columns: [
                reportData.attachments[2].name,
                {
                  text: "View >>",
                  link: reportData.attachments[2].url,
                  decoration: "underline"
                }
              ]
            }
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
