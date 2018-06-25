fetch("http://127.0.0.1:3002/db.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(reportdata) {
    print(reportdata);
  });

function print(reportData) {
  const docDefinition = {
    content: [...componentsBody(reportData)],
    styles: {
      headerOne: {
        fontsize: 14,
        margin: [0, 10, 0, 10]
      },
      headerTwo: {
        fontsize: 12,
        margin: [0, 5, 0, 5]
      },
      global: {
        fontsize: 5
      },
      image: {
        margin: [0, 0, 0, 7]
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

function componentsBody(components) {
  return components.map(({ component }) => [
    { text: component.name, style: "headerOne" },
    { text: "Checklist Items:", style: "headerTwo" },
    {
      ul: checklists(component.checklistItems)
    },
    { text: "Guidance :", style: "headerTwo" },
    { text: component.guidance, style: ["global"], margin: [0, 0, 0, 5] },
    { text: "Report Text :", style: "headerTwo" },
    { text: component.reporttext, style: ["global"], margin: [0, 0, 0, 5] },
    { text: "Findings/Deficiencies :", style: "headerTwo" },
    { text: component.findings, style: ["global"], margin: [0, 0, 0, 5] },
    {
      columns: [
        [
          { text: "Status :", width: "32%", style: "headerTwo" },
          { text: component.status, width: "32%", style: "global" }
        ],
        [
          { text: "Responsibility :", width: "32%", style: "headerTwo" },
          { text: component.responsibility, width: "32%", style: "global" }
        ],
        [
          {
            columns: [
              { text: "Due Date :", style: "headerTwo" },
              { text: component.duedate, style: "global" }
            ]
          },
          {
            columns: [
              { text: "Closing Date :", style: "headerTwo" },
              { text: component.closingdate, style: "global" }
            ]
          }
        ]
      ]
    },
    { text: "Attachments :", style: "headerTwo"},
    {
      columns: [
        [
          {
            image: component.attachments[0].url,
            width: 150,
            style: 'image'
          },
          {
            columns: [
              component.attachments[0].name,
              {
                text: "View >>",
                link: component.attachments[0].url,
                decoration: "underline"
              }
            ]
          }
        ],
        [
          {
            image: component.attachments[1].url,
            width: 150,
            style: 'image'
          },
          {
            columns: [
              component.attachments[1].name,
              {
                text: "View >>",
                link: component.attachments[1].url,
                decoration: "underline"
              }
            ]
          }
        ],
        [
          {
            image: component.attachments[2].url,
            width: 150,
            style: 'image'
          },
          {
            columns: [
              component.attachments[2].name,
              {
                text: "View >>",
                link: component.attachments[2].url,
                decoration: "underline"
              }
            ]
          }
        ]
      ]
    }
  ]);
}
