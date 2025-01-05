const safe3_container = document.createElement("div");
safe3_container.classList.add("safe3_container");

const safe3_box = document.createElement("div");
safe3_box.classList.add("safe3_box");

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "24");
svg.setAttribute("height", "24");
svg.setAttribute("viewBox", "0 0 24 24");
svg.setAttribute("fill", "none");
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path1.setAttribute(
  "d",
  "M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
);
path1.setAttribute("fill", "#292D32");

const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path2.setAttribute("opacity", "0.4");
path2.setAttribute(
  "d",
  "M19 9.5C16.52 9.5 14.5 7.48 14.5 5C14.5 4.28 14.69 3.61 14.99 3H7.52C4.07 3 2 5.06 2 8.52V16.47C2 19.94 4.07 22 7.52 22H15.47C18.93 22 20.99 19.94 20.99 16.48V9.01C20.39 9.31 19.72 9.5 19 9.5Z"
);
path2.setAttribute("fill", "#292D32");

const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path3.setAttribute(
  "d",
  "M11.75 14H6.75C6.34 14 6 13.66 6 13.25C6 12.84 6.34 12.5 6.75 12.5H11.75C12.16 12.5 12.5 12.84 12.5 13.25C12.5 13.66 12.16 14 11.75 14Z"
);
path3.setAttribute("fill", "#292D32");

const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path4.setAttribute(
  "d",
  "M15.75 18H6.75C6.34 18 6 17.66 6 17.25C6 16.84 6.34 16.5 6.75 16.5H15.75C16.16 16.5 16.5 16.84 16.5 17.25C16.5 17.66 16.16 18 15.75 18Z"
);
path4.setAttribute("fill", "#292D32");

svg.appendChild(path1);
svg.appendChild(path2);
svg.appendChild(path3);
svg.appendChild(path4);

safe3_box.appendChild(svg);

const safe3_paragraph = document.createElement("p");
safe3_paragraph.innerHTML = "Contents from Defender.";
safe3_box.appendChild(safe3_paragraph);

safe3_container.appendChild(safe3_box);

const safe3_button = document.createElement("button");
safe3_button.textContent = "OPEN";
safe3_button.id = "action";
safe3_container.appendChild(safe3_button);

document.body.appendChild(safe3_container);

const safe3_style = document.createElement("style");
safe3_style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.safe3_container *, .safe3_container {
  margin: 0;
  padding: 0;
  safe3_box-sizing: border-safe3_box;
  font-family: "Inter", serif;
  transition: 0.2s;
}

:root {
  --primary: rgba(229, 200, 46, 1);
  --tx-normal: rgba(238, 241, 248, 1);
  --bg: rgba(20, 20, 21, 1);
  --bg-darkest: rgba(32, 34, 39, 1);
}

.safe3_container {
  width: 240px;
  padding: 10px;
  border-radius: 4px;
  background: var(--bg);
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.safe3_container .safe3_box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.safe3_container svg {
  width: 24px;
  height: 24px;
}

.safe3_container p {
  font-size: 12px;
  font-weight: 500;
  color: var(--tx-normal);
}

.safe3_container span {
  font-weight: 600px;
  color: var(--primary);
}

.safe3_container button {
  background: var(--bg-darkest);
  width: 100%;
  border-radius: 4px;
  height: 30px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  color: var(--primary);
  cursor: pointer;
  margin-top: 6px;
}
`;

document.head.appendChild(safe3_style);

document.getElementById("action")?.addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "open-popup" });
});
