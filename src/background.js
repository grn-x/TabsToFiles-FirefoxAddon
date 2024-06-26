function createCode(date, urls, heading = "Exported "+ urls.length + " URLs on " + date + " using GRNX's TabstoFile - Firefox Addon"){
return `
document.body.textContent = "";
document.body.style.backgroundColor = "black";
document.body.style.color = "lightgrey";
let date = new Date();
let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();


//at first i was saving the html statically and had the content already preset during the buttons creation like the txt button,
//but i found this nice piece of code and through the method call its now dynamic but i wanna shorten it and adapt to the way the txt button works.
//maybe the txt button should not save the urls but rather loop through the u1 tag and collect the urls there in case someone changes the html source

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
  encodeURIComponent(text));
  element.setAttribute('download', filename);
 
   element.style.display = 'none';
   document.body.appendChild(element);
 
   element.click();
 
   document.body.removeChild(element);
 }



let header = document.createElement("h1");
//header.innerText = "${"Exported all " + urls.length + " URLs in current window on " + date + " using GRNX's URLsToFile Firefox Addon"}";
header.innerText = "${heading}";
document.body.appendChild(header);

// Create a label for the switch
let label = document.createElement("label");
label.textContent = "Change color scheme: ";
document.body.appendChild(label);





// Create a switch for the dark mode toggle
let darkModeToggle = document.createElement("label");
darkModeToggle.className = "switch";
let input = document.createElement("input");
input.type = "checkbox";
input.checked = true;
let span = document.createElement("span");
span.className = "slider round";
darkModeToggle.appendChild(input);
darkModeToggle.appendChild(span);
//document.body.insertBefore(darkModeToggle, list);
document.body.appendChild(darkModeToggle);

// Add an event listener to the switch
input.addEventListener('change', function() {
  if(this.checked) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "lightgrey";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  }
});

document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

let list = document.createElement("ul");
document.body.appendChild(list);


  // Create clickable links
  const urls = ${JSON.stringify(urls)};
  urls.forEach((url, index) => {
    let listItem = document.createElement("li");
    let link = document.createElement("a");
    link.textContent = url;
    link.href = url;
    link.target = "_blank";
    listItem.appendChild(link);
    list.appendChild(listItem);
  });

  
/*
  // Add download buttons
  let htmlButton = document.createElement("a");
  htmlButton.textContent = "Download as HTML";
  htmlButton.download = "exported_links_" + formattedDate + ".html";
  htmlButton.href = "data:text/html," + encodeURIComponent(document.documentElement.innerHTML);
  //document.body.appendChild(htmlButton);
  document.body.insertBefore(htmlButton, list);
*/

  let htmlButton = document.createElement("a");
htmlButton.textContent = "Download as HTML";
htmlButton.href = "#";
htmlButton.addEventListener('click', function(e) {
e.preventDefault();
let filename = "exported_links_" + formattedDate+".html";
let text = document.documentElement.outerHTML;
download(filename, text);
});
document.body.insertBefore(htmlButton, list);


  document.body.insertBefore(document.createElement("br"), list);
  document.body.insertBefore(document.createElement("br"), list);

  let txtButton = document.createElement("a");
  txtButton.textContent = "Download as TXT";
  txtButton.download = "exported_links_" + formattedDate + ".txt";
    //txtButton.download = "exported_links_" + new Date().toLocaleString('de-DE').replace(/ /g, '_').replace(/\./g, '-').replace(/:/g, '-') + ".txt";
  //txtButton.download = "exported_links.txt";
  const currentDate = new Date().toLocaleString('de-DE');
  const exportedMessage = \`Exported all \${urls.length} URLs in current window on \${currentDate} using GRNX's URLsToFile Firefox Addon\`;
  txtButton.href = "data:text/plain;charset=utf-8," + encodeURIComponent(exportedMessage + "\\n\\n" + urls.map((url, index) => \`\${index + 1}: \${url}\`).join("\\n\\n"));
  //document.body.appendChild(txtButton);
  document.body.insertBefore(txtButton, list);

  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createElement("br"));

  // Add CSS for the switch
  let style = document.createElement('style');
  style.innerHTML = \`
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #d3d3d3;
      -webkit-transition: .4s;
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    input:checked + .slider {
      background-color: #1E1F1F;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  \`;
  document.head.appendChild(style);
`;
}

function exportTabs(info, currentTab) {
  browser.tabs.query({ highlighted: true, currentWindow: true }).then(function (tabs) {
    const urls = tabs.map(t => t.url);
  
    const pageURL = currentTab.url;
    let currentDate =new Date().toLocaleString('de-DE');

    browser.tabs.create({ url: 'https://www.example.com' }).then((newTab) => {
      browser.tabs.executeScript(newTab.id, {
        code: createCode(currentDate, urls, `Exported the ${urls.length} selected Tabs on ${currentDate} using grnx ttf-fa`),
      });
    });
  });
}



function exportAllTabsInCurrentWindow(info, currentTab) {
  browser.tabs.query({currentWindow: true }).then(function (tabs) {
    const urls = tabs.map(t => t.url);
    console.log(urls.join("\n "));
    urls.forEach((url, index) => {
      //console.log(`${index + 1}: ${url}`);
    });

    let currentDate =new Date().toLocaleString('de-DE');

    const pageURL = currentTab.url;
    browser.tabs.create({ url: 'https://www.example.com' }).then((newTab) => {
      browser.tabs.executeScript(newTab.id, {
        code: createCode(currentDate, urls, `Exported all ${urls.length} Tabs in current window on ${currentDate} using grnx ttf-fa`),
      });
    });
  });
}



function exportAllTabsSearchterm(info, currentTab) {
  const creating = browser.windows.create({
    type: "popup",
    url: "popup.html",
    width: 300,
    height: 200
  });

  // Add a listener to respond to messages from the popup
  browser.runtime.onMessage.addListener((message) => {
    console.log("called method");
    if (message.command === "textAreaValue") {
      
      const textAreaValue = message.data;
      //if(textAreaValue === "") return;

      browser.tabs.query({ currentWindow: true }).then(function (tabs) {
        const filteredTabs = tabs.filter(t => (t.url && t.title) && (t.url.includes(textAreaValue) || (t.title && t.title.includes(textAreaValue))));
        const urls = filteredTabs.map(t => t.url);


        let currentDate =new Date().toLocaleString('de-DE');

        browser.tabs.create({ url: 'https://www.example.com' }).then((newTab) => {
          browser.tabs.executeScript(newTab.id, {
            //code: createCode(currentDate, urls, `Exported ${urls.length} URLs containing \"${textAreaValue}\" in their title or URL on ${currentDate} using GRNX's URLsToFile Firefox Addon`)   // why the fuck does this not work?? i tried everything to escape these double quotes. this is the last artifact of an hourlong fight with fucking javascript. why. why doesnt this work. im dumbfounded       
            code: createCode(currentDate, urls, `Exported ${urls.length} Tabs containing '${textAreaValue.replace(/(["'`])/g, "\\$1")}' in their title or URL on ${currentDate} using grnx ttf-fa`)

            });
          });
      });
    }


  });
}



//@deprecated //no annotations? 🥺🤥
function exportAllTabsSearchterm_depr(info, currentTab) {
  /*const creating = browser.windows.create({
    type: "popup",
    url: "popup.html",
    width: 300,
    height: 200
  });*/
//copied from mdn. why can i not use prompts, i also tried to find out what permissions i need to have in my manifest to use this
  //let sign = prompt("What's your sign?");

//if (sign.toLowerCase() === "scorpio") { alert("Wow! I'm a Scorpio too!");}

// there are many ways to use the prompt feature
 // open the blank prompt window
//sign = prompt(); //  open the blank prompt window
//sign = window.prompt("Are you feeling lucky"); // open the window with Text "Are you feeling lucky"
//sign = window.prompt("Are you feeling lucky", "sure"); // open the window with Text "Are you feeling lucky" and default value "sure"



  creating.then((window) => {
    const popupWindowId = window.id;
    browser.windows.onRemoved.addListener((windowId) => {
      if (windowId === popupWindowId) {
        browser.tabs.query({}).then(function (tabs) {
          const matchingTabs = tabs.filter(tab => {
            const url = new URL(tab.url);
            return url.href.includes(popupInput);
          });

          const urls = matchingTabs.map(t => t.url);

          const pageURL = currentTab.url;
          browser.tabs.create({ url: 'https://www.example.com' }).then((newTab) => {
            browser.tabs.executeScript(newTab.id, {
              code: `
          document.body.textContent = "";
          let header = document.createElement("h1");
          
          header.innerText = "${"Exported " + urls.length + " URLs with the domain " + searchTerm + " on " + new Date().toLocaleString('de-DE') + " using GRNX's TabsToFile Firefox Addon"}"; //on for the date or at for the time because this is both?
          let list = document.createElement("ul");
          document.body.appendChild(header);
          document.body.appendChild(list);

          // Create clickable links
          const urls = ${JSON.stringify(urls)};
          urls.forEach((url, index) => {
            let listItem = document.createElement("li");
            let link = document.createElement("a");
            link.textContent = url;
            link.href = url;
            link.target = "_blank";
            listItem.appendChild(link);
            list.appendChild(listItem);
          });


          document.body.appendChild(document.createElement("br"));
          document.body.appendChild(document.createElement("br"));
          document.body.appendChild(document.createElement("br"));
          document.body.appendChild(document.createElement("br"));


          // Add download buttons
          let htmlButton = document.createElement("a");
          htmlButton.textContent = "Download as HTML";
          htmlButton.download = "exported_links.html";
          htmlButton.href = "data:text/html," + encodeURIComponent(document.documentElement.outerHTML);
          document.body.appendChild(htmlButton);


          document.body.appendChild(document.createElement("br"));
          document.body.appendChild(document.createElement("br"));


          let txtButton = document.createElement("a");
          txtButton.textContent = "Download as TXT";
          txtButton.download = "exported_links.txt";
          const currentDate = new Date().toLocaleString('de-DE');
          const exportedMessage = \`Exported \${urls.length} URLs on \${currentDate} using GRNX's URLsToFile Firefox Addon\`;
          txtButton.href = "data:text/plain;charset=utf-8," + encodeURIComponent(exportedMessage + "\\n\\n" + urls.map((url, index) => \`\${index + 1}: \${url}\`).join("\\n\\n"));
          document.body.appendChild(txtButton);

          document.body.appendChild(document.createElement("br"));
          document.body.appendChild(document.createElement("br"));

          // Change the background and text color
          document.body.style.backgroundColor = "black";
          document.body.style.color = "lightgrey";
          `,
        });
      });
    });
  }
});
});
}



const MENU_ID = 'exportSelectedTabURLs';
browser.menus.create({
  id: MENU_ID,
  type: 'normal',
  title: 'Export selected Tabs\' URLs',
  enabled: true,
  contexts: ['tab'],
}, () => {
  if (browser.runtime.lastError) {
    console.error('Error creating menu item: ' + browser.runtime.lastError);
  }
});

//browser.menus.onClicked.addListener(exportTabs);

const MENU_ID_CURRENT_WINDOW = 'exportAllTabsInCurrentWindow';
const MENU_ID_SEARCHTERM = 'exportAllTabsSearchtermn';

browser.menus.create({
  id: MENU_ID_CURRENT_WINDOW,
  type: 'normal',
  title: 'Export all Tabs in Current Window',
  enabled: true,
  contexts: ['tab'],
}, () => {
  if (browser.runtime.lastError) {
    console.error('Error creating menu item: ' + browser.runtime.lastError);
  }
});

browser.menus.create({
  id: MENU_ID_SEARCHTERM,
  type: 'normal',
  title: 'Export all Tabs whose titles or URLs containing searchterm',
  enabled: true,
  contexts: ['tab'],
}, () => {
  if (browser.runtime.lastError) {
    console.error('Error creating menu item: ' + browser.runtime.lastError);
  }
});

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case MENU_ID_CURRENT_WINDOW:
      exportAllTabsInCurrentWindow(info, tab);
      break;
    case MENU_ID_SEARCHTERM:
      exportAllTabsSearchterm(info, tab);
      break;
    default:
      exportTabs(info, tab);
  }
});

// Show/Hide entry based on unloaded state of tab //deprecated because always visible so true
browser.menus.onShown.addListener(function (info, tab) {
  browser.menus.update(MENU_ID_CURRENT_WINDOW, {
    enabled: true,
    visible: true,
  });

  browser.menus.update(MENU_ID_SEARCHTERM, {
    enabled: true,
    visible: true,
  });

  // Refresh menu to show changes
  browser.menus.refresh();
});