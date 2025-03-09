# TabsToFile - Firefox Addon

[![Firefox Add-on](https://img.shields.io/amo/v/tabs-to-file?color=blue&logo=firefox-browser)](https://addons.mozilla.org/en-US/firefox/addon/tabs-to-file/)
[![Mozilla Add-on](https://img.shields.io/amo/users/tabs-to-file)](https://addons.mozilla.org/en-US/firefox/addon/tabs-to-file/)
[![Mozilla Add-on Rating](https://img.shields.io/amo/rating/tabs-to-file)](https://addons.mozilla.org/en-US/firefox/addon/tabs-to-file/)
[![GitHub license](https://img.shields.io/github/license/grn-x/TabsToFiles-FirefoxAddon)](https://github.com/grn-x/TabsToFiles-FirefoxAddon/blob/main/LICENSE)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/grn-x/TabsToFiles-FirefoxAddon)](https://github.com/grn-x/TabsToFiles-FirefoxAddon/releases)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
<!-- This badge alone should be enough to deter any sane people -->

TabsToFile is a Firefox add-on that allows you to quickly save a selection of tabs. You can export the URLs of tabs that
are marked with the cursor, selected through search terms, or simply every tab that's currently open. The exported URLs
will first be displayed on a new page and can then be saved as an HTML or TXT document.

## ✨ Features

- **Export Selected Tabs**: Export the URLs of tabs that are currently highlighted.
- **Export All Tabs in Current Window**: Export the URLs of all tabs in the current window.
- **Export Tabs by Search Term**: Export the URLs of tabs whose titles or URLs contain a specified search term.

On the gutted example.com export page, you can:
- **Dark Mode Toggle**: Switch between dark and light mode for the export page, if exported to HTML, the selected configuration will be adopted.
- **Download as HTML or TXT**: Save the exported URLs as an HTML or TXT file.

## ⚙️ Installation

You can install the latest version of the add-on from the [Releases](https://github.com/grn-x/TabsToFiles-FirefoxAddon/releases) section of this repository.

Alternatively, you can install it from the [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tabs-to-file/) page.

## 🛠️ Usage

1. **Right-click on any tab** to open the context menu.
2. Choose one of the following options:
   - **Export selected Tabs' URLs**: Export the URLs of the highlighted tabs.
   - **Export all Tabs in Current Window**: Export the URLs of all tabs in the current window.
   - **Export all Tabs whose titles or URLs contain search term**: Open a popup to enter a search term and export the URLs of tabs that match the search term.
<!-- Damn this title sounds ass, ill have to change that -->

## 🔒 Permissions

The extension requires the following permissions:
- `tabs`: To access the URLs of the tabs.
- `menus`: To create context menu items.
- `storage`: To store user preferences.
- `contextMenus`: To add items to the context menu.
- `activeTab`: To access the active tab.
- `<all_urls>`: To access all URLs.

>[!NOTE]
> There should be a more elegant way without requesting these sketchy permissions. I plan to look into it.

## 📝 Development

### Prerequisites

- Node.js
- npm

### 🚀 Running in Development Mode

1. Open Firefox and go to `about:debugging`.
2. Click on "This Firefox". (Should redirect you to `about:debugging#/runtime/this-firefox`)
3. Click on "Load Temporary Add-on".
4. Select the `manifest.json` file from the `src` directory.


### 🏗️ Building the Add-on
To obtain an installer module you can either zip the folder and rename it to .xpi ('cause that's all they are) like a cheap-ass

Or you can follow Mozilla's official guide and use `web-ext`, their Node.js CLI tool, for optimized packaging (eg excluding artifacts like .git or node_modules)

#### Prerequisites:
- `Node.js`
- `npm`
- `an instance of FireFox`

1. Clone the repository:
   ```shell
   git clone https://github.com/grn-x/TabsToFiles-FirefoxAddon.git
   cd TabsToFiles-FirefoxAddon
   ```

2. Install the `web-ext` tool:
   ```shell
   npm install --global web-ext
   web-ext --version
   ```

3. Run the add-on:
   ```shell
   web-ext run
   ```
>[!Note]
> Press `r` in the `web-ext` terminal, to trigger an extension reload

4. Build the extension:
   ```shell
   web-ext build
   ```

The resulting file can then be tested locally, or submitted to [addons.mozilla.org](addons.mozilla.org) to be signed

Refer to the [official documentation](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) on `web-ext` and signing and publishing for more information.

## File Structure

- `src/background.js`: Contains the main logic for exporting tabs and creating the context menu.
- `src/popup.js`: Handles the popup for entering the search term.
- `src/popup.html`: The HTML for the popup window.
- `src/manifest.json`: The manifest file for the add-on.

## Contributing

Everything from bug reports to feature requests or even direct code contributions are welcome.
Please open an issue or submit a pull request.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.