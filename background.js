const startupListener = () => {
    addContextMenus()
}

const installListener = (details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL || (details.reason === chrome.runtime.OnInstalledReason.UPDATE)) {
        addContextMenus()
    }
}

// add listeners to add context menus on startup and install/update
chrome.runtime.onStartup.addListener(startupListener)
chrome.runtime.onInstalled.addListener(installListener)

// add track with FedEx and track with UPS to the selection context menus
function addContextMenus() {
    chrome.contextMenus.create({
        id: 'track-package-fedex',
        title: 'Track with FedEx',
        contexts: ['selection'],
        onclick: function(info) {
            fedexTrack(info.selectionText)
        }
    })
    chrome.contextMenus.create({
        id: 'track-package-ups',
        title: 'Track with UPS',
        contexts: ['selection'],
        onclick: function(info) {
            upsTrack(info.selectionText)
        }
    })
}

// open the FedEx tracking page for the tracking number
function fedexTrack(trackingNumber) {
    let newURL = "https://www.fedex.com/fedextrack/?trknbr=" + trackingNumber
    chrome.tabs.create({url: newURL}).then()
}

// open the UPS tracking page for the tracking number
function upsTrack(trackingNumber) {
    let newURL = "https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&tLabels=" + trackingNumber + "%2C&tABt=false"
    chrome.tabs.create({url: newURL}).then()
}