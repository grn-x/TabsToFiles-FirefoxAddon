document.addEventListener("DOMContentLoaded", function () {
    const textArea = document.getElementById("myTextArea");

    textArea.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const textAreaValue = textArea.value;
            // Pass the text area value back to the main JavaScript code using message with the id "textAreaValue", can be retrieved using browser.runtime.onMessage.addListener where 'message.command === "textAreaValue"'
            browser.runtime.sendMessage({
                command: "textAreaValue",
                data: textAreaValue
            });

            window.close();
        }
    });
});
