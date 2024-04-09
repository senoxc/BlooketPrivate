// Create a div element for the popup
var popup = document.createElement("div");
popup.id = "popup";
popup.style.position = "fixed";
popup.style.top = "20px";
popup.style.right = "20px";
popup.style.backgroundColor = "#ffffff"; // White color
popup.style.color = "#000000"; // Black text
popup.style.border = "2px solid #000000";
popup.style.borderRadius = "10px";
popup.style.padding = "20px";
popup.style.animation = "fadeIn 0.5s ease-in-out";
popup.style.zIndex = "9999";

// Create an unordered list for the key mappings
var ul = document.createElement("ul");
ul.style.listStyleType = "none"; // Remove default list style
var mappings = [
    { key: "1", action: "Trigger Win" },
    { key: "2", action: "Move player" },
    { key: "3", action: "Set gravity to -3" },
    { key: "4", action: "Set gravity to 0" },
    { key: "5", action: "Set gravity to 2" },
    { key: "6", action: "Set gravity to -9" }
];
mappings.forEach(function(mapping, index) {
    var li = document.createElement("li");
    li.style.textAlign = "left"; // Align text to the left
    var strong = document.createElement("strong");
    strong.textContent = (index + 1) + ": ";
    li.appendChild(strong);
    li.appendChild(document.createTextNode(mapping.action));
    ul.appendChild(li);
});
popup.appendChild(ul);

// Add the "Made by Zuko on Discord" text
var p = document.createElement("p");
p.textContent = "Made by Zuko on Discord";
popup.appendChild(p);

// Create a container for the dropdown arrow
var dropdownContainer = document.createElement("div");
dropdownContainer.style.position = "relative";
dropdownContainer.style.marginTop = "10px"; // Add margin top for spacing
popup.appendChild(dropdownContainer);

// Create the rounded bar as the dropdown arrow
var dropdownBar = document.createElement("div");
dropdownBar.style.backgroundColor = "#000000"; // Black color
dropdownBar.style.width = "20px";
dropdownBar.style.height = "2px";
dropdownBar.style.borderRadius = "10px"; // Rounded corners
dropdownBar.style.position = "absolute";
dropdownBar.style.top = "50%";
dropdownBar.style.left = "50%";
dropdownBar.style.transform = "translate(-50%, -50%)";
dropdownContainer.appendChild(dropdownBar);

// Create the downward arrow on the right side of the bar
var dropdownArrow = document.createElement("div");
dropdownArrow.style.border = "solid #000000"; // Black border
dropdownArrow.style.borderWidth = "0 2px 2px 0"; // Border for arrow shape
dropdownArrow.style.display = "inline-block";
dropdownArrow.style.padding = "3px"; // Adjust padding for arrow size
dropdownArrow.style.position = "absolute";
dropdownArrow.style.top = "50%";
dropdownArrow.style.left = "50%";
dropdownArrow.style.transform = "translate(-50%, -50%) rotate(45deg)";
dropdownContainer.appendChild(dropdownArrow);

// Create a dropdown content for buttons
var buttonDropdownContent = document.createElement("div");
buttonDropdownContent.id = "buttonDropdownContent";
buttonDropdownContent.className = "dropdown-content";
buttonDropdownContent.style.display = "none";
buttonDropdownContent.style.position = "absolute";
buttonDropdownContent.style.backgroundColor = "#ffffff"; // White color
buttonDropdownContent.style.border = "2px solid #000000"; // Black border
buttonDropdownContent.style.borderTop = "none"; // Remove top border
buttonDropdownContent.style.borderRadius = "0 0 10px 10px"; // Rounded bottom corners
buttonDropdownContent.style.padding = "10px"; // Add padding
mappings.forEach(function(mapping) {
    var button = document.createElement("button");
    button.textContent = mapping.action;
    button.onclick = function() {
        handleAction(mapping.key);
    };
    buttonDropdownContent.appendChild(button);
});
dropdownContainer.appendChild(buttonDropdownContent);

// Function to toggle the button dropdown menu
function toggleButtonDropdown() {
    buttonDropdownContent.style.display = buttonDropdownContent.style.display === "block" ? "none" : "block";
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-content') && !event.target.matches('button')) {
        buttonDropdownContent.style.display = "none";
    }
}

// Functions to perform actions when dropdown items are clicked
function handleAction(key) {
    if (key === "1") {
        // Trigger Win
        console.log("Trigger Win action triggered");
        window.tsTriggers.onWin();
    } else if (key === "2") {
        // Move player
        console.log("Move player action triggered");
        player.position.x = player.position.x + (-3 * Math.sin(rotation));
        player.position.z = player.position.z + (-3 * Math.cos(rotation));
    } else if (key === "3") {
        // Set gravity to -3
        console.log("Set gravity to -3 action triggered");
        applyNewGravity(-3);
    } else if (key === "4") {
        // Set gravity to 0
        console.log("Set gravity to 0 action triggered");
        applyNewGravity(0);
    } else if (key === "5") {
        // Set gravity to 2
        console.log("Set gravity to 2 action triggered");
        applyNewGravity(2);
    } else if (key === "6") {
        // Set gravity to -9
        console.log("Set gravity to -9 action triggered");
        applyNewGravity(-9);
    }
}

// Function to apply new gravity
function applyNewGravity(gravityValue) {
    scene.gravity = new BABYLON.Vector3(0, gravityValue, 0);
    gravity = scene.gravity;
    scene.getPhysicsEngine().setGravity(scene.gravity);
    player.applyGravity = true;
}

// Add event listener to the document for key presses
document.addEventListener('keydown', function(event) {
    // Check if the key pressed corresponds to any action
    mappings.forEach(function(mapping) {
        if (event.key === mapping.key) {
            handleAction(mapping.key);
        }
    });
});

document.body.appendChild(popup);
