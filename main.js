document.addEventListener("DOMContentLoaded", function () {
  const files = [
    {
      chinese: "涨潮",
      path: "zhangchao.js",
      latin: "zhangchao : scaffold project - rising tide",
      emoji: "🌊"
    },
    {
      chinese: "退潮",
      path: "tuichao.js",
      latin: "tuichao : generate structure - falling tide",
      emoji: "💧"
    },
    {
      chinese: "海地",
      path: "haidi.json",
      latin: "haidi : seabed structure file - seabed",
      emoji: "🪸"
    }
  ];

  const container = document.getElementById("buttons-container");
  container.className = "buttons";

  // Create a header and the unified download button
  const info = document.createElement("p");
  info.className = "file-info";
  info.innerText = "⬇️ Download all tidal tools as a ZIP archive:";
  container.appendChild(info);

  const zipButton = document.createElement("button");
  zipButton.className = "btn";
  zipButton.innerText = "Download All Files";
  container.appendChild(zipButton);

  zipButton.addEventListener("click", async () => {
    const zip = new JSZip();

    for (const file of files) {
      try {
        const response = await fetch(file.path);
        if (!response.ok) throw new Error(`Failed to fetch ${file.path}`);
        const blob = await response.blob();
        zip.file(file.path, blob);
      } catch (err) {
        console.error(`Error adding ${file.path}:`, err);
      }
    }

    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "tidal-tools.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (zipErr) {
      console.error("Failed to generate ZIP:", zipErr);
    }
  });

  // Optional: list files individually (not downloadable here, but you can add per-file logic)
  files.forEach(file => {
    const fileContainer = document.createElement("div");
    fileContainer.className = "file-container";

    const fileInfo = document.createElement("p");
    fileInfo.className = "file-info";
    fileInfo.innerText = `${file.chinese} (${file.latin}) ${file.emoji}`;
    fileContainer.appendChild(fileInfo);

    container.appendChild(fileContainer);
  });
});
