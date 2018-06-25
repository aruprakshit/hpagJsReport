fetch("http://127.0.0.1:3002/db.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(reportdata) {
    print(reportdata);
  });

const footerText = reportdata => (page, pages) => {
  return {
    margin: [40, 0, 0, 0],
    height: 200,
    columns: [
      {
        alignment: "left",
        columns: [
          { text: "Inspector: ", width: 80 },
          { text: reportdata.inspector, width: "auto" }
        ],
        columns: [
          { text: "Survey Type: ", width: 80 },
          { text: reportdata.surveyType, width: "auto" }
        ],
        columns: [
          { text: "Start Date: ", width: 80 },
          { text: reportdata.startDate, width: "auto" }
        ],
        columns: [
          { text: "Vessel: ", width: 80 },
          { text: reportdata.vessel, width: "auto" }
        ]
      },
      {
        alignment: "right",
        text: [
          { text: page.toString(), italics: true },
          " of ",
          { text: pages.toString(), italics: true }
        ]
      }
    ]
  };
};
function print(reportData) {
  const docDefinition = {
    header: headerText(reportData),
    footer: footerText(reportData),
    content: [...componentsBody(reportData.components)],
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
    ...guidance(component),
    ...reportText(component),
    ...findings(component),
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
    { text: "Attachments :", style: "headerTwo" },
    {
      columns: [
        [
          {
            image: component.attachments[0].url,
            width: 150,
            style: "image"
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
            style: "image"
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
            style: "image"
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

function guidance(component) {
  if (component.guidance.length === 0) return [];
  return [
    { text: "Guidance :", style: "headerTwo" },
    { text: component.guidance, style: ["global"], margin: [0, 0, 0, 5] }
  ];
}

function reportText(component) {
  if (component.reportText.length === 0) return [];
  return [
    { text: "Report Text :", style: "headerTwo" },
    { text: component.reportText, style: ["global"], margin: [0, 0, 0, 5] }
  ];
}

function findings(component) {
  if (component.findings.length === 0) return [];
  return [
    { text: "Findings/Deficiencies :", style: "headerTwo" },
    { text: component.findings, style: ["global"], margin: [0, 0, 0, 5] }
  ];
}

function headerText(reportdata) {
  return {
    image: reportdata.companyLogo,
    fit: [50, 50],
    alignment: "right",
    margin: [0, 5, 5, 0]
  };
}
