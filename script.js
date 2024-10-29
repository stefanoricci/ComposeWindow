document.getElementById("openComposer").onclick = function() {
    // Clone the composer template to create a new instance
    const newComposer = document.getElementById("composerTemplate").cloneNode(true);
    newComposer.id = "";  // Reset ID
    newComposer.style.display = "block";  // Show the composer

    // Append to the document body
    document.body.appendChild(newComposer);

    // Save the previous position (for restoring)
    let previousPosition = {
        top: newComposer.style.top,
        left: newComposer.style.left
    };

    // Close functionality
    newComposer.querySelector(".close").onclick = () => {
        newComposer.remove();
    };

    // Minimize functionality
    const minimizeButton = newComposer.querySelector(".minimize");
    minimizeButton.onclick = () => {
        if (!newComposer.classList.contains("minimized")) {
            // Save the current position before minimizing
            previousPosition.top = newComposer.style.top;
            previousPosition.left = newComposer.style.left;

            // Apply minimized class to move it to the bottom and hide content
            newComposer.classList.add("minimized");
            newComposer.style.top = "";  // Clear top position for fixed bottom alignment
            newComposer.style.left = ""; // Clear left position for fixed bottom alignment
        } else {
            // Restore to the previous position when maximizing
            newComposer.classList.remove("minimized");
            newComposer.style.top = previousPosition.top;
            newComposer.style.left = previousPosition.left;
        }
    };

    // Dragging functionality
    let isDragging = false;
    let offsetX, offsetY;

    const header = newComposer.querySelector(".modal-header");
    header.onmousedown = (e) => {
        if (!newComposer.classList.contains("minimized")) {
            isDragging = true;
            offsetX = e.clientX - newComposer.offsetLeft;
            offsetY = e.clientY - newComposer.offsetTop;
            document.onmousemove = (e) => {
                if (isDragging) {
                    newComposer.style.left = `${e.clientX - offsetX}px`;
                    newComposer.style.top = `${e.clientY - offsetY}px`;
                }
            };
            document.onmouseup = () => {
                isDragging = false;
                document.onmousemove = null;
            };
        }
    };
};
